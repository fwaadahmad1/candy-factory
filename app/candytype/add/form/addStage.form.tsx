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
import {
  addStageSchema,
  confItemSchema,
} from "@/app/candytype/add/form/addStage.schema";

export type AddStageFormHandle = {
  submit: () => void;
};

export type AddStageFormProps = {
  onSubmit: (
    values: Omit<z.infer<typeof addStageSchema>, "conf_name" | "conf_setting">,
  ) => void;
  onError?: () => void;
  name?: string;
};

const AddStageForm = forwardRef<AddStageFormHandle, AddStageFormProps>(
  function AddStageForm({ onSubmit, onError, name }, ref) {
    const form = useForm<z.infer<typeof addStageSchema>>({
      resolver: zodResolver(addStageSchema),
      defaultValues: {
        name: name ?? "",
      },
    });

    const onSubmitData = useCallback(
      (values: z.infer<typeof addStageSchema>) => {
        delete values.conf_name;
        delete values.conf_setting;
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
          {/* Stage Name */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={"font-semibold text-lg"}>
                  Stage Name
                </FormLabel>
                <FormControl>
                  <Input placeholder="Full Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Configuration Name */}
          <FormField
            control={form.control}
            name="conf_name"
            render={({ field }) => (
              <FormItem className={"row-start-2"}>
                <FormLabel>Configuration Setting Name</FormLabel>
                <FormControl>
                  <Input placeholder="Config setting name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Configuration setting value */}
          <FormField
            control={form.control}
            name="conf_setting"
            render={({ field }) => (
              <FormItem className={"row-start-2"}>
                <FormLabel>Value</FormLabel>

                <FormControl>
                  <div className={"flex flex-col gap-3"}>
                    <div className={"flex flex-row gap-2"}>
                      <Input placeholder="Config setting value" {...field} />
                      <Button
                        variant={"secondary"}
                        className={"flex flex-row gap-1 px-2"}
                        onClick={(e) => {
                          e.preventDefault();
                          const { conf_name, conf_setting } = form.getValues();
                          const result = confItemSchema.safeParse({
                            conf_name,
                            conf_setting,
                          });
                          if (!result.success) {
                            result.error.issues.map((issue) => {
                              form.setError(
                                issue.path[0] as "conf_name" | "conf_setting",
                                { message: issue.message },
                              );
                            });
                          } else {
                            const confItems = form.getValues("conf_item");
                            form.setValue("conf_item", [
                              ...(confItems ? confItems : []),
                              result.data,
                            ]);
                            form.resetField("conf_name");
                            form.resetField("conf_setting");
                            form.setValue("conf_name", "");
                            form.setValue("conf_setting", "");
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
              name="conf_item"
              render={({ field }) => (
                <FormItem>
                  <Table>
                    <TableHeader>
                      <TableRow className={"bg-muted text-muted-foreground"}>
                        <TableHead>Name</TableHead>
                        <TableHead>Value</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {field.value?.map((item, index) => (
                        <TableRow key={index}>
                          <TableCell>{item.conf_name}</TableCell>
                          <TableCell>
                            <Input
                              value={item.conf_setting}
                              onChange={(e) => {
                                const newValue = [...field.value];
                                newValue[index] = {
                                  ...newValue[index],
                                  conf_setting: e.target.value ?? "",
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
export default AddStageForm;
