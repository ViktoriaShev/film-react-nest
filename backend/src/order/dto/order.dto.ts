export class TicketDto {
  film: string; // UUID фильма
  session: string; // UUID сеанса
  daytime: string; // Дата и время сеанса
  row: number; // Номер ряда
  seat: number; // Номер места
  price: number; // Цена билета
}

export class OrderRequestDto {
  email: string; // Электронная почта клиента
  phone: string; // Телефон клиента
  tickets: TicketDto[]; // Список билетов в заказе
}

export class OrderItemDto extends TicketDto {
  id: string; // UUID билета в заказе
}

export class OrderResponseDto {
  total: number; // Общее количество билетов
  items: OrderItemDto[]; // Список билетов в заказе
}
