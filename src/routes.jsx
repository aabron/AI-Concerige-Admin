import {
  HomeIcon,
  UserCircleIcon,
  TableCellsIcon,
  InformationCircleIcon,
  ServerStackIcon,
  RectangleStackIcon,
  BuildingStorefrontIcon,
  DocumentIcon,
  PencilSquareIcon
} from "@heroicons/react/24/solid";
import { Home, Profile, Tables, Notifications} from "@/pages/dashboard";
import AddBusiness from "./pages/dashboard/AddBusiness";
import { useEffect, useState } from "react";
import EditBusiness from "./pages/dashboard/EditBusiness";
import AddBanner from "./pages/dashboard/addBanner";
import axios from "axios";

const icon = {
  className: "w-5 h-5 text-inherit",
};

// const [formData, setFormData] = useState({});


  const getBusinessData = async () => {
      const response = await axios.get('https://ai-concierge-main-0b4b3d25a902.herokuapp.com/api/getUserBusinessData/', {
          headers: {
          'Authorization': `Token ${localStorage.getItem('token')}`
          },
          withCredentials: true
      });
      // console.log('User business data:', response.data)
      return response.data;
      
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
        icon: getBusinessData() ? <PencilSquareIcon {...icon} /> : <TableCellsIcon {...icon} />,
        name: getBusinessData() ? "Edit Business" : "Add Business",
        path: getBusinessData() ? "/EditBusiness" : "/AddBusiness",
        element: getBusinessData() ? <EditBusiness/> : <AddBusiness />,
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
        icon: <BuildingStorefrontIcon {...icon} />,
        name: "Billing",
        path: "/Billing",
        element: <AddBanner />,
        disabled: true,
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
