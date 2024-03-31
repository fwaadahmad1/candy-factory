export type NavRoute = {
  title: string;
  path: string;
  subLinks?: Array<NavRoute>;
};

export const NavRoutes: Array<NavRoute> = [
  {
    title: "Dashboard",
    path: "/dashboard",
  },
  {
    title: "Orders",
    path: "/orders",
  },
  {
    title: "Production",
    path: "/production",
    subLinks: [
      {
        title: "Production In-Line",
        path: "/production/inLine",
        subLinks: [
          {
            title: "Order Details",
            path: "/production/inLine/orderDetails",
          },
        ],
      },
      {
        title: "Pending Orders",
        path: "/production/pendingOrders",
        subLinks: [
          {
            title: "Order Details",
            path: "/production/pendingOrders/orderDetails",
          },
        ],
      },
      // {
      //   title: "Machinery Info",
      //   path: "/production/machineryInfo",
      // },
    ],
  },
  {
    title: "Inventory",
    path: "/inventory",
  },
  {
    title: "Candy",
    path: "/candytype",
    subLinks: [
      {
        title: "Add Candy",
        path: "/candytype/add",
      },
      {
        title: "Candy Description",
        path: "/candytype/candyDescription",
      },
    ],
  },
];
