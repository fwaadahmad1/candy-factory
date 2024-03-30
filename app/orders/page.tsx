"use client";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import AddOrderForm, {
  AddOrderFormHandle,
} from "@/app/orders/form/addOrder.form";
import { useEffect, useRef, useState } from "react";
import { capitalize, cn } from "@/lib/utils";
import {
  useAddOrdersMutation,
  useGetOrdersQuery,
} from "@/features/ApiSlice/orderSlice";
import { toast } from "sonner";

export type OrderData = {
  id: number;
  due_date: string;
  date: string;
  dueDate: string;
  client_name: string;
  status: "COMPLETED" | "PENDING" | "IN-PROCESS";
  candies: Array<string>;
  quantity_candies: Array<number>;
  candies_status: string;
};

export type orderItemSchema = {
  candyType: string;
  quantity: string;
};

export type addOrderSchema = {
  client_name: string;
  dueDate: Date;
  candyType: string;
  quantity: string;
  orderItem: orderItemSchema[];
};

type orderPostSchema = {
  date: string;
  due_date: string;
  client_name: string;
  status: string;
  candies: string[];
  quantity_candies: string;
};

const OrdersPage = () => {
  const addOrderFormRef = useRef<AddOrderFormHandle>(null);

  const { data: orders, isLoading, error } = useGetOrdersQuery({});
  // orders?.forEach((order,i) => {

  //   const qty = JSON.parse(`${order.quantity_candies}`)
  //   orderItemPopup[i] = {
  //     candyType : order.candies,
  //     quantity : qty,
  //   }
  // });
  const [addOrder, status] = useAddOrdersMutation();
  const [orderDetailsDialog, setOrderDetailsDialog] = useState<
    Array<orderItemSchema> | undefined
  >(undefined);

  useEffect(() => {
    if (status.isSuccess) toast.success("Order added Successfully");
    if (status.isError) toast.error("Order could not be added");
  }, [status.isSuccess, status.isError]);

  const [addOrderDialog, setAddOrderDialog] = useState<boolean>(false);
  return (
    <div className={"flex flex-col w-full gap-2"}>
      {/*<Card className={"w-full"}>*/}
      {/*  <CardContent className={"py-2 px-6 flex items-center justify-between"}>*/}
      {/*    <div className="relative flex items-center max-w-md rounded-full my-2">*/}
      {/*      <Search className="absolute left-2.5 h-4 w-4 text-muted-foreground" />*/}
      {/*      <Input placeholder="Your search..." className="rounded-full pl-8" />*/}
      {/*    </div>*/}
      {/*    */}
      {/*  </CardContent>*/}
      {/*</Card>*/}

      <div className={"w-full flex flex-row justify-end"}>
        <Button variant={"secondary"} onClick={() => setAddOrderDialog(true)}>
          Add Order
        </Button>
        <Dialog
          open={addOrderDialog}
          onOpenChange={(open) => !open && setAddOrderDialog(false)}
        >
          <DialogContent className="sm:max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add Order</DialogTitle>
              <DialogDescription>Add an order to queue</DialogDescription>
            </DialogHeader>
            <AddOrderForm
              ref={addOrderFormRef}
              orders={orders ?? []}
              onSubmit={(values) => {
                setAddOrderDialog(false);
                const candyTypes: string[] = [];
                const quantities: Number[] = [];
                values.orderItem.forEach((item, i) => {
                  candyTypes[i] = item.candyType;
                });
                values.orderItem.forEach((item, i) => {
                  quantities[i] = item.quantity;
                });

                const orderPostData: orderPostSchema = {
                  date: new Date()
                    .toLocaleDateString("en-GB")
                    .replaceAll("/", "-"),
                  due_date: values.dueDate
                    .toLocaleDateString("en-GB")
                    .replaceAll("/", "-"),
                  client_name: values.client_name,
                  status: "PENDING",
                  candies: [...candyTypes],
                  quantity_candies: JSON.stringify(quantities),
                };
                addOrder(orderPostData);
              }}
            />
            <DialogFooter>
              <DialogClose asChild={true}>
                <Button variant={"ghost"}>Cancel</Button>
              </DialogClose>
              <DialogClose>
                <Button
                  variant={"secondary"}
                  onClick={(e) => {
                    e.preventDefault();
                    addOrderFormRef.current?.submit();
                  }}
                >
                  Confirm
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <Card className={"w-full"}>
        <CardContent className={"p-2"}>
          <Dialog
            open={!!orderDetailsDialog}
            onOpenChange={(open) => !open && setOrderDetailsDialog(undefined)}
          >
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Order Details</DialogTitle>
                <DialogDescription>
                  <Table className={"w-full"}>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Candy Type</TableHead>
                        <TableHead>Quantity</TableHead>
                      </TableRow>
                    </TableHeader>

                    <TableBody>
                      {orderDetailsDialog?.map((item, index) => {
                        return (
                          <TableRow
                            key={index}
                            onClick={() => {
                              setOrderDetailsDialog(
                                // item && item.candyType.length > 0
                                //   ? item
                                //   : undefined,
                                undefined,
                              );
                            }}
                          >
                            <TableCell>{item.candyType}</TableCell>
                            <TableCell>{item.quantity}</TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>

          <Table className={"h-full w-full"}>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Order Id</TableHead>
                <TableHead>Client Name</TableHead>
                <TableHead>Order Date</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Status</TableHead>

                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders?.map((order, index) => (
                <TableRow
                  key={index}
                  onClick={() => {
                    let orderItemPopup: orderItemSchema[] = [];

                    for (let i = 0; i < order.candies.length; i++) {
                      orderItemPopup[i] = {
                        candyType: order.candies[i],
                        quantity: JSON.parse(`${order.quantity_candies}`)[i],
                      };
                    }

                    // const candiesQty = JSON.parse(`${order.quantity_candies}`);
                    // order.candies.forEach((el) => {
                    //   orderItemPopup[index] = {
                    //     candyType : order.candies[index]};
                    //     quani
                    // })
                    setOrderDetailsDialog(
                      orderItemPopup && orderItemPopup.length > 0
                        ? orderItemPopup
                        : undefined,
                    );
                  }}
                >
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>{order.client_name}</TableCell>
                  <TableCell>{`${order.date}`}</TableCell>
                  <TableCell>{`${order.due_date}`}</TableCell>
                  <TableCell>
                    <div
                      className={cn(
                        "max-w-max px-4 py-0.5 text-white rounded-sm",
                        order.status == "COMPLETED"
                          ? "bg-green-500"
                          : order.status == "IN-PROCESS"
                            ? "bg-orange-500"
                            : "bg-red-500",
                      )}
                    >
                      {capitalize(order.status)}
                    </div>
                  </TableCell>

                  <TableCell>
                    <ArrowRight strokeWidth={1} className={"text-secondary"} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>

        {/*<CardFooter>*/}
        {/*  <Pagination>*/}
        {/*    <PaginationContent>*/}
        {/*      <PaginationItem>*/}
        {/*        <PaginationPrevious href="#" />*/}
        {/*      </PaginationItem>*/}
        {/*      <PaginationItem>*/}
        {/*        <PaginationLink href="#">1</PaginationLink>*/}
        {/*      </PaginationItem>*/}
        {/*      <PaginationItem>*/}
        {/*        <PaginationLink href="#" isActive>*/}
        {/*          2*/}
        {/*        </PaginationLink>*/}
        {/*      </PaginationItem>*/}
        {/*      <PaginationItem>*/}
        {/*        <PaginationLink href="#">3</PaginationLink>*/}
        {/*      </PaginationItem>*/}
        {/*      <PaginationItem>*/}
        {/*        <PaginationEllipsis />*/}
        {/*      </PaginationItem>*/}
        {/*      <PaginationItem>*/}
        {/*        <PaginationNext href="#" />*/}
        {/*      </PaginationItem>*/}
        {/*    </PaginationContent>*/}
        {/*  </Pagination>*/}
        {/*</CardFooter>*/}
      </Card>
    </div>
  );
};

export default OrdersPage;
