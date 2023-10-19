import { lazy } from "react";
const Login = lazy(() => import("@/Pages/Login"));
const LayoutPage = lazy(() => import("@/Pages/Layout"));
const Denied = lazy(() => import("@/Pages/Denied"));
const AssetsCount = lazy(() => import("@/Pages/Assets"));
const DataCount = lazy(() => import("@/Pages/data"));
const RouteList = [
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/denied",
    element: <Denied />,
  },
  {
    path: "/aupay",
    element: <LayoutPage />,
    children: [
      {
        path: "assets",
        element: <AssetsCount />,
      },
      {
        path: "data",
        element: <DataCount />,
      },
    ],
  },
];
export default RouteList;
