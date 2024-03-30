"use client";
import React, { useRef, useState } from "react";
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
import {
  useAddAssemblyLineMutation,
  useAddStopAssemblyLineMutation,
  useGetAssemblyLineQuery,
} from "@/features/ApiSlice/assemblyLineSlice";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { z } from "zod";
import { addAssemblyLineSchema } from "@/app/production/inLine/form/addAssemblyLine.schema";
import AddAssemblyLineForm, {
  AddAssemblyLineFormHandle,
} from "@/app/production/inLine/form/addAssemblyLine.form";

export type AssemblyLineSchema = {
  name: string;
  total_time: string;
  occupied: boolean;
  candy: string;
  order: string;
  last_candy: string;
};

const PendingOrdersPage = () => {
  const router = useRouter();
  const { data: assemblyLineData } = useGetAssemblyLineQuery({});
  const [stopAssemblyLine] = useAddStopAssemblyLineMutation({});
  const [addAssemblyLine] = useAddAssemblyLineMutation({});

  const addAssemblyLineFormRef = useRef<AddAssemblyLineFormHandle | null>(null);

  const [addAssemblyLineDialog, setAddAssemblyLineDialog] = useState<
    z.infer<typeof addAssemblyLineSchema> | boolean
  >(false);
  return (
    <div className={"flex flex-col w-full gap-2"}>
      {/*<Card className={"w-full"}>*/}
      {/*  <CardContent className={"p-2 flex items-center justify-between"}>*/}
      {/*    <div className="relative flex items-center max-w-md rounded-full ml-4 my-2">*/}
      {/*      <Search className="absolute left-2.5 h-4 w-4 text-muted-foreground" />*/}
      {/*      <Input placeholder="Your search..." className="rounded-full pl-8" />*/}
      {/*    </div>*/}
      {/*  </CardContent>*/}
      {/*</Card>*/}

      <div className={"w-full flex flex-row justify-end"}>
        <Button
          variant={"secondary"}
          onClick={() => setAddAssemblyLineDialog(true)}
        >
          Add Assembly Line
        </Button>
        <Dialog
          open={!!addAssemblyLineDialog}
          onOpenChange={(open) => !open && setAddAssemblyLineDialog(false)}
        >
          <DialogContent className="sm:max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add Assembly Line</DialogTitle>
            </DialogHeader>
            <AddAssemblyLineForm
              ref={addAssemblyLineFormRef}
              onSubmit={(values) => {
                // const ingredientData: ingredientAddSchema = {
                //   name: values.ingredient,
                //   current_quantity: values.quantity,
                //   reorder_level: values.reorderLevel,
                // };
                // if (typeof addAssemblyLineDialog === "boolean")
                //   addInventory(ingredientData);
                // else updateInventory(ingredientData);
                addAssemblyLine(values.name);
                setAddAssemblyLineDialog(false);
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
                    addAssemblyLineFormRef.current?.submit();
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
                <TableRow key={index}>
                  <TableCell className="w-[150px]">{data.name}</TableCell>
                  {/* <TableCell className="w-[150px]">{data.orderId}</TableCell> */}
                  <TableCell className="w-[150px]">
                    {data.candy ? data.candy : "No candy"}
                  </TableCell>
                  <TableCell>
                    {data.candy ? (
                      <div
                        className={cn(
                          "max-w-max px-4 py-0.5 text-white rounded-sm",
                          "bg-red-500",
                        )}
                        onClick={() => {
                          const isTrue = window.confirm(
                            "Do you really want to stop the production",
                          );
                          console.log(isTrue);
                          if (isTrue) {
                            console.log(`l${data.name.trim()}l`, "clicked");
                            stopAssemblyLine(data.name);
                          }
                        }}
                      >
                        STOP
                      </div>
                    ) : (
                      <></>
                    )}
                  </TableCell>
                  {data.candy ? (
                    <TableCell
                      onClick={() => {
                        router.push(
                          `/production/inLine/orderDetails?candyName=${data.candy}&orderId=${data.order}&assemblyLine=${data.name}`,
                        );
                      }}
                    >
                      <ArrowRight
                        strokeWidth={1}
                        className={"text-secondary"}
                      />
                    </TableCell>
                  ) : (
                    <></>
                  )}
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
