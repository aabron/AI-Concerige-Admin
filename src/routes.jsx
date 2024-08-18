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

const getBusinessData = async () => {
  const response = await axios.get('https://ai-concierge-main-0b4b3d25a902.herokuapp.com/api/getUserBusinessData/', {
      headers: {
      'Authorization': `Token ${localStorage.getItem('token')}`
      },
      withCredentials: true
  });
  // console.log('User business data:', response.data)
  return response.data[0];
  
};

let response = getBusinessData();

export const routes = [
  {
    layout: "dashboard",
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "dashboard",
        path: "/home",
        element: <Home />,
        disabled: response ? false : true,
      },
      {
        icon: <UserCircleIcon {...icon} />,
        name: "profile",
        path: "/profile",
        element: <Profile />,
        disabled: response ? false : true,
      },
      {
        icon: response ? <PencilSquareIcon {...icon} /> : <TableCellsIcon {...icon} />,
        name: response ? "Edit Business" : "Add Business",
        path: response ? "/EditBusiness" : "/AddBusiness",
        element: response ? <EditBusiness/> : <AddBusiness />,
        disabled: response ? false : true,
      },
      // {
      //   icon: <TableCellsIcon {...icon} />,
      //   name: "Add Business",
      //   path: "/AddBusiness",
      //   element: <AddBusiness />,
      //   disabled: response ? false : true,
      // },
      {
        icon: <RectangleStackIcon {...icon} />,
        name: "Ad Banner",
        path: "/adBanner",
        element: <AddBanner />,
        disabled: response ? false : true,
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
