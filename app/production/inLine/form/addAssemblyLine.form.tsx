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
import { addAssemblyLineSchema } from "@/app/production/inLine/form/addAssemblyLine.schema";

export type AddAssemblyLineFormHandle = {
  submit: () => void;
};

export type AddAssemblyLineFormProps = {
  formData?: z.infer<typeof addAssemblyLineSchema>;
  onSubmit: (values: z.infer<typeof addAssemblyLineSchema>) => void;
  onError?: () => void;
};

const AddAssemblyLineForm = forwardRef<
  AddAssemblyLineFormHandle,
  AddAssemblyLineFormProps
>(function AddAssemblyLineForm({ formData, onSubmit, onError }, ref) {
  const form = useForm<z.infer<typeof addAssemblyLineSchema>>({
    resolver: zodResolver(addAssemblyLineSchema),
    defaultValues: formData ?? {},
  });

  const onSubmitData = useCallback(
    (values: z.infer<typeof addAssemblyLineSchema>) => {
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
        className="bg-card w-full"
      >
        {/* AssemblyLine Name */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Assembly Line Name</FormLabel>
              <FormControl>
                <Input placeholder="Assembly Line Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
});
export default AddAssemblyLineForm;
