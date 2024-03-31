export type orderItemSchema = {
  candyType: String;
  quantity: String;
};

export type addOrderSchema = {
  client_name: String;
  dueDate: Date;
  candyType: String;
  quantity: String;
  orderItem: orderItemSchema[];
};

type orderPostSchema = {
  date: String;
  due_date: String;
  client_name: String;
  status: String;
  candies: String[];
  quantity_candies: String;
};
export const convertToPostData = (value: addOrderSchema) => {
  const candyTypes: String[] = [];
  const quantities: String = "";
  value.orderItem.forEach((item, i) => {
    candyTypes[i] = item.candyType;
  });
  value.orderItem.forEach((item) => {
    quantities.concat(`${item.quantity},`);
  });

  const orderPostData: orderPostSchema = {
    date: new Date().toDateString(),
    due_date: value.dueDate.toISOString(),
    client_name: value.client_name,
    status: "PENDING",
    candies: [...candyTypes],
    quantity_candies: quantities,
  };

  return orderPostData;
};
