export interface IProductsList {
  id?: number;
  name: string;
  amount: string;
  orderId?: number | null;
}

export interface IProductCreate {
  name: string;
  amount: string;
}

export interface IProductCreated {
  item: {
    id: number;
    name: string;
    amount: string;
  }
}