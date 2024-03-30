"use client";
import React, { useEffect, useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Pencil } from "lucide-react";
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
  useAddIngredientMutation,
  useGetIngredientQuery,
  useUpdateIngredientMutation,
} from "@/features/ApiSlice/ingredientSlice";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import AddInventoryForm, {
  AddInventoryFormHandle,
} from "@/app/inventory/form/addInventory.form";
import { z } from "zod";
import { addInventorySchema } from "@/app/inventory/form/addInventory.schema";
import { toast } from "sonner";

type ingredientSchema = {
  name: string;
  current_quantity: number;
  need_to_refill: boolean;
  reorder_level: number;
};
type ingredientAddSchema = {
  name: string;
  current_quantity: number;
  reorder_level: number;
};
const InventoryPage = () => {
  const { data } = useGetIngredientQuery({});
  const [addInventory, addStatus] = useAddIngredientMutation({});
  const [updateInventory, updateStatus] = useUpdateIngredientMutation({});
  const ingredientsData: ingredientSchema[] = data;

  const addInventoryFormRef = useRef<AddInventoryFormHandle | null>(null);
  const [addInventoryDialog, setAddInventoryDialog] = useState<
    z.infer<typeof addInventorySchema> | boolean
  >(false);

  useEffect(() => {
    if (addStatus.isSuccess) toast.success("Ingredient added Successfully");
    if (addStatus.isError) toast.error("Ingredient could not be added");
  }, [addStatus.isSuccess, addStatus.isError]);

  useEffect(() => {
    if (updateStatus.isSuccess)
      toast.success("Ingredient updated Successfully");
    if (updateStatus.isError) toast.error("Ingredient could not be updated");
  }, [updateStatus.isSuccess, updateStatus.isError]);

  return (
    <div className={"flex flex-col w-full gap-2"}>
      {/*<Card className={"w-full"}>*/}
      {/*  <CardContent className={"p-2 flex items-center justify-between"}>*/}
      {/*    <div className="relative flex items-center max-w-md rounded-full ml-4 my-2">*/}
      {/*      <Search className="absolute left-2.5 h-4 w-4 text-muted-foreground"/>*/}
      {/*      <Input placeholder="Your search..." className="rounded-full pl-8"/>*/}
      {/*    </div>*/}
      {/*  </CardContent>*/}
      {/*</Card>*/}

      <div className={"w-full flex flex-row justify-end"}>
        <Button
          variant={"secondary"}
          onClick={() => setAddInventoryDialog(true)}
        >
          Add Item
        </Button>
      </div>
      <Dialog
        open={!!addInventoryDialog}
        onOpenChange={(open) => !open && setAddInventoryDialog(false)}
      >
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>Add Inventory</DialogTitle>
          </DialogHeader>
          <AddInventoryForm
            formData={
              typeof addInventoryDialog != "boolean"
                ? addInventoryDialog
                : undefined
            }
            ref={addInventoryFormRef}
            onSubmit={(values) => {
              const ingredientData: ingredientAddSchema = {
                name: values.ingredient,
                current_quantity: values.quantity,
                reorder_level: values.reorderLevel,
              };
              if (typeof addInventoryDialog === "boolean")
                addInventory(ingredientData);
              else updateInventory(ingredientData);
              setAddInventoryDialog(false);
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
                  addInventoryFormRef.current?.submit();
                }}
              >
                Confirm
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Card className={"w-full"}>
        <CardContent className={"p-2"}>
          <Table className={"h-full w-full"}>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[150px]">Ingredient</TableHead>
                <TableHead className="w-[150px]">Quantity</TableHead>
                <TableHead className="w-[200px]">Refill</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ingredientsData?.map((ingredient, index) => (
                <TableRow
                  key={index}
                  onClick={() =>
                    setAddInventoryDialog({
                      ingredient: ingredient.name,
                      quantity: ingredient.current_quantity,
                      reorderLevel: ingredient.reorder_level,
                    })
                  }
                >
                  <TableCell className="font-medium">
                    {ingredient.name}
                  </TableCell>
                  <TableCell>{ingredient.current_quantity}</TableCell>
                  <TableCell>
                    <div
                      className={cn(
                        "max-w-max px-4 py-0.5 text-white rounded-sm",
                        ingredient.current_quantity > ingredient.reorder_level
                          ? "bg-green-500"
                          : "bg-red-500",
                      )}
                    >
                      {ingredient.current_quantity > ingredient.reorder_level
                        ? "Not Required"
                        : "Required"}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Pencil className={"w-5 aspect-square"} />
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

export default InventoryPage;
