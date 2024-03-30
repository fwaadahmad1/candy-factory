import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useState,
} from "react";
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
import { Check, ChevronsUpDown, Plus, X } from "lucide-react";
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
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";

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
        name: name,
        conf_item: [
          {
            conf_name: "estimated time",
            conf_setting: "",
          },
        ],
      },
    });
    // "mixer_settings","cooker_settings", "extruder_settings", "packaging_settings"
    // "mixer_settings": ["torque","estimated time"],
    // "cooker_settings":["temperature", "estimated time"],
    // "extruder_settings":["shaper", "estimated time"],
    // "packaging_settings":["per quantity", "estimated time"],

    const stagesName: Array<{ value: string; label: string }> = [
      {
        value: "mixer_settings",
        label: "mixer_settings",
      },
      {
        value: "cooker_settings",
        label: "cooker_settings",
      },
      {
        value: "extruder_settings",
        label: "extruder_settings",
      },
      {
        value: "packaging_settings",
        label: "packaging_settings",
      },
    ];
    const configNames: Array<{ value: string; label: string }> = [
      {
        value: "torque",
        label: "torque",
      },
      {
        value: "temperature",
        label: "temperature",
      },
      // {
      //   value : "shaper" ,
      //   label: "shaper",
      // },
      {
        value: "packet quanity",
        label: "packet quanity",
      },
      {
        value: "packet size",
        label: "packet size",
      },
      {
        value: "estimated time",
        label: "estimated time",
      },
    ];

    const [open, setOpen] = useState(false);
    const [openConfig, setOpenConfig] = useState(false);
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
              <FormItem className={"flex flex-col "}>
                <FormLabel className={"font-semibold text-lg"}>
                  Stage Name
                </FormLabel>
                <FormControl>
                  {/* <Input placeholder="Full Name" {...field} /> */}
                  <Label className={"text-lg"}>{field.value}</Label>
                  {/*<Popover open={open} onOpenChange={setOpen}>*/}
                  {/*  <PopoverTrigger asChild>*/}
                  {/*    <Button*/}
                  {/*      variant="outline"*/}
                  {/*      role="combobox"*/}
                  {/*      aria-expanded={open}*/}
                  {/*      className="justify-between"*/}
                  {/*    >*/}
                  {/*      {field.value*/}
                  {/*        ? stagesName?.find(*/}
                  {/*            (stage) => stage.value === field.value,*/}
                  {/*          )?.label*/}
                  {/*        : "Select Stage..."}*/}
                  {/*      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />*/}
                  {/*    </Button>*/}
                  {/*  </PopoverTrigger>*/}
                  {/*  <PopoverContent className="w-[200px] p-0">*/}
                  {/*    <Command>*/}
                  {/*      <CommandList>*/}
                  {/*        <CommandInput placeholder="Search candy type..." />*/}
                  {/*        <CommandEmpty>No Stage found.</CommandEmpty>*/}
                  {/*        <CommandGroup>*/}
                  {/*          {stagesName?.map((stage) => {*/}
                  {/*            return stage?.value ? (*/}
                  {/*              <CommandItem*/}
                  {/*                key={stage.value}*/}
                  {/*                value={stage.value}*/}
                  {/*                onSelect={(currentValue) => {*/}
                  {/*                  field.onChange(*/}
                  {/*                    currentValue === field.value*/}
                  {/*                      ? ""*/}
                  {/*                      : currentValue,*/}
                  {/*                  );*/}
                  {/*                  setOpen(false);*/}
                  {/*                }}*/}
                  {/*              >*/}
                  {/*                <Check*/}
                  {/*                  className={cn(*/}
                  {/*                    "mr-2 h-4 w-4",*/}
                  {/*                    field.value === stage.value*/}
                  {/*                      ? "opacity-100"*/}
                  {/*                      : "opacity-0",*/}
                  {/*                  )}*/}
                  {/*                />*/}
                  {/*                {stage.value}*/}
                  {/*              </CommandItem>*/}
                  {/*            ) : (*/}
                  {/*              <></>*/}
                  {/*            );*/}
                  {/*          })}*/}
                  {/*        </CommandGroup>*/}
                  {/*      </CommandList>*/}
                  {/*    </Command>*/}
                  {/*  </PopoverContent>*/}
                  {/*</Popover>*/}
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
              <FormItem className={"row-start-2 flex flex-col mt-2"}>
                <FormLabel>Configuration Setting Name</FormLabel>
                <FormControl>
                  <Popover open={openConfig} onOpenChange={setOpenConfig}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="justify-between"
                      >
                        {field.value
                          ? configNames?.find(
                              (config) => config.value === field.value,
                            )?.label
                          : "Select config..."}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                      <Command>
                        <CommandList>
                          <CommandInput placeholder="Search candy type..." />
                          <CommandEmpty>No Ingredients found.</CommandEmpty>
                          <CommandGroup>
                            {configNames?.map((config) => {
                              return config?.value ? (
                                <CommandItem
                                  key={config.value}
                                  value={config.value}
                                  onSelect={(currentValue) => {
                                    field.onChange(
                                      currentValue === field.value
                                        ? ""
                                        : currentValue,
                                    );
                                    setOpenConfig(false);
                                  }}
                                >
                                  <Check
                                    className={cn(
                                      "mr-2 h-4 w-4",
                                      field.value === config.value
                                        ? "opacity-100"
                                        : "opacity-0",
                                    )}
                                  />
                                  {config.value}
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
                        <TableHead></TableHead>
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
                          <TableCell>
                            {item.conf_name !== "estimated time" && (
                              <X
                                onClick={() => {
                                  field.onChange(
                                    field.value.filter(
                                      (o) => o.conf_name !== item.conf_name,
                                    ),
                                  );
                                }}
                              />
                            )}
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
