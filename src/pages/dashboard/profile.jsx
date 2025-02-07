import {
  Card,
  CardBody,
  Avatar,
  Typography,
  Switch,
  Button,
  IconButton,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { ProfileInfoCard, MessageCard } from "@/widgets/cards";
import { useEffect, useState } from "react";
import axios from "axios";
import React from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  useMaterialTailwindController,
  setOpenConfigurator,
  setSidenavColor,
  setSidenavType,
  setFixedNavbar,
} from "@/context";

function formatNumber(number, decPlaces) {
  decPlaces = Math.pow(10, decPlaces);

  const abbrev = ["K", "M", "B", "T"];

  for (let i = abbrev.length - 1; i >= 0; i--) {
    var size = Math.pow(10, (i + 1) * 3);

    if (size <= number) {
      number = Math.round((number * decPlaces) / size) / decPlaces;

      if (number == 1000 && i < abbrev.length - 1) {
        number = 1;
        i++;
      }

      number += abbrev[i];

      break;
    }
  }

  return number;
}

export function Profile() {
  const [controller, dispatch] = useMaterialTailwindController();
  const { openConfigurator, sidenavColor, sidenavType, fixedNavbar } =
    controller;
  const [profileData, setProfileData] = useState([]);
  const [user, setUser] = useState([]);
  const [emailSettings, setEmailSettings] = useState([]);
  const [businessData, setBusinessData] = useState([]);
  
  const sidenavColors = {
    white: "from-gray-100 to-gray-100 border-gray-200",
    dark: "from-black to-black border-gray-200",
    green: "from-green-400 to-green-600",
    orange: "from-orange-400 to-orange-600",
    red: "from-red-400 to-red-600",
    pink: "from-pink-400 to-pink-600",
  };

  useEffect(() => {
    const getProfileData = async () => {
      axios({
        method: 'GET',
        url: 'https://ai-concierge-main-0b4b3d25a902.herokuapp.com/api/getUserProfile/',
        headers: {
          'Authorization': `Token ${localStorage.getItem('token')}`
        },
        withCredentials: true,
      })
        .then(response => {
          // console.log('Got data successfully:', response.data[0]);
          setEmailSettings([
            {
              checked: response.data[0].email_when_clicked,
              label: "Email Me When Clicked"
            },
            {
              checked: response.data[0].email_when_recommended,
              label: "Email Me When Recommended"
            },
            {
              checked: response.data[0].email_when_itinerary_recommended,
              label: "Email Me When Recommended in an Itinerary"
            },
            {
              checked: true,
              label: "Send me the monthly email with my businesses statistics for the month"
            },
          ])
          setProfileData(response.data[0])
        })
        .catch(error => {
          console.error('Error adding business:', error);
        });
    };
    const getUserData = async () => {
      axios({
        method: 'GET',
        url: 'https://ai-concierge-main-0b4b3d25a902.herokuapp.com/api/getUserInfo/',
        headers: {
          'Authorization': `Token ${localStorage.getItem('token')}`
        },
        withCredentials: true,
      })
        .then(response => {
          // console.log(response.data);
          setUser(response.data);
        })
        .catch(error => {
          console.error('Error getting user:', error);
        });
    };
    const getBusinessData = async () => {
      const response = await axios.get('https://ai-concierge-main-0b4b3d25a902.herokuapp.com/api/getUserBusinessData/', {
        headers: {
          'Authorization': `Token ${localStorage.getItem('token')}`
        },
        withCredentials: true
      });
      setBusinessData(response.data[0]);
      // console.log(response.data)
    };
    getBusinessData();
    getUserData();
    getProfileData();
  }, [])

  

  const handleChange = async (label, checked) => {
    console.log(label, checked);
    setEmailSettings((prev) =>
      prev.map((item) =>
        item.label === label
          ? { ...item, checked: checked }
          : item
      )
    );
    if (label === "Email Me When Clicked") {
      const response = await axios({
        method: 'POST',
        url: 'https://ai-concierge-main-0b4b3d25a902.herokuapp.com/api/updateUserProfile/',
        headers: {
          'Authorization': `Token ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
        data: { email_when_clicked: checked },
        withCredentials: true,
      });
    } else if (label === "Email Me When Recommended") {
      const response = await axios({
        method: 'POST',
        url: 'https://ai-concierge-main-0b4b3d25a902.herokuapp.com/api/updateUserProfile/',
        headers: {
          'Authorization': `Token ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
        data: { email_when_recommended: checked },
        withCredentials: true,
      });
    } else if (label === "Email Me When Recommended in an Itinerary") {
      const response = await axios({
        method: 'POST',
        url: 'https://ai-concierge-main-0b4b3d25a902.herokuapp.com/api/updateUserProfile/',
        headers: {
          'Authorization': `Token ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
        data: { email_when_itinerary_recommended: checked },
        withCredentials: true,
      });
    }

  };

  // useEffect(() => {
  //   const response = axios({
  //     method: 'POST',
  //     url: 'https://ai-concierge-main-0b4b3d25a902.herokuapp.com/api/updateUserProfile/',
  //     headers: {
  //         'Authorization': `Token ${localStorage.getItem('token')}`,
  //         'Content-Type': 'application/json',
  //     },
  //     data: { email_when_clicked: emailSettings[0].checked, email_when_recommended: emailSettings[1].checked, email_when_itinerary_recommended: emailSettings[2].checked },
  //     withCredentials: true,
  //   });
  // }, [emailSettings[0].checked, emailSettings[1].checked, emailSettings[2].checked]);

  return (
    <>
      <div className="relative mt-8 h-72 w-full overflow-hidden rounded-xl bg-[url('/img/background-image.png')] bg-cover	bg-center">
        <div className="absolute inset-0 h-full w-full bg-gray-900/75" />
      </div>
      <Card className="mx-3 -mt-16 mb-6 lg:mx-4 border border-blue-gray-100">
        <CardBody className="p-4">
          <div className="mb-10 flex items-center justify-between flex-wrap gap-6">
            <div className="flex items-center gap-6">
              <Avatar
                src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAJQArAMBIgACEQEDEQH/xAAaAAEAAwEBAQAAAAAAAAAAAAAAAQIDBAUH/8QAKhABAAICAAQGAQQDAAAAAAAAAAECAxEEEiExIkFRYXGBMjNSkaETFEL/xAAVAQEBAAAAAAAAAAAAAAAAAAAAAf/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/APuIAAAAAAAAAAAAAAAAAAAAAAAAAAACJnXmpe/lVnPXuDScnorz2nzVATzT6nNb1QAvGS3stF4n2ZAOgYVtMfDasxMdASAAAAAAAAAAyvbc6hbJbUaZAAAAiZisbmegJGc58cd7f0muSlukW6+gLgAJidT0QA3rMTCWFLcs+zcAAAAAAAFbzqsgytO5lAAAApkvGOu5+nFfJa87tP014q28nL5VYAHbsCo6eHz9eW8/Eul5r0MdubHWUVYABrjndWS2OdWBsAAAAAApk/FdTL2BkAAADi4n9ezJvxddZObyswEAFB28P+lDiehjryY6180VYABNfyhCY7wDcAAAAABTJHhXRaNxoGAT3AAAVyUjJXlt9OK9LUnxR9u6ZiI3M6j3VnJjmNTaswDgO/Z1zXh5/bv5Wr/hr1ry7Bnw+DU89416Q6VYyUnteP5WAAATX8oQvijrsGoAAAAAAAMckan2Vb2jcaYzGp0CHPmz8s8uOevnK/EX5Mc67z0hxAmZmZ3M7n3QCoAANMeW2PpueX0ZgPQpeL13VZw4L8mSN9p6S7kUbVjURCmOu+stQAAAAAAAAFb15oWAedxu4tWs+jmevlxUy15bx9uDLwmSk7r4q/2DnEzGkKgAAC+PFfJPgrsFHqY680RM+jPBwcU1bJ4renk6kVGtdkgAAAAAAAAAAAACl8VL/lSJ92NuCxT25q/DpAcf+jX98/wmOBp52tLrAYU4XFT/AI389W0REdohIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/9k="
                alt="bruce-mars"
                size="xl"
                variant="rounded"
                className="rounded-lg shadow-lg shadow-blue-gray-500/40"
              />
              <div>
                <Typography variant="h5" color="blue-gray" className="mb-1">
                  {user?.username}
                </Typography>
                <div className="flex items-center gap-2 flex-row">
                  <Typography
                    variant="small"
                  className="font-normal text-blue-gray-600"
                >
                  {user?.email}
                </Typography>
                <Typography
                    variant="small"
                  className="font-normal text-blue-gray-600"
                >
                  My Business: {businessData?.business_name}
                </Typography>
                </div>
              </div>
            </div>
          </div>
          <div className="gird-cols-1 mb-12 grid gap-12 px-4 lg:grid-cols-2 xl:grid-cols-3">
            <div>
              <Typography variant="h5" color="blue-gray" className="">
                Platform Settings
              </Typography>
              <div className="flex flex-col gap-12">
                <div>
                  <Typography className="mb-4 block font-normal text-blue-gray-500">
                    Account
                  </Typography>
                  <div className="flex flex-col gap-6">
                    {emailSettings.map(({ checked, label }) => (
                      <Switch
                        key={label}
                        id={label}
                        label={label}
                        defaultChecked={checked}
                        labelProps={{
                          className: "text-sm font-normal text-blue-gray-500 ml-10",
                        }}
                        onChange={(e) => handleChange(label, e.target.checked)}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-2">
              <div className="flex items-start justify-between px-6 pb-6">
                <div>
                  <Typography variant="h5" color="blue-gray">
                    Dashboard Configurator
                  </Typography>
                  <Typography className="font-normal text-blue-gray-600">
                    See our dashboard options.
                  </Typography>
                </div>
              </div>
              <div className="py-4 px-6">
                <div className="mb-12">
                  <Typography variant="h6" color="blue-gray">
                    Sidenav Colors
                  </Typography>
                  <div className="mt-3 flex items-center gap-2">
                    {Object.keys(sidenavColors).map((color) => (
                      <span
                        key={color}
                        className={`h-6 w-6 cursor-pointer rounded-full border bg-gradient-to-br transition-transform hover:scale-105 ${sidenavColors[color]
                          } ${sidenavColor === color ? "border-black" : "border-transparent"
                          }`}
                        onClick={() => setSidenavColor(dispatch, color)}
                      />
                    ))}
                  </div>
                </div>
                <div className="mb-12">
                  <Typography variant="h6" color="blue-gray">
                    Sidenav Types
                  </Typography>
                  <Typography variant="small" color="gray">
                    Choose between 3 different sidenav types.
                  </Typography>
                  <div className="mt-3 flex items-center gap-2">
                    <Button
                      variant={sidenavType === "dark" ? "gradient" : "outlined"}
                      onClick={() => setSidenavType(dispatch, "dark")}
                    >
                      Dark
                    </Button>
                    <Button
                      variant={sidenavType === "transparent" ? "gradient" : "outlined"}
                      onClick={() => setSidenavType(dispatch, "transparent")}
                    >
                      Transparent
                    </Button>
                    <Button
                      variant={sidenavType === "white" ? "gradient" : "outlined"}
                      onClick={() => setSidenavType(dispatch, "white")}
                    >
                      White
                    </Button>
                  </div>
                </div>
                <div className="mb-12">
                  <hr />
                  <div className="flex items-center justify-between py-5">
                    <Typography variant="h6" color="blue-gray">
                      Navbar Fixed
                    </Typography>
                    <Switch
                      id="navbar-fixed"
                      value={fixedNavbar}
                      onChange={() => setFixedNavbar(dispatch, !fixedNavbar)}
                    />
                  </div>
                  <hr />
                </div>
              </div>
            </div>
          </div>
          <div className="px-4 pb-4">
          </div>
        </CardBody>
      </Card>
    </>
  );
}

export default Profile;
