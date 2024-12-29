export class TicketDto {
  film: string;
  session: string;
  daytime: string;
  row: number;
  seat: number;
  price: number;
}

export class OrderRequestDto {
  email: string;
  phone: string;
  tickets: TicketDto[];
}

export class OrderItemDto extends TicketDto {
  id: string;
}

export class OrderResponseDto {
  total: number;
  items: OrderItemDto[];
}
