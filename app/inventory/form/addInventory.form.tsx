import React, { forwardRef, useCallback, useImperativeHandle } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { addInventorySchema } from "@/app/inventory/form/addInventory.schema";

export type AddInventoryFormHandle = {
  submit: () => void;
};

export type AddInventoryFormProps = {
  formData?: z.infer<typeof addInventorySchema>;
  onSubmit: (values: z.infer<typeof addInventorySchema>) => void;
  onError?: () => void;
};

const AddInventoryForm = forwardRef<
  AddInventoryFormHandle,
  AddInventoryFormProps
>(function AddInventoryForm({ formData, onSubmit, onError }, ref) {
  const form = useForm<z.infer<typeof addInventorySchema>>({
    resolver: zodResolver(addInventorySchema),
    defaultValues: formData ?? {
      ingredient: "",
      reorderLevel: 5000,
    },
  });

  const onSubmitData = useCallback(
    (values: z.infer<typeof addInventorySchema>) => {
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
          name="ingredient"
          render={({ field }) => (
            <FormItem className={"col-span-2"}>
              <FormLabel>Ingredient Name</FormLabel>
              <FormControl>
                <Input placeholder="Ingredient Name" {...field} />
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
                  </div>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Reorder Level */}
        <FormField
          control={form.control}
          name="reorderLevel"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Re-order Level</FormLabel>

              <FormControl>
                <div className={"flex flex-col gap-3"}>
                  <div className={"flex flex-row gap-2"}>
                    <Input
                      type={"number"}
                      placeholder="Re-Order Level"
                      value={field.value ?? undefined}
                      onChange={(e) => {
                        field.onChange(
                          isNaN(parseInt(e.target.value))
                            ? undefined
                            : parseInt(e.target.value),
                        );
                      }}
                    />
                  </div>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
});
export default AddInventoryForm;
