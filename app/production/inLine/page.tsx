'use client'
import React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
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
import { dummyinLineData } from "./dummyInLineData";
import { useGetAssemblyLineQuery } from "@/features/ApiSlice/assemblyLineSlice";


const PendingOrdersPage = () => {
  const {data} = useGetAssemblyLineQuery({});

    return (
        <div className={"flex flex-col w-full gap-2"}>
        <Card className={"w-full"}>
          <CardContent className={"p-2 flex items-center justify-between"}>
            <div className="relative flex items-center max-w-md rounded-full ml-4 my-2">
              <Search className="absolute left-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Your search..." className="rounded-full pl-8" />
            </div>
          </CardContent>
        </Card>
  
        <Card className={"w-full"}>
          <CardContent className={"p-2"}>
            <Table className={"h-full w-full"}>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[150px]">Production Line</TableHead>
                  <TableHead className="w-[150px]">Order Id</TableHead>
                  <TableHead className="w-[150px]">Candy Type</TableHead>
                  <TableHead className="w-[150px]">Time Remaining</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {dummyinLineData.map((data, index) => (
                  <TableRow key={index}>
                    <TableCell className="w-[150px]">{data.productionLine}</TableCell>
                    <TableCell className="w-[150px]">{data.orderId}</TableCell>
                    <TableCell className="w-[150px]">{data.candyType}</TableCell>
                    <TableCell className="w-[150px]">{data.timeRemaining}</TableCell>
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

export default PendingOrdersPage;