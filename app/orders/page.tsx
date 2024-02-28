"use client";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ArrowRight, Search } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import { dummyOrderData } from "./dummyOrderData";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import AddOrderForm, {
  AddOrderFormHandle,
} from "@/app/orders/form/addOrder.form";
import { useRef } from "react";

const OrdersPage = () => {
  const addOrderFormRef = useRef<AddOrderFormHandle>(null);

  return (
    <div className={"flex flex-col w-full gap-2"}>
      <Card className={"w-full"}>
        <CardContent className={"py-2 px-6 flex items-center justify-between"}>
          <div className="relative flex items-center max-w-md rounded-full my-2">
            <Search className="absolute left-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Your search..." className="rounded-full pl-8" />
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant={"secondary"}>Add Item</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add Order</DialogTitle>
                <DialogDescription>Add an order to queue</DialogDescription>
              </DialogHeader>
              <AddOrderForm
                ref={addOrderFormRef}
                onSubmit={(values) => {
                  console.log(values);
                }}
              />
              <DialogFooter>
                <DialogClose asChild={true}>
                  <Button variant={"ghost"}>Cancel</Button>
                </DialogClose>
                <Button
                  variant={"secondary"}
                  onClick={(e) => {
                    e.preventDefault();
                    addOrderFormRef.current?.submit();
                  }}
                >
                  Confirm
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>

      <Card className={"w-full"}>
        <CardContent className={"p-2"}>
          <Table className={"h-full w-full"}>
            <TableHeader>
              <TableRow onClick={() => {}}>
                <TableHead className="w-[100px]">Order Id</TableHead>
                <TableHead>Client Name</TableHead>
                <TableHead>Order Date</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Status</TableHead>

                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {dummyOrderData.map((data, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{"7894"}</TableCell>
                  <TableCell>{data.name}</TableCell>
                  <TableCell>{`${data.orderDate.toLocaleDateString("en-us", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}`}</TableCell>
                  <TableCell>{`${data.dueDate.toLocaleDateString("en-us", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}`}</TableCell>
                  <TableCell>{data.status}</TableCell>

                  <TableCell>
                    <ArrowRight strokeWidth={1} className={"text-secondary"} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>

        <CardFooter>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive>
                  2
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">3</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </CardFooter>
      </Card>
    </div>
  );
};

export default OrdersPage;
