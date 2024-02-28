export type inLineData = {
    productionLine: string;
    orderId: string;
    candyType: string;
    timeRemaining: TimeRanges;
  };
  
  export const dummyinLineData: Array<inLineData> = [
    {
        productionLine: "1",
        orderId: "Machine 1",
        candyType: "no",
        timeRemaining: new TimeRanges,
    },
  ];
  