'use client';
import React from "react";
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
import { dummyProductionInLineData } from "@/app/production/inLine/dummyProductionInLineData";
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
import { Popover } from "@radix-ui/react-popover";

const OrdersPage = () => {
    return (
        <div className={"flex flex-col w-full gap-2"}>
          <Card className={"w-full"}>
            <CardContent className={"p-2 flex items-center justify-between"}>
              <div className="relative flex items-center max-w-md rounded-full ml-4 my-2">
                <Search className="absolute left-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Your search..." className="rounded-full pl-8" />
              </div>
              <Button className={"ml-16"}>Add Item</Button>
            </CardContent>
          </Card>
    
          <Card className={"w-full"}>
            <CardContent className={"p-2"}>
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
                  {dummyOrderData.map((data, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{data.orderId}</TableCell>
                      <TableCell>{data.ClientName}</TableCell>
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
                        <ArrowRight strokeWidth={1} className={"text-secondary"} onClick={(e) => {
                            e.preventDefault();
                            console.log("hello");
                        }}/>
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