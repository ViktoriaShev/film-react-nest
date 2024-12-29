import { Injectable, BadRequestException } from '@nestjs/common';

import {
  OrderRequestDto,
  OrderItemDto,
  OrderResponseDto,
} from './dto/order.dto';

@Injectable()
export class OrderService {
  private occupiedSeats: Record<string, Set<string>> = {};

  createOrder(orderRequest: OrderRequestDto): OrderResponseDto {
    const items: OrderItemDto[] = orderRequest.tickets.map((ticket, index) => {
      const sessionKey = `${ticket.film}:${ticket.session}`;
      const seatKey = `${ticket.row}:${ticket.seat}`;
      if (!this.occupiedSeats[sessionKey]) {
        this.occupiedSeats[sessionKey] = new Set();
      }
      if (this.occupiedSeats[sessionKey].has(seatKey)) {
        throw new BadRequestException(
          `Seat ${seatKey} is already occupied for session ${sessionKey}`,
        );
      }
      this.occupiedSeats[sessionKey].add(seatKey);
      return {
        ...ticket,
        id: `ticket-${ticket.film}-${ticket.session}-${index + 1}`,
      };
    });

    return {
      total: items.length,
      items,
    };
  }
}
