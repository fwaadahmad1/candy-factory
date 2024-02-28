export type orderItem = {
    candyType : string,
    quantity : string,
}
export type orderData = {
    
    name: string;
    dueDate: Date;
    orderDate: Date;
    status: string;
    orderItems : orderItem[];
  };
  
  export const dummyOrderData: Array<orderData> = [
    {
        
        name: "David Beckham",
        dueDate: new Date("2024-03-14"),
        orderDate: new Date("2024-03-14"),
        status: "pending",
        orderItems : [{
            candyType : "candy A",
            quantity : "1000",
        },
        {
            candyType : "candy B",
            quantity : "780",
        },
        {
            candyType : "candy c",
            quantity : "580",
        }
    ]
    },
    
  ];
  