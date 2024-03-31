// const OrderDefaultValues: OrdersContextType = {
//     orders : [],
// }
// const OrderContext = createContext<OrdersContextType>(OrderDefaultValues);

// export function OrderContextWrapper({ children } : {
//     children: React.ReactNode;
// }){
//     const [orders,setOrders] = useState<OrdersContextType[]>([
//         {
//             orderId: '1',
//             clientName: "Smit Patel",
//           dueDate: new Date("2024-03-14"),
//           orderDate: new (Date as any).now(),
//           orderItems : [{candyType : "candy A", qty : "1000"}]
//         }
//     ]);
//     const saveOrders = (orders: OrderSchema) => {
//         const newOrder: OrderSchema = {
//           orderId: Math.random().toString(), // not really unique - but fine for this example
//           clientName: orders.clientName,
//           dueDate: orders.dueDate,
//           orderDate: new (Date as any).now(),
//           orderItems : orders.orderItems
//         }
//         setOrders([...orders, newOrder])
//       }

//     return(
//         <OrderContext.Provider value={saveOrders} >
//             {children}
//             </OrderContext.Provider>
//     )
// }

// export const useOrderContext = () => {
//    return useContext(OrderContext);
// }


// type someValue = {
//     name : string,
// }
// type contextType = {
//     someData : string,
//     setSomeData : () => null,
// }
// const defaultContextValue : contextType= {
//     someData : "Hello",
//     setSomeData : () => null,
// }

// const SomeContext = createContext<contextType>(defaultContextValue);

// export const SomeContextWrapper = ({children} : {children : React.ReactNode}) => {
//     const [someData, setSomeData ] = useState<contextType>(defaultContextValue);
//     const value = {someData, setSomeData};
//     <SomeContext.Provider value={value} >{children}</SomeContext.Provider>
// }