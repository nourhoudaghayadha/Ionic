// src/app/models/order.model.ts
export interface Order {
    id: string;
    userId: string;
    foodId: string;
    foodName: string;
    date: Date;
    quantity: number;
    totalPrice: number;
  }
  