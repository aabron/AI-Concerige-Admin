import {
  HomeIcon,
  UserCircleIcon,
  TableCellsIcon,
  InformationCircleIcon,
  ServerStackIcon,
  RectangleStackIcon,
} from "@heroicons/react/24/solid";
import { Home, Profile, Tables, Notifications} from "@/pages/dashboard";
import AddBusiness from "./pages/dashboard/AddBusiness";
import { useState } from "react";
import EditBusiness from "./pages/dashboard/EditBusiness";
import AddBanner from "./pages/dashboard/addBanner";

const icon = {
  className: "w-5 h-5 text-inherit",
};

export const routes = [
  {
    layout: "dashboard",
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "dashboard",
        path: "/home",
        element: <Home />,
      },
      {
        icon: <UserCircleIcon {...icon} />,
        name: "profile",
        path: "/profile",
        element: <Profile />,
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: localStorage.getItem('token').length > 0 ? "Edit Business" : "Add Business",
        path: localStorage.getItem('token').length > 0 ? "/EditBusiness" : "/AddBusiness",
        element: localStorage.getItem('token').length > 0 ? <EditBusiness/> : <AddBusiness />,
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "Add Business",
        path: "/AddBusiness",
        element: <AddBusiness />,
      },
      {
        icon: <RectangleStackIcon {...icon} />,
        name: "Ad Banner",
        path: "/adBanner",
        element: <AddBanner />,
      },
    ],
  }
];

export default routes;
