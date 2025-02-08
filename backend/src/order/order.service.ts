import { Injectable, BadRequestException } from '@nestjs/common';

import { FilmsService } from '../films/films.service';
import {
  OrderRequestDto,
  OrderItemDto,
  OrderResponseDto,
} from './dto/order.dto';

@Injectable()
export class OrderService {
  constructor(private readonly filmsService: FilmsService) {}

  async createOrder(orderRequest: OrderRequestDto): Promise<OrderResponseDto> {
    const items: OrderItemDto[] = [];
    const allTakenSeats: { row: string; seat: string }[] = [];

    for (const ticket of orderRequest.tickets) {
      const film = await this.filmsService.getFilmById(ticket.film);
      if (!film) {
        throw new BadRequestException('Film not found');
      }

      const schedule = film.items.find((s) => s.id === ticket.session);
      if (!schedule) {
        throw new BadRequestException('Session not found');
      }

      const seat = { row: ticket.row.toString(), seat: ticket.seat.toString() };
      allTakenSeats.push(seat);

      items.push({
        ...ticket,
        id: `ticket-${ticket.film}-${ticket.session}-${ticket.row}-${ticket.seat}`,
      });
    }

    for (const seat of allTakenSeats) {
      const seatKey = `${seat.row}:${seat.seat}`;
      const film = await this.filmsService.getFilmById(
        orderRequest.tickets[0].film,
      );
      if (!film) {
        throw new BadRequestException('Film not found');
      }

      const schedule = film.items.find(
        (s) => s.id === orderRequest.tickets[0].session,
      );
      if (!schedule) {
        throw new BadRequestException('Session not found');
      }

      const takenArray = schedule.taken ? schedule.taken.split(',') : [];

      if (takenArray.includes(seatKey)) {
        throw new BadRequestException(`Seat ${seatKey} is already taken`);
      }
    }

    for (const ticket of orderRequest.tickets) {
      const film = await this.filmsService.getFilmById(ticket.film);
      const schedule = film.items.find((s) => s.id === ticket.session);
      if (!schedule) {
        throw new BadRequestException('Session not found');
      }

      const seat = { row: ticket.row.toString(), seat: ticket.seat.toString() };

      const takenArray = schedule.taken ? schedule.taken.split(',') : [];

      takenArray.push(`${seat.row}:${seat.seat}`);

      schedule.taken = takenArray.join(',');

      await this.filmsService.updateFilmSchedule(
        ticket.film,
        ticket.session,
        schedule.taken,
      );
    }

    return { total: items.length, items };
  }
}
