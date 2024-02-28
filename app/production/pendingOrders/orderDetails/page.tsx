import React from "react";
import {
  dummyProductionInLineData,
  ProductionInLineData,
} from "@/app/production/pendingOrders/dummyProductionInLineData";
import {Card, CardContent, CardHeader} from "@/components/ui/card";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {dummyIngredientsData} from "@/app/production/pendingOrders/orderDetails/dummyIngredientsData";

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
    <Card className={"flex flex-col w-full gap-8 p-2"}>
      {order && (
        <>
          <CardHeader>
            <h1 className={"text-4xl font-extrabold"}>
              Candy {order.candyType} -{" "}
              <span className={"text-muted-foreground font-normal"}>
                #{order.orderId}
              </span>
            </h1>
          </CardHeader>

          <CardContent className={"flex flex-col gap-4"}>
            <h2 className={"text-2xl font-bold"}>Production Line: {order.productionLine}</h2>
            <h2 className={"text-2xl font-bold"}>Ingredients Required</h2>
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
                      <TableCell className="font-medium">{data.ingredient}</TableCell>
                      <TableCell>{data.requiredQuantity}</TableCell>
                      <TableCell>{data.currentQuantity}</TableCell>
                    </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </>
      )}

      {!order && <>
        <CardContent className={"pt-6"}><h1 className={"text-xl"}>
          Order Details Not Found!
        </h1></CardContent>
      </>}
    </Card>
  );
};

export default ProductionOrderDetailsPage;
