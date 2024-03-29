"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ArrowRight, Search } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useRouter } from "next/navigation";
import { useGetOrdersQuery } from "@/features/ApiSlice/orderSlice";
import { useGetCandyTypeQuery } from "@/features/ApiSlice/candyTypeSlice";

type OrderData = {
  id: number;
  due_date: String;
  date: String;
  dueDate: String;
  client_name: string;
  status: "COMPLETED" | "PENDING" | "IN-PROCESS";
  candies: [];
  quantity_candies: [];
};

type pendingOrderSchema = {
  candyName: string;
  qty: string;
  id: number;
  due_date: string;
  date: string;
  dueDate: string;
  client_name: string;
  status: "COMPLETED" | "PENDING" | "IN-PROCESS";
  candies: [];
  quantity_candies: [];
};

const converDate = (dateString : String) =>{
   // Oct 23

  const dateParts = dateString?.split("-");
  let newDate = "";
  if(dateParts){
  newDate = `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`
  }

  // month is 0-based, that's why we need dataParts[1] - 1
  var dateObject = new Date(newDate).getTime();
  return dateObject
}

const convertToPending = (data?: OrderData[]) => {
  const candies: any = [];
  data?.forEach((order) => {
    const quantity = JSON.parse(`${order.quantity_candies}`);

    order.candies.forEach((candy, i) => {
      const newObj = { ...order, [`candyName`]: candy, [`qty`]: quantity[i] };
      candies.push(newObj);
    });
  });

  return candies;
};
const ProductsInLinePage = () => {
  const { data: pendingOrders, isLoading, error } = useGetOrdersQuery({});
  const { data: candyData } = useGetCandyTypeQuery({});
  const pen: pendingOrderSchema[] = convertToPending(pendingOrders);
  console.log(pen);
  const router = useRouter();
  console.log(converDate(pen[0]?.due_date))
  pen?.sort((a,b) => {
    let d1 = converDate(a.due_date);
      let d2 = converDate(b.due_date);

      if (d1 < d2) {
        return -1;
      } else if (d1 > d2) {
        return 1;
      }
      return 0;
  });
  pen.filter((candy) => {
    candy.status === "PENDING";
  })
  return (
    <div className={"flex flex-col w-full gap-2"}>
      <Card className={"w-full"}>
        <CardContent className={"p-2"}>
          <div className="relative flex items-center max-w-md rounded-full ml-4 my-2">
            <Search className="absolute left-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Your search..." className="rounded-full pl-8" />
          </div>
        </CardContent>
      </Card>

      <Card className={"w-full"}>
        <CardContent className={"p-2"}>
          <Table className={"h-full w-full"}>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Order Id</TableHead>
                <TableHead>Candy Type</TableHead>
                <TableHead className="w-[100px]">Qty</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Estimated Time</TableHead>
                {/* <TableHead>Production Line</TableHead> */}
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pen.map((order, index) => (
                <TableRow
                  key={index}
                  onClick={() =>
                    router.push(
                      `/production/pendingOrders/orderDetails?candyName=${order.candyName}&orderId=${order.id}`,
                    )
                  }
                >
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>{order.candyName}</TableCell>
                  <TableCell>{order.qty}</TableCell>
                  <TableCell>{`${order.due_date}`}</TableCell>
                  <TableCell>
                    {
                      candyData?.find(
                        (candy: any) => candy.name === order.candyName,
                      )?.total_time
                    }
                  </TableCell>
                  {/* <TableCell>{order.productionLine}</TableCell> */}
                  <TableCell>
                    <ArrowRight strokeWidth={1} className={"text-secondary"} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>

        {/*<CardFooter>*/}
        {/*  <Pagination>*/}
        {/*    <PaginationContent>*/}
        {/*      <PaginationItem>*/}
        {/*        <PaginationPrevious href="#" />*/}
        {/*      </PaginationItem>*/}
        {/*      <PaginationItem>*/}
        {/*        <PaginationLink href="#">1</PaginationLink>*/}
        {/*      </PaginationItem>*/}
        {/*      <PaginationItem>*/}
        {/*        <PaginationLink href="#" isActive>*/}
        {/*          2*/}
        {/*        </PaginationLink>*/}
        {/*      </PaginationItem>*/}
        {/*      <PaginationItem>*/}
        {/*        <PaginationLink href="#">3</PaginationLink>*/}
        {/*      </PaginationItem>*/}
        {/*      <PaginationItem>*/}
        {/*        <PaginationEllipsis />*/}
        {/*      </PaginationItem>*/}
        {/*      <PaginationItem>*/}
        {/*        <PaginationNext href="#" />*/}
        {/*      </PaginationItem>*/}
        {/*    </PaginationContent>*/}
        {/*  </Pagination>*/}
        {/*</CardFooter>*/}
      </Card>
    </div>
  );
};

export default ProductsInLinePage;
