export type machineryData = {
  machineId: string;
  machineName: string;
  requireCleaning: string;
};

export const dummymachineryData: Array<machineryData> = [
  {
    machineId: "1",
    machineName: "Machine 1",
    requireCleaning: "no",
  },
  {
    machineId: "2",
    machineName: "Machine 2",
    requireCleaning: "yes",
  },
  {
    machineId: "3",
    machineName: "Machine 3",
    requireCleaning: "no",
  },
  {
    machineId: "4",
    machineName: "Machine 4",
    requireCleaning: "no",
  },
  {
    machineId: "5",
    machineName: "Machine 5",
    requireCleaning: "yes",
  },
];
