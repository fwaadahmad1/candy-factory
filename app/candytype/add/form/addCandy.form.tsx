import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useMemo,
  useState,
} from "react";
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
import { Check, ChevronsUpDown, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useGetIngredientQuery } from "@/features/ApiSlice/ingredientSlice";
import { cn } from "@/lib/utils";

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
    const { data: ingredients } = useGetIngredientQuery({});

    let ingredientsNameOptions: Array<{ value: string; label: string }> =
      useMemo(() => {
        return ((ingredients ?? []) as Array<{ name: string }>)?.reduce(
          (a, v) => {
            return v?.name
              ? [
                  ...a,
                  { value: v.name.toLowerCase(), label: v.name.toLowerCase() },
                ]
              : a;
          },
          [] as Array<{ value: string; label: string }>,
        );
      }, [ingredients]); // Use this for drop down

    const [open, setOpen] = useState(false);

    const form = useForm<z.infer<typeof addCandySchema>>({
      resolver: zodResolver(addCandySchema),
      defaultValues: {
        candyName: "",
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
            name="candyName"
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
              <FormItem className={"row-start-2 flex flex-col mt-2"}>
                <FormLabel>Ingredient</FormLabel>
                <FormControl>
                  {/* <Input placeholder="Type of Ingredient" {...field} /> */}
                  <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="justify-between"
                      >
                        {field.value
                          ? ingredientsNameOptions?.find(
                              (ingredient) => ingredient.value === field.value,
                            )?.label
                          : "Select Ingredient..."}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                      <Command>
                        <CommandList>
                          <CommandInput placeholder="Search candy type..." />
                          <CommandEmpty>No Ingredients found.</CommandEmpty>
                          <CommandGroup>
                            {ingredientsNameOptions?.map((ingredient) => {
                              return ingredient?.value ? (
                                <CommandItem
                                  key={ingredient.value}
                                  value={ingredient.value}
                                  onSelect={(currentValue) => {
                                    field.onChange(
                                      currentValue === field.value
                                        ? ""
                                        : currentValue,
                                    );
                                    setOpen(false);
                                  }}
                                >
                                  <Check
                                    className={cn(
                                      "mr-2 h-4 w-4",
                                      field.value === ingredient.value
                                        ? "opacity-100"
                                        : "opacity-0",
                                    )}
                                  />
                                  {ingredient.value}
                                </CommandItem>
                              ) : (
                                <></>
                              );
                            })}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
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
