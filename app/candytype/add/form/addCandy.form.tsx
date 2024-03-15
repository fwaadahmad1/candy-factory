import React, { forwardRef, useCallback, useImperativeHandle } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  addCandySchema,
  ingredientItemSchema,
} from "@/app/candytype/add/form/addCandy.schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export type AddCandyFormHandle = {
  submit: () => void;
};

export type AddCandyFormProps = {
  onSubmit: (
    values: Omit<z.infer<typeof addCandySchema>, "ingredient" | "quantity">,
  ) => void;
  onError?: () => void;
};

const AddCandyForm = forwardRef<AddCandyFormHandle, AddCandyFormProps>(
  function AddCandyForm({ onSubmit, onError }, ref) {
    const form = useForm<z.infer<typeof addCandySchema>>({
      resolver: zodResolver(addCandySchema),
      defaultValues: {
        name: "",
      },
    });

    const onSubmitData = useCallback(
      (values: z.infer<typeof addCandySchema>) => {
        delete values.ingredient;
        delete values.quantity;
        // submit(values);
        onSubmit(values);
      },
      [onSubmit],
    );

    const onInvalidData = useCallback(() => {
      onError && onError();
    }, [onError]);

    useImperativeHandle(
      ref,
      () => {
        return {
          submit() {
            form.handleSubmit(onSubmitData, onInvalidData)();
          },
        };
      },
      [form, onInvalidData, onSubmitData],
    );

    return (
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmitData, onInvalidData)}
          className="grid grid-cols-2 gap-6 bg-card w-full"
        >
          {/* Candy Name */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Candy Name</FormLabel>
                <FormControl>
                  <Input placeholder="Full Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Ingredient */}
          <FormField
            control={form.control}
            name="ingredient"
            render={({ field }) => (
              <FormItem className={"row-start-2"}>
                <FormLabel>Ingredient</FormLabel>
                <FormControl>
                  <Input placeholder="Type of Ingredient" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Quantity */}
          <FormField
            control={form.control}
            name="quantity"
            render={({ field }) => (
              <FormItem className={"row-start-2"}>
                <FormLabel>Quantity</FormLabel>

                <FormControl>
                  <div className={"flex flex-col gap-3"}>
                    <div className={"flex flex-row gap-2"}>
                      <Input placeholder="Quantity" {...field} />
                      <Button
                        variant={"secondary"}
                        className={"flex flex-row gap-1 px-2"}
                        onClick={(e) => {
                          e.preventDefault();
                          const { ingredient, quantity } = form.getValues();
                          const result = ingredientItemSchema.safeParse({
                            ingredient,
                            quantity,
                          });
                          if (!result.success) {
                            result.error.issues.map((issue) => {
                              form.setError(
                                issue.path[0] as "ingredient" | "quantity",
                                { message: issue.message },
                              );
                            });
                          } else {
                            const ingredientItems =
                              form.getValues("ingredientItem");
                            form.setValue("ingredientItem", [
                              ...(ingredientItems ? ingredientItems : []),
                              result.data,
                            ]);
                            form.resetField("quantity");
                            form.resetField("ingredient");
                            form.setValue("ingredient", "");
                            form.setValue("quantity", "");
                          }
                        }}
                      >
                        <Plus size={18} className={"p-0"} /> Add
                      </Button>
                    </div>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className={"col-span-2"}>
            <FormField
              control={form.control}
              name="ingredientItem"
              render={({ field }) => (
                <FormItem>
                  <Table>
                    <TableHeader>
                      <TableRow className={"bg-muted text-muted-foreground"}>
                        <TableHead>Name</TableHead>
                        <TableHead>Quantity</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {field.value?.map((item, index) => (
                        <TableRow key={index}>
                          <TableCell>{item.ingredient}</TableCell>
                          <TableCell>
                            <Input
                              value={item.quantity}
                              onChange={(e) => {
                                const newValue = [...field.value];
                                newValue[index] = {
                                  ...newValue[index],
                                  quantity: e.target.value ?? "",
                                };
                                field.onChange(newValue);
                              }}
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </form>
      </Form>
    );
  },
);
export default AddCandyForm;
