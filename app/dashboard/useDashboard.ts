import { useGetCandyTypeQuery } from "@/features/ApiSlice/candyTypeSlice";
import { useGetAssemblyLineQuery } from "@/features/ApiSlice/assemblyLineSlice";
import { AssemblyLineSchema } from "@/app/production/inLine/page";
import { useGetOrdersQuery } from "@/features/ApiSlice/orderSlice";

export default function useDashboard(): {
  candyTypes: Array<string>;
  assemblyLines: Array<AssemblyLineSchema>;
  totalOrders: number;
  pendingOrders: number;
  activeOrders: number;
  chartData: Array<{
    type: "pending" | "completed";
    date: string;
    orders: number;
  }>;
  maxOrdersInChartsData: number;
} {
  const { data: candyTypeData } = useGetCandyTypeQuery({});
  const { data: assemblyLineData } = useGetAssemblyLineQuery({});
  const { data: orders } = useGetOrdersQuery({});

  let maxOrdersInChartsData = 0;

  function parseChartData() {
    const chartData: Array<{
      type: "pending" | "completed";
      date: string;
      orders: number;
    }> = [];

    for (let i = 9; i >= 0; i--) {
      const date: Date = new Date();
      date.setHours(0, 0, 0, 0);
      date.setDate(date.getDate() - i);
      const totalOrders = (orders ?? []).filter((o) => {
        const orderDateSplit = o.date.split("-");
        return (
          new Date(
            parseInt(orderDateSplit?.[2]),
            parseInt(orderDateSplit?.[1]) - 1,
            parseInt(orderDateSplit?.[0]),
          ).toLocaleDateString() === date.toLocaleDateString()
        );
      });
      if (totalOrders.length > maxOrdersInChartsData)
        maxOrdersInChartsData = totalOrders.length;
      chartData.push({
        type: "pending",
        date: date.toLocaleDateString(),
        orders: totalOrders.filter((o) => !(o.status === "COMPLETED")).length,
      });
      chartData.push({
        type: "completed",
        date: date.toLocaleDateString(),
        orders: totalOrders.length,
      });
    }

    return chartData;
  }

  return {
    candyTypes: (candyTypeData ?? []).reduce((a, v) => {
      return [...a, v.name];
    }, [] as Array<string>),
    assemblyLines: assemblyLineData ?? [],
    totalOrders: orders?.length ?? 0,
    pendingOrders: (orders ?? []).filter((o) => o.status === "PENDING").length,
    activeOrders: (assemblyLineData ?? []).filter((o) => o.occupied).length,
    chartData: parseChartData(),
    maxOrdersInChartsData,
  };
}
