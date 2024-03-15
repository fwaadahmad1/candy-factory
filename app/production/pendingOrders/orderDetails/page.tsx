import React from "react";
import {
  dummyProductionInLineData,
  ProductionInLineData,
} from "@/app/production/pendingOrders/dummyProductionInLineData";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { dummyIngredientsData } from "@/app/production/pendingOrders/orderDetails/dummyIngredientsData";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";

const ProductionOrderDetailsPage = ({
  searchParams,
}: {
  searchParams: {
    orderId: string;
  };
}) => {
  const order: ProductionInLineData | undefined =
    dummyProductionInLineData.find((o) => o.orderId == searchParams.orderId);
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
                Candy {order.candyType} -{" "}
                <span className={"text-muted-foreground font-normal"}>
                  #{order.orderId}
                </span>
              </h1>

              <div className={"!mt-0"}>
                <h1 className={"text-xl font-extrabold"}>Estimated time:</h1>
                <text
                  className={"text-red-500 text-lg tracking-wide font-semibold"}
                >
                  8h 20m
                </text>
              </div>
            </CardHeader>

            <CardContent className={"flex flex-col gap-4"}>
              <h2 className={"text-xl font-semibold text-muted-foreground"}>
                Production Line: {order.productionLine}
              </h2>
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
                    <TableHead>Current Quantity</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {dummyIngredientsData.map((data, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">
                        {data.ingredient}
                      </TableCell>
                      <TableCell>{data.requiredQuantity}</TableCell>
                      <TableCell>{data.currentQuantity}</TableCell>
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
            {/* STAGE 1 */}
            <Card>
              <AccordionItem value="item-1" className={"border-0 px-6"}>
                <AccordionTrigger>
                  <CardHeader className={"px-0 py-0 text-start"}>
                    <h2 className={"text-2xl font-bold"}>Stage 1</h2>
                    <h2
                      className={"text-xl font-semibold text-muted-foreground"}
                    >
                      Ingredient Mixing
                    </h2>
                  </CardHeader>
                </AccordionTrigger>

                <AccordionContent asChild>
                  <CardContent className={"p-0"}>
                    Yes. It adheres to the WAI-ARIA design pattern.
                  </CardContent>
                </AccordionContent>
              </AccordionItem>
            </Card>

            {/* STAGE 2 */}
            <Card>
              <AccordionItem value="item-2" className={"border-0 px-6"}>
                <AccordionTrigger>
                  <CardHeader className={"px-0 py-0 text-start"}>
                    <h2 className={"text-2xl font-bold"}>Stage 2</h2>
                    <h2
                      className={"text-xl font-semibold text-muted-foreground"}
                    >
                      Cooking Mixture
                    </h2>
                  </CardHeader>
                </AccordionTrigger>

                <AccordionContent asChild>
                  <CardContent className={"p-0"}>
                    Yes. It adheres to the WAI-ARIA design pattern.
                  </CardContent>
                </AccordionContent>
              </AccordionItem>
            </Card>

            {/* STAGE 3 */}
            <Card>
              <AccordionItem value="item-3" className={"border-0 px-6"}>
                <AccordionTrigger>
                  <CardHeader className={"px-0 py-0 text-start"}>
                    <h2 className={"text-2xl font-bold"}>Stage 3</h2>
                    <h2
                      className={"text-xl font-semibold text-muted-foreground"}
                    >
                      Cooling Mixture
                    </h2>
                  </CardHeader>
                </AccordionTrigger>

                <AccordionContent asChild>
                  <CardContent className={"p-0"}>
                    <div className={"flex flex-row gap-2 items-center"}>
                      <h2 className={"text-lg font-bold"}>Reconfiguration: </h2>
                      <div
                        className={"px-4 py-1 bg-red-500 text-white rounded-sm"}
                      >
                        <text>Required</text>
                      </div>
                    </div>

                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Setting</TableHead>
                          <TableHead>Value</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell>Setting 1</TableCell>
                          <TableCell>
                            <Input type={"number"} />
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Setting 1</TableCell>
                          <TableCell>
                            <Input type={"number"} />
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Setting 1</TableCell>
                          <TableCell>
                            <Input type={"number"} />
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </CardContent>
                </AccordionContent>
              </AccordionItem>
            </Card>

            {/* STAGE 4 */}
            <Card>
              <AccordionItem value="item-4" className={"border-0 px-6"}>
                <AccordionTrigger>
                  <CardHeader className={"px-0 py-0 text-start"}>
                    <h2 className={"text-2xl font-bold"}>Stage 4</h2>
                    <h2
                      className={"text-xl font-semibold text-muted-foreground"}
                    >
                      Shaping Candies
                    </h2>
                  </CardHeader>
                </AccordionTrigger>

                <AccordionContent asChild>
                  <CardContent className={"p-0"}>
                    Yes. It adheres to the WAI-ARIA design pattern.
                  </CardContent>
                </AccordionContent>
              </AccordionItem>
            </Card>

            {/* STAGE 5 */}
            <Card>
              <AccordionItem value="item-5" className={"border-0 px-6"}>
                <AccordionTrigger>
                  <CardHeader className={"px-0 py-0 text-start"}>
                    <h2 className={"text-2xl font-bold"}>Stage 5</h2>
                    <h2
                      className={"text-xl font-semibold text-muted-foreground"}
                    >
                      Packing Candies
                    </h2>
                  </CardHeader>
                </AccordionTrigger>

                <AccordionContent asChild>
                  <CardContent className={"p-0"}>
                    Yes. It adheres to the WAI-ARIA design pattern.
                  </CardContent>
                </AccordionContent>
              </AccordionItem>
            </Card>
          </Accordion>
        </>
      )}
    </div>
  );
};

export default ProductionOrderDetailsPage;
