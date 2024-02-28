export type orderData = {
    orderId: string;
    ClientName: string;
    dueDate: Date;
    orderDate: Date;
    status: string;
  };
  
  export const dummyOrderData: Array<orderData> = [
    {
        orderId: "7894",
        ClientName: "David Beckham",
        dueDate: new Date("2024-03-14"),
        orderDate: new Date("2024-03-14"),
        status: "pending",
    },
    {
        orderId: "7894",
        ClientName: "David Beckham",
        dueDate: new Date("2024-03-14"),
        orderDate: new Date("2024-03-14"),
        status: "pending",
    },
    {
        orderId: "7894",
        ClientName: "David Beckham",
        dueDate: new Date("2024-03-14"),
        orderDate: new Date("2024-03-14"),
        status: "pending",
    },
    {
        orderId: "7894",
        ClientName: "David Beckham",
        dueDate: new Date("2024-03-14"),
        orderDate: new Date("2024-03-14"),
        status: "pending",
    }

  ];
  