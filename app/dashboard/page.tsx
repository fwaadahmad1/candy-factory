"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import dynamic from "next/dynamic";
import { LineConfig } from "@ant-design/plots";
import { TooltipItemValue } from "@antv/g2";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import useDashboard from "@/app/dashboard/useDashboard";
import { AssemblyLineSchema } from "@/app/production/inLine/page";

const Line = dynamic(
  () => import("@ant-design/plots").then((lib) => lib.Line),
  {
    ssr: false,
  },
);
const DashboardPage = () => {
  const {
    candyTypes,
    assemblyLines,
    totalOrders,
    pendingOrders,
    activeOrders,
    chartData,
    maxOrdersInChartsData,
  } = useDashboard();
  return (
    <div className={"grid grid-cols-6 w-full gap-2"}>
      <NumberWidget
        className={"col-span-2"}
        title={"Orders"}
        description={"Number of orders placed"}
        quantity={`${totalOrders}`}
        text={"orders"}
        href={"/orders"}
      />
      <NumberWidget
        className={"col-span-2"}
        title={"Pending Orders"}
        description={"Orders in pending state"}
        quantity={`${pendingOrders}`}
        text={"orders"}
        href={"/production/pendingOrders"}
      />
      <NumberWidget
        className={"col-span-2"}
        title={"Production Lines"}
        description={"Active production lines"}
        quantity={`${activeOrders}`}
        text={"lines"}
        href={"/production/inLine"}
      />
      <LineWidget className={"col-span-6"} />
      <AssemblyLineStatusWidget
        className={"col-span-3"}
        assemblyLineData={assemblyLines}
      />
      <CandyTypesWidget candyTypes={candyTypes} className={"col-span-3"} />
    </div>
  );

  function AssemblyLineStatusWidget({
    className,
  }: {
    className?: string;
    assemblyLineData: Array<AssemblyLineSchema>;
  }) {
    function SingleLine({
      lineName,
      status,
    }: {
      lineName: string;
      status: string;
    }) {
      return (
        <li className={"flex flex-row gap-2"}>
          <div className={"font-semibold"}>Line {lineName}:</div>
          <div>{status}</div>
        </li>
      );
    }

    return (
      <Card className={className}>
        <Link
          href={"/production/inLine"}
          className={"h-full flex flex-col justify-between"}
        >
          <CardHeader>
            <CardTitle>Assembly Lines Status</CardTitle>
            <CardDescription>Status of each Assembly Line</CardDescription>
          </CardHeader>
          <CardContent className={"py-0"}>
            <ul>
              {assemblyLines
                ?.slice(0, 3)
                .map((assemblyLine) => (
                  <SingleLine
                    key={assemblyLine.name}
                    lineName={assemblyLine.name}
                    status={
                      assemblyLine.occupied
                        ? `Processing Candy: ${assemblyLine.candy}`
                        : "Open"
                    }
                  />
                ))}
            </ul>
            {assemblyLines?.length > 3 && (
              <div className={"text-muted-foreground"}>...more</div>
            )}
          </CardContent>
          <CardFooter className={"text-muted-foreground justify-end py-2"}>
            <ArrowRight />
          </CardFooter>
        </Link>
      </Card>
    );
  }

  function CandyTypesWidget({
    className,
    candyTypes,
  }: {
    className?: string;
    candyTypes: Array<string>;
  }) {
    function SingleCandy({
      candyName,
      status,
    }: {
      candyName: string;
      status?: string;
    }) {
      return (
        <li className={"flex flex-row gap-2"}>
          <div>Candy {candyName}</div>
          {status && <div>:{status}</div>}
        </li>
      );
    }

    return (
      <Card className={className}>
        <Link
          href={"/candytype"}
          className={"h-full flex flex-col justify-between"}
        >
          <CardHeader>
            <CardTitle>Candy Types</CardTitle>
            <CardDescription>Types of Candy</CardDescription>
          </CardHeader>
          <CardContent className={"py-0"}>
            <ul>
              {candyTypes
                ?.slice(0, 3)
                .map((candyType, index) => (
                  <SingleCandy key={index} candyName={candyType} />
                ))}
            </ul>
            {candyTypes?.length > 3 && (
              <div className={"text-muted-foreground"}>...more</div>
            )}
          </CardContent>
          <CardFooter className={"text-muted-foreground justify-end py-2"}>
            <ArrowRight />
          </CardFooter>
        </Link>
      </Card>
    );
  }

  function LineWidget({ className }: { className?: string | undefined }) {
    const config: LineConfig = {
      data: chartData,
      xField: "date",
      yField: "orders",
      colorField: "type",
      point: {
        sizeField: 2,
      },
      scale: {
        y: {
          ...(maxOrdersInChartsData > 10 ? {} : { domain: [0, 10] }),
        },
      },
      interaction: {
        tooltip: {
          marker: false,
          filter: (item: TooltipItemValue) => {
            if (
              item.name === "date" ||
              item.name === "pending" ||
              item.name === "completed"
            )
              return item;
          },
        },
      },
      axis: {
        y: { title: "↑ Number of Orders" },
      },
      style: {
        lineWidth: 2,
      },
    };
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle>Orders Placed</CardTitle>
          <CardDescription>Recently placed orders</CardDescription>
        </CardHeader>
        <CardContent>
          <Line {...config} height={250} />
        </CardContent>
      </Card>
    );
  }

  function NumberWidget({
    title,
    description,
    quantity,
    text,
    href,
    className,
  }: {
    title: string;
    description: string;
    quantity: string;
    text: string;
    href?: string;
    className?: string;
  }) {
    return (
      <Card className={className}>
        {href ? (
          <Link href={href}>
            <Content
              title={title}
              description={description}
              quantity={quantity}
              text={text}
              href={href}
            />
          </Link>
        ) : (
          <Content
            title={title}
            description={description}
            quantity={quantity}
            text={text}
          />
        )}
      </Card>
    );
  }

  function Content({
    title,
    description,
    quantity,
    text,
    href,
  }: {
    title: string;
    description: string;
    quantity: string;
    text: string;
    href?: string;
  }) {
    return (
      <>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent
          className={cn("flex flex-row items-end gap-1", href ? "py-0" : "")}
        >
          <h1 className={"text-4xl font-extrabold tracking-tight lg:text-5xl"}>
            {quantity}
          </h1>
          <span className={"text-muted-foreground"}>{text}</span>
        </CardContent>
        {href && (
          <CardFooter className={"text-muted-foreground justify-end py-2"}>
            <ArrowRight />
          </CardFooter>
        )}
      </>
    );
  }
};

export default DashboardPage;
