import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';

import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { OrderRequestDto, OrderResponseDto } from './dto/order.dto';

describe('OrderController', () => {
  let orderController: OrderController;

  const orderServiceMock = {
    createOrder: jest.fn(),
  };

  const mockTicket = {
    film: 'Film 1',
    session: 'Session 1',
    daytime: '2025-02-02T12:00:00',
    day: '2025-02-02',
    row: 1,
    seat: 1,
    price: 100,
  };

  const mockOrderRequest: OrderRequestDto = {
    email: 'test@example.com',
    phone: '1234567890',
    tickets: [mockTicket],
  };

  const mockOrderResponse: OrderResponseDto = {
    total: 1,
    items: [
      {
        ...mockTicket,
        id: '1',
      },
    ],
  };

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [OrderController],
      providers: [OrderService],
    })
      .overrideProvider(OrderService)
      .useValue(orderServiceMock)
      .compile();

    orderController = moduleRef.get<OrderController>(OrderController);
  });

  describe('POST /order', () => {
    it('should create an order and return the order details', async () => {
      orderServiceMock.createOrder.mockResolvedValue(mockOrderResponse);

      const result = await orderController.createOrder(mockOrderRequest);
      expect(result).toEqual(mockOrderResponse);

      expect(orderServiceMock.createOrder).toHaveBeenCalledWith(
        mockOrderRequest,
      );
    });

    it('should throw an error if invalid data is provided (film not found)', async () => {
      const invalidTicket = { ...mockTicket, film: 'Invalid Film' };
      const invalidOrderRequest = {
        ...mockOrderRequest,
        tickets: [invalidTicket],
      };

      orderServiceMock.createOrder.mockRejectedValue(
        new NotFoundException('Film not found'),
      );

      await expect(
        orderController.createOrder(invalidOrderRequest),
      ).rejects.toThrowError(new NotFoundException('Film not found'));

      expect(orderServiceMock.createOrder).toHaveBeenCalledWith(
        invalidOrderRequest,
      );
    });
  });
});
