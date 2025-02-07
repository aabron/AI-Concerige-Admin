import {
  HomeIcon,
  UserCircleIcon,
  TableCellsIcon,
  InformationCircleIcon,
  ServerStackIcon,
  RectangleStackIcon,
  BuildingStorefrontIcon,
  DocumentIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/solid";
import { Home, Profile } from "@/pages/dashboard";
import AddBusiness from "./pages/dashboard/AddBusiness";
import { useEffect, useState } from "react";
import EditBusiness from "./pages/dashboard/EditBusiness";
import AddBanner from "./pages/dashboard/addBanner";
import Billing from "./pages/dashboard/billing";
import axios from "axios";

const icon = {
  className: "w-5 h-5 text-inherit",
};

export const getBusinessData = async () => {
  const response = await axios.get('https://ai-concierge-main-0b4b3d25a902.herokuapp.com/api/getUserBusinessData/', {
      headers: {
      'Authorization': `Token ${localStorage.getItem('token')}`
      },
      withCredentials: true
  });
  // console.log('User business data:', response.data)
  return response.data[0];
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
        disabled: false,
      },
      {
        icon: <UserCircleIcon {...icon} />,
        name: "profile",
        path: "/profile",
        element: <Profile />,
        disabled: false,
      },
      {
        icon: <PencilSquareIcon {...icon} /> ,
        name: "Edit Business" ,
        path: "/EditBusiness" ,
        element: <EditBusiness/> ,
        disabled: false,
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "Add Business",
        path: "/AddBusiness",
        element: <AddBusiness />,
        disabled: false,
      },
      {
        icon: <RectangleStackIcon {...icon} />,
        name: "Ad Banner",
        path: "/adBanner",
        element: <AddBanner />,
        disabled: false,

      },
      {
        icon: <BuildingStorefrontIcon {...icon}/>,
        name: "Billing",
        path: "/Billing",
        element: <Billing />,
        disabled: false,
      },
      {
        icon: <DocumentIcon {...icon} />,
        name: "Documentation",
        path: "/Docs",
        element: <AddBanner />,
        disabled: true,
      },
    ],
  }
];


export default routes;
