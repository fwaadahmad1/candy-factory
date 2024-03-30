export type inLineData = {
  productionLine: string;
  orderId: string;
  candyType: string;
  timeRemaining: string;
};

export const dummyinLineData: Array<inLineData> = [
  {
    productionLine: "1",
    orderId: "Machine 1",
    candyType: "Candy A",
    timeRemaining: "2h 5min",
  },
  {
    productionLine: "2",
    orderId: "Machine 1",
    candyType: "Candy B",
    timeRemaining: "2h 5min",
  },
  {
    productionLine: "3",
    orderId: "Machine 1",
    candyType: "Candy C",
    timeRemaining: "2h 5min",
  },
];
