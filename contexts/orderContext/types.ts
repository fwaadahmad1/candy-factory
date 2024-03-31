// export const orderItems = z.object({
//   candyType: z.string().min(1),
//   quantity: z.number().positive(),
// });

// export const orderSchema = z.object({
//   name: z.string().min(2).max(50),
//   dueDate: z.date(),
//   candyType: z.string().optional(),
//   quantity: z.number().optional(),
//   orderItem: z.array(orderItems),
// });

export type OrderSchema = {
  orderId: string;
  clientName: string;
  dueDate: Date;
  orderDate: Date;
  orderItems: OrderItems[];
};
export type OrderItems = {
  candyType: string;
  qty: string;
};

export type OrdersContextType = {
  orders: OrderSchema[];
};
