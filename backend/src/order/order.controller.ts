import { Body, Controller, Post } from '@nestjs/common';

import { OrderService } from './order.service';
import { OrderRequestDto, OrderResponseDto } from './dto/order.dto';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  createOrder(@Body() orderRequest: OrderRequestDto): OrderResponseDto {
    return this.orderService.createOrder(orderRequest);
  }
}
