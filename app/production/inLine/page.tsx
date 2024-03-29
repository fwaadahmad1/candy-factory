'use client'
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
import { useAddStopAssemblyLineMutation, useGetAssemblyLineQuery } from "@/features/ApiSlice/assemblyLineSlice";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";


type assemblyLineSchema = {
  name: string,
    total_time: string,
    occupied: boolean,
    candy: string,
    order: string,
    last_candy: string,
}

const PendingOrdersPage = () => {
  const router = useRouter();
  const {data} = useGetAssemblyLineQuery({});
  const assemblyLineData : assemblyLineSchema[] = data;
  const [stopAssemblyLine] = useAddStopAssemblyLineMutation({});
  console.log(assemblyLineData);
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
                  {/* <TableHead className="w-[150px]">Order Id</TableHead> */}
                  <TableHead className="w-[150px]">Candy Type</TableHead>
                  {/* <TableHead className="w-[150px]">Time Remaining</TableHead> */}
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {assemblyLineData?.map((data, index) => (
                  <TableRow key={index} 
                 >
                    <TableCell className="w-[150px]">{data.name}</TableCell>
                    {/* <TableCell className="w-[150px]">{data.orderId}</TableCell> */}
                    <TableCell className="w-[150px]">{data.candy ? data.candy : "No candy"}</TableCell>
                    <TableCell >
                    {
                      data.candy ? <div
                      className={cn(
                        "max-w-max px-4 py-0.5 text-white rounded-sm", "bg-red-500",
                      )} 
                      onClick={
                        () => {
                         const isTrue = window.confirm("Do you really want to stop the production");
                         console.log(isTrue)
                         if(isTrue){
                           console.log(`l${data.name.trim()}l`, 'clicked');
                         stopAssemblyLine(data.name);
                         }
                        }
                      }
                    >
                      STOP
                    </div>
                    : <></> 
                    }
                    </TableCell>
                    {data.candy ? <TableCell  onClick={() =>
                    router.push(`/production/inLine/orderDetails`)
                  }>
                    <ArrowRight strokeWidth={1} className={"text-secondary"} />
                    
                  </TableCell> : <></>}
                    {/* <TableCell className="w-[150px]">{data.timeRemaining}</TableCell> */}
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

export default PendingOrdersPage;