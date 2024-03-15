export type OrderItem = {
  candyType: string;
  quantity: string;
};
export type OrderData = {
  name: string;
  dueDate: Date;
  orderDate: Date;
  status: "completed" | "pending" | "in-process";
  orderItems: OrderItem[];
};

export const dummyOrderData: Array<OrderData> = [
  {
    name: "David Beckham",
    dueDate: new Date("2024-03-14"),
    orderDate: new Date("2024-03-14"),
    status: "pending",
    orderItems: [
      {
        candyType: "candy A",
        quantity: "1000",
      },
      {
        candyType: "candy B",
        quantity: "780",
      },
      {
        candyType: "candy c",
        quantity: "580",
      },
    ],
  },
  {
    name: "David Beckham",
    dueDate: new Date("2024-03-14"),
    orderDate: new Date("2024-03-14"),
    status: "completed",
    orderItems: [
      {
        candyType: "candy A",
        quantity: "1000",
      },
      {
        candyType: "candy B",
        quantity: "780",
      },
    ],
  },
];
