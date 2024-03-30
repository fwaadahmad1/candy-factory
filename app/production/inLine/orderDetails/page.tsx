"use client";
import React, { Suspense } from "react";
import moment from "moment";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useGetCandyTypeQuery } from "@/features/ApiSlice/candyTypeSlice";
import { useSearchParams } from "next/navigation";
import { useGetAssemblyLineTimeStampQuery } from "@/features/ApiSlice/assemblyLineSlice";

type candyTypeData = {
  name: string;
  ingredients: string[];
  quantity_ingredient: string;
  total_time: number;
  mixer_settings: string[];
  cooker_settings: string[];
  extruder_settings: string[];
  packaging_settings: string[];
  quantity_mixer_settings: string;
  quantity_cooker_settings: string;
  quantity_extruder_settings: string;
  quantity_packaging_settings: string;
};

const ProductionOrderDetailsPage = () => {
  return (
    <Suspense>
      <Page />
    </Suspense>
  );
};

const calculateRemainingTime = (timestamp: number) => {
  const currentTime = Date.now();
  const timeDifference = timestamp - currentTime;
  const duration = moment.duration(timeDifference);
  const hours = duration.hours();
  const minutes = duration.minutes();
  return { hours, minutes, timeDifference };
};

function Page() {
  const { data } = useGetCandyTypeQuery({});
  const orderDetails: candyTypeData[] = data ?? [];
  const searchParams2 = useSearchParams();
  const search = searchParams2.get("candyName");
  const assemblyLineName = searchParams2.get("assemblyLine");
  const { data: assemblyLineData } = useGetAssemblyLineTimeStampQuery({
    assemblyLine: assemblyLineName,
  });
  // const [stopAL] = useAddStopAssemblyLineMutation({})
  const endTime = assemblyLineData?.ending_timestamp;

  const timeRemaining = calculateRemainingTime(endTime);
  // if (timeRemaining.timeDifference<0){
  //   stopAL(assemblyLineName);
  // }

  const order: candyTypeData | undefined = orderDetails.find((order) => {
    return order.name == search ?? "";
  });
  return (
    <div
      className={
        "flex flex-col w-full gap-4 [&>*]:flex [&>*]:flex-col [&>*]:w-full [&>*]:p-2"
      }
    >
      {!order && (
        <Card>
          <CardContent className={"pt-6"}>
            <h1 className={"text-xl"}>Order Details Not Found!</h1>
          </CardContent>
        </Card>
      )}
      {order && (
        <>
          <Card className={""}>
            <CardHeader
              className={"flex flex-row justify-between items-start pb-0"}
            >
              <h1 className={"text-4xl font-extrabold"}>
                {order.name}
                <span className={"text-muted-foreground font-normal"}>#1</span>
              </h1>

              <div className={"!mt-0"}>
                <h1 className={"text-xl font-extrabold"}>Estimated time:</h1>
                <text
                  className={"text-red-500 text-lg tracking-wide font-semibold"}
                >
                  {`${timeRemaining.hours}H${timeRemaining.minutes}M`}
                </text>
              </div>
            </CardHeader>

            <CardContent className={"flex flex-col gap-4"}>
              {/* <h2 className={"text-xl font-semibold text-muted-foreground"}>
                Production Line: {order.productionLine}
              </h2> */}
            </CardContent>
          </Card>

          {/* Ingredients Required */}
          <Card>
            <CardHeader>
              <h2 className={"text-2xl font-bold"}>Ingredients Required</h2>
            </CardHeader>
            <CardContent>
              <Table className={"h-full w-full"}>
                <TableHeader className={"bg-muted text-muted-foreground"}>
                  <TableRow>
                    <TableHead className={"w-1/2"}>Ingredients</TableHead>
                    <TableHead>Required Quantity</TableHead>
                    {/* <TableHead>Current Quantity</TableHead> */}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {order.ingredients.map((data, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{data}</TableCell>
                      <TableCell>
                        {JSON.parse(order.quantity_ingredient)[index]}
                      </TableCell>
                      {/* <TableCell>{data.currentQuantity}</TableCell> */}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Accordion
            type="single"
            collapsible
            className={"flex flex-col gap-4 !p-0"}
          >
            <Card>
              <AccordionItem value="item-1" className={"border-0 px-6"}>
                <AccordionTrigger>
                  <CardHeader className={"px-0 py-0 text-start"}>
                    <h2 className={"text-2xl font-bold"}>Mixing Mixture</h2>
                    {/* <h2
                      className={"text-xl font-semibold text-muted-foreground"}
                    >
                      Mixing Mixture
                    </h2> */}
                  </CardHeader>
                </AccordionTrigger>

                <AccordionContent asChild>
                  <CardContent className={"p-0"}>
                    {/* <div className={"flex flex-row gap-2 items-center"}>
                      <h2 className={"text-lg font-bold"}>Reconfiguration: </h2>
                      <div
                        className={"px-4 py-1 bg-red-500 text-white rounded-sm"}
                      >
                        <text>Required</text>
                      </div>
                    </div> */}

                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Setting</TableHead>
                          <TableHead>Value</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {order.mixer_settings.map((setting, i) => {
                          return (
                            <TableRow key={i}>
                              <TableCell>{setting}</TableCell>
                              <TableCell>
                                {`${JSON.parse(order.quantity_mixer_settings)[i]}`}
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </CardContent>
                </AccordionContent>
              </AccordionItem>
            </Card>

            <Card>
              <AccordionItem value="item-2" className={"border-0 px-6"}>
                <AccordionTrigger>
                  <CardHeader className={"px-0 py-0 text-start"}>
                    <h2 className={"text-2xl font-bold"}>Cooking Mixture</h2>
                    {/* <h2
                      className={"text-xl font-semibold text-muted-foreground"}
                    >
                      Cooking Mixture
                    </h2> */}
                  </CardHeader>
                </AccordionTrigger>

                <AccordionContent asChild>
                  <CardContent className={"p-0"}>
                    {/* <div className={"flex flex-row gap-2 items-center"}>
                      <h2 className={"text-lg font-bold"}>Reconfiguration: </h2>
                      <div
                        className={"px-4 py-1 bg-red-500 text-white rounded-sm"}
                      >
                        <text>Required</text>
                      </div>
                    </div> */}

                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Setting</TableHead>
                          <TableHead>Value</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {order.cooker_settings.map((setting, i) => {
                          return (
                            <TableRow key={i}>
                              <TableCell>{setting}</TableCell>
                              <TableCell>
                                {`${JSON.parse(order.quantity_cooker_settings)[i]}`}
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </CardContent>
                </AccordionContent>
              </AccordionItem>
            </Card>

            <Card>
              <AccordionItem value="item-3" className={"border-0 px-6"}>
                <AccordionTrigger>
                  <CardHeader className={"px-0 py-0 text-start"}>
                    <h2 className={"text-2xl font-bold"}>Extruder Mixture</h2>
                    {/* <h2
                      className={"text-xl font-semibold text-muted-foreground"}
                    >
                      Extruder Mixture
                    </h2> */}
                  </CardHeader>
                </AccordionTrigger>

                <AccordionContent asChild>
                  <CardContent className={"p-0"}>
                    {/* <div className={"flex flex-row gap-2 items-center"}>
                      <h2 className={"text-lg font-bold"}>Reconfiguration: </h2>
                      <div
                        className={"px-4 py-1 bg-red-500 text-white rounded-sm"}
                      >
                        <text>Required</text>
                      </div>
                    </div> */}

                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Setting</TableHead>
                          <TableHead>Value</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {order.extruder_settings.map((setting, i) => {
                          return (
                            <TableRow key={i}>
                              <TableCell>{setting}</TableCell>
                              <TableCell>
                                {`${JSON.parse(order.quantity_extruder_settings)[i]}`}
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </CardContent>
                </AccordionContent>
              </AccordionItem>
            </Card>

            <Card>
              <AccordionItem value="item-4" className={"border-0 px-6"}>
                <AccordionTrigger>
                  <CardHeader className={"px-0 py-0 text-start"}>
                    <h2 className={"text-2xl font-bold"}>Packaging</h2>
                    {/* <h2
                      className={"text-xl font-semibold text-muted-foreground"}
                    >
                      Extruder Mixture
                    </h2> */}
                  </CardHeader>
                </AccordionTrigger>

                <AccordionContent asChild>
                  <CardContent className={"p-0"}>
                    {/* <div className={"flex flex-row gap-2 items-center"}>
                      <h2 className={"text-lg font-bold"}>Reconfiguration: </h2>
                      <div
                        className={"px-4 py-1 bg-red-500 text-white rounded-sm"}
                      >
                        <text>Required</text>
                      </div>
                    </div> */}

                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Setting</TableHead>
                          <TableHead>Value</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {order.packaging_settings.map((setting, i) => {
                          return (
                            <TableRow key={i}>
                              <TableCell>{setting}</TableCell>
                              <TableCell>
                                {`${JSON.parse(order.quantity_packaging_settings)[i]}`}
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </CardContent>
                </AccordionContent>
              </AccordionItem>
            </Card>
          </Accordion>
        </>
      )}
    </div>
  );
}

export default ProductionOrderDetailsPage;


// {/* STAGE 1 */}
// <Card>
//   <AccordionItem value="item-1" className={"border-0 px-6"}>
//     <AccordionTrigger>
//       <CardHeader className={"px-0 py-0 text-start"}>
//         <h2 className={"text-2xl font-bold"}>Stage 1</h2>
//         <h2
//           className={"text-xl font-semibold text-muted-foreground"}
//         >
//           Ingredient Mixing
//         </h2>
//       </CardHeader>
//     </AccordionTrigger>

//     <AccordionContent asChild>
//       <CardContent className={"p-0"}>
//         Yes. It adheres to the WAI-ARIA design pattern.
//       </CardContent>
//     </AccordionContent>
//   </AccordionItem>
// </Card>

// {/* STAGE 2 */}
// <Card>
//   <AccordionItem value="item-2" className={"border-0 px-6"}>
//     <AccordionTrigger>
//       <CardHeader className={"px-0 py-0 text-start"}>
//         <h2 className={"text-2xl font-bold"}>Stage 2</h2>
//         <h2
//           className={"text-xl font-semibold text-muted-foreground"}
//         >
//           Cooking Mixture
//         </h2>
//       </CardHeader>
//     </AccordionTrigger>

//     <AccordionContent asChild>
//       <CardContent className={"p-0"}>
//         Yes. It adheres to the WAI-ARIA design pattern.
//       </CardContent>
//     </AccordionContent>
//   </AccordionItem>
// </Card>