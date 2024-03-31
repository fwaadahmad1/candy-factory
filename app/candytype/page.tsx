"use client";
import React, { useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useRouter } from "next/navigation";
import {
  useDeleteCandyTypeMutation,
  useGetCandyTypeQuery,
} from "@/features/ApiSlice/candyTypeSlice";
import { toast } from "sonner";

export type CandySchema = {
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
const CandyTypePage = () => {
  const router = useRouter();
  const { data: candyData } = useGetCandyTypeQuery({});
  const [deleteCandyType, status] = useDeleteCandyTypeMutation({});
  useEffect(() => {
    if (status.isSuccess) toast.success("Candy deleted Successfully");
    if (status.isError) toast.error("Candy could not be deleted");
  }, [status.isSuccess, status.isError]);

  return (
    <div className={"flex flex-col w-full h-full gap-2"}>
      {/*<Card className={"w-full"}>*/}
      {/*  <CardContent className={"p-2 flex items-center justify-end"}>*/}
      {/*    /!*<div className="relative flex items-center max-w-md rounded-full ml-4 my-2">*!/*/}
      {/*    /!*  <Search className="absolute left-2.5 h-4 w-4 text-muted-foreground" />*!/*/}
      {/*    /!*  <Input placeholder="Your search..." className="rounded-full pl-8" />*!/*/}
      {/*    /!*</div>*!/*/}

      {/*  </CardContent>*/}
      {/*</Card>*/}
      <div className={"w-full flex flex-row justify-end"}>
        <Button
          variant={"secondary"}
          onClick={() => {
            router.push("/candytype/add/");
          }}
        >
          Add New Candy
        </Button>
      </div>

      <Card className={"w-full h-full"}>
        <CardContent className={"p-2"}>
          <Table className={"h-full w-full"}>
            <TableHeader>
              <TableRow>
                <TableHead>Candy Type</TableHead>
                <TableHead className={"w-2"}></TableHead>
                <TableHead className={"w-2"}></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {candyData ? (
                candyData.map((candy, index) => (
                  <TableRow key={index}>
                    <TableCell
                      className="font-medium"
                      onClick={() =>
                        router.push(
                          `candytype/candyDescription?candyName=${candy.name}`,
                        )
                      }
                    >
                      {candy.name}
                    </TableCell>
                    <TableCell
                      onClick={() =>
                        router.push(
                          `candytype/candyDescription?candyName=${candy.name}`,
                        )
                      }
                    >
                      <ArrowRight
                        strokeWidth={1}
                        className={"text-secondary"}
                      />
                    </TableCell>
                    <TableCell>
                      <Trash
                        strokeWidth={1}
                        className={"text-secondary"}
                        onClick={() => {
                          deleteCandyType(candy);
                        }}
                      />
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell>No Data Available</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default CandyTypePage;
