import { Test, TestingModule } from '@nestjs/testing';
import { OrderController } from '../src/order/order.controller';
import { OrderService } from '../src/order/order.service';
import {
  OrderRequestDto,
  OrderResponseDto,
  TicketDto,
  OrderItemDto,
} from '../src/order/dto/order.dto';
import { INestApplication, BadRequestException } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as supertest from 'supertest';

describe('OrderController', () => {
  let app: INestApplication;

  // Моки для OrderService
  const mockOrderService = {
    createOrder: jest.fn(),
  };

  // Моки для TicketDto
  const mockTicket: TicketDto = {
    film: 'Film 1',
    session: 'Session 1',
    daytime: '12:00 PM',
    day: '2025-02-02',
    row: 3,
    seat: 5,
    price: 150,
  };

  // Мок для OrderRequestDto
  const mockOrderRequest: OrderRequestDto = {
    email: 'test@example.com',
    phone: '1234567890',
    tickets: [mockTicket], // Список билетов
  };

  // Мок для OrderItemDto
  const mockOrderItem: OrderItemDto = {
    ...mockTicket,
    id: '1', // Добавляем ID для элемента заказа
  };

  // Мок для OrderResponseDto
  const mockOrderResponse: OrderResponseDto = {
    total: 150,
    items: [mockOrderItem],
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderController],
      providers: [OrderService],
    })
      .overrideProvider(OrderService)
      .useValue(mockOrderService)
      .compile();

    app = module.createNestApplication<NestExpressApplication>();
    await app.init();
  });

  describe('POST /order', () => {
    it('should create an order', async () => {
      mockOrderService.createOrder.mockResolvedValue(mockOrderResponse);

      return supertest(app.getHttpServer())
        .post('/order')
        .send(mockOrderRequest)
        .expect(201)
        .expect((res) => {
          expect(res.body).toEqual(mockOrderResponse);
        });
    });

    it('should return 400 if invalid data is provided', async () => {
      mockOrderService.createOrder.mockRejectedValue(
        new BadRequestException('Film not found'),
      ); // Выбрасываем исключение
      return supertest(app.getHttpServer())
        .post('/order')
        .send({
          phone: '1234567890',
          tickets: [mockTicket],
        })
        .expect(400); // Ожидаем ошибку 400
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
