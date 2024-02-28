export type IngredientsData = {
  ingredient: string;
  requiredQuantity: string;
  currentQuantity: string;
};

export const dummyIngredientsData: Array<IngredientsData> = [
  {
    ingredient: "Ingredient A",
    requiredQuantity: "100 kg",
    currentQuantity: "2000 kg",
  },
  {
    ingredient: "Ingredient B",
    requiredQuantity: "50 kg",
    currentQuantity: "500 kg",
  },
  {
    ingredient: "Ingredient C",
    requiredQuantity: "25 kg",
    currentQuantity: "600 kg",
  },
  {
    ingredient: "Ingredient D",
    requiredQuantity: "25 kg",
    currentQuantity: "250 kg",
  },
];
