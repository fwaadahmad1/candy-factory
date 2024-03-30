"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  addOrderSchema,
  orderItemSchema,
} from "@/app/orders/form/addOrder.schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { capitalize, cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { CalendarIcon, Check, ChevronsUpDown, Plus } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { forwardRef, useImperativeHandle, useMemo, useState } from "react";
import { useGetCandyTypeQuery } from "@/features/ApiSlice/candyTypeSlice";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { OrderData } from "@/app/orders/page";
//import { orderItemSchema } from "../helper";

export type AddOrderFormHandle = {
  submit: () => void;
};

export type AddOrderFormProps = {
  onSubmit: (
    values: Omit<z.infer<typeof addOrderSchema>, "candyType" | "quantity">,
  ) => void;
  orders: Array<OrderData>;
};
const convertDate = (dateString?: String) => {
  if (!dateString) return new Date();
  const dateParts = dateString?.split("-");

  // month is 0-based, that's why we need dataParts[1] - 1
  return new Date(
    parseInt(dateParts[2]),
    parseInt(dateParts[1]) - 1,
    parseInt(dateParts[0]),
  );
};

const AddOrderForm = forwardRef<AddOrderFormHandle, AddOrderFormProps>(
  function AddOrderForm({ onSubmit, orders }, ref) {
    const [open, setOpen] = useState(true);

    const form = useForm<z.infer<typeof addOrderSchema>>({
      resolver: zodResolver(addOrderSchema),
      defaultValues: {
        client_name: "",
      },
    });

    function onSubmitData(values: z.infer<typeof addOrderSchema>) {
      delete values.candyType;
      delete values.quantity;
      onSubmit(values);
    }

    const lastOrder: OrderData = (orders ?? []).reduce(
      (acc: OrderData, curr: OrderData) => {
        let date1 = convertDate(curr.due_date);
        let date2 = convertDate(acc.due_date);
        if (date1 > date2) {
          return curr;
        }
        return acc;
      },
      {} as OrderData,
    );
    useImperativeHandle(
      ref,
      () => {
        return {
          submit() {
            form.handleSubmit(onSubmit)();
          },
        };
      },
      [form, onSubmit],
    );

    const { data: candyTypeOptions } = useGetCandyTypeQuery({});

    let candyNameOptions: Array<{ value: string; label: string }> =
      useMemo(() => {
        return ((candyTypeOptions ?? []) as Array<{ name: string }>)?.reduce(
          (a, v) => {
            return v?.name
              ? [...a, { value: v.name, label: capitalize(v.name) }]
              : a;
          },
          [] as Array<{ value: string; label: string }>,
        );
      }, [candyTypeOptions]); // Use this for drop down

    return (
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmitData)}
          className=" grid grid-cols-2 gap-6 bg-card"
        >
          {/* Client Name */}
          <FormField
            control={form.control}
            name="client_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Client Name</FormLabel>
                <FormControl>
                  <Input placeholder="Full Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Due Date */}
          <FormField
            control={form.control}
            name="dueDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Due Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <div className="relative flex items-center max-w-md rounded-full my-2">
                        <CalendarIcon className="absolute left-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          className={cn(
                            "pl-8",
                            !field.value && "text-muted-foreground",
                          )}
                          value={
                            field.value
                              ? format(field.value, "PPP")
                              : "Pick a date"
                          }
                        />
                      </div>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date < convertDate(lastOrder?.due_date) ||
                        date > new Date("2200-01-01")
                      }
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Candy Type */}
          <FormField
            control={form.control}
            name="candyType"
            render={({ field }) => (
              <FormItem className={"flex flex-col justify-between"}>
                <FormLabel className={"mt-1.5"}>Candy Type</FormLabel>
                <FormControl>
                  <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="justify-between"
                      >
                        {field.value
                          ? candyNameOptions?.find(
                              (candyName) => candyName.value === field.value,
                            )?.label
                          : "Select Candy Type..."}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                      <Command>
                        <CommandList>
                          <CommandInput placeholder="Search candy type..." />
                          <CommandEmpty>No Candy Types found.</CommandEmpty>
                          <CommandGroup>
                            {candyNameOptions?.map((candyName) => {
                              return candyName?.value ? (
                                <CommandItem
                                  key={candyName.value}
                                  value={candyName.value}
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
                                      field.value === candyName.value
                                        ? "opacity-100"
                                        : "opacity-0",
                                    )}
                                  />
                                  {candyName.label}
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
              <FormItem>
                <FormLabel>Quantity</FormLabel>

                <FormControl>
                  <div className={"flex flex-col gap-3"}>
                    <div className={"flex flex-row gap-2"}>
                      <Input
                        type={"number"}
                        placeholder="Quantity"
                        value={field.value ?? undefined}
                        onChange={(e) => {
                          field.onChange(
                            isNaN(parseInt(e.target.value))
                              ? undefined
                              : parseInt(e.target.value),
                          );
                        }}
                      />
                      <Button
                        variant={"secondary"}
                        className={"flex flex-row gap-1 px-2"}
                        onClick={(e) => {
                          e.preventDefault();
                          const { candyType, quantity } = form.getValues();
                          const result = orderItemSchema.safeParse({
                            candyType,
                            quantity,
                          });
                          if (!result.success) {
                            result.error.issues.map((issue) => {
                              form.setError(
                                issue.path[0] as "candyType" | "quantity",
                                { message: issue.message },
                              );
                            });
                          } else {
                            const orderItems = form.getValues("orderItem");
                            form.setValue("orderItem", [
                              ...(orderItems ? orderItems : []),
                              result.data,
                            ]);
                            form.resetField("quantity");
                            form.resetField("candyType");
                            form.setValue("candyType", "");
                            form.setValue("quantity", 0);
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
              name="orderItem"
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
                          <TableCell>{item.candyType}</TableCell>
                          <TableCell>{item.quantity}</TableCell>
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

export default AddOrderForm;
