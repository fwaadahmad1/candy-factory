export type inventoryData = {
  ingredientId: string;
  ingredient: string;
  qty: string;
  refill: string;
};

export const dummyInventoryData: Array<inventoryData> = [
  {
    ingredientId: "1",
    ingredient: "ingredient 1",
    qty: "1000",
    refill: "no",
  },
  {
    ingredientId: "2",
    ingredient: "ingredient 2",
    qty: "1000",
    refill: "no",
  },
  {
    ingredientId: "3",
    ingredient: "ingredient 3",
    qty: "1000",
    refill: "yes",
  },
  {
    ingredientId: "4",
    ingredient: "ingredient 4",
    qty: "1000",
    refill: "no",
  },
];
