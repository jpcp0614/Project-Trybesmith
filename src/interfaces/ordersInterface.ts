export interface IOrdersList {
  id: number;
  userId: number;
  products: number;
}

export interface IOrder {
  userId: number;
  products: number[];
}