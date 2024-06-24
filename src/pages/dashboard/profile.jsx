import {
  Card,
  CardBody,
  Avatar,
  Typography,
  Switch,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { ProfileInfoCard, MessageCard } from "@/widgets/cards";
import { useEffect, useState } from "react";
import axios from "axios";

export function Profile() {

  const [profileData, setProfileData] = useState([]);
  const [user, setUser] = useState([]);
  const [emailSettings, setEmailSettings] = useState([
    {
      checked: false,
      label: "Email Me When Clicked"
    },
    {
      checked: false,
      label: "Email Me When Recommended"
    },
    {
      checked: false,
      label: "Email Me When Recommended in an Itinerary"
    },
  ])

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
          ])
          setProfileData(response.data[0])
      })
      .catch(error => {
          console.error('Error adding business:', error);
      });
    };

    getProfileData();
  }, [])

  useEffect(() => {
    const response = axios({
      method: 'POST',
      url: 'http://127.0.0.1:8000/api/updateUserProfile/',
      headers: {
          'Authorization': `Token ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
      },
      data: { email_when_clicked: emailSettings[0].checked, email_when_recommended: emailSettings[1].checked, email_when_itinerary_recommended: emailSettings[2].checked },
      withCredentials: true,
    });
  }, [emailSettings]);

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
                  {profileData.user} {profileData.user__last_name}
                </Typography>
                <Typography
                  variant="small"
                  className="font-normal text-blue-gray-600"
                >
                  {profileData.emailSettings}
                </Typography>
              </div>
            </div>
          </div>
          <div className="gird-cols-1 mb-12 grid gap-12 px-4 lg:grid-cols-2 xl:grid-cols-3">
            <div>
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Platform Settings
              </Typography>
              <div className="flex flex-col gap-12">
                  <div>
                    <Typography className="mb-4 block text-xs font-semibold uppercase text-blue-gray-500">
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
                          onChange={(e) => {
                            setEmailSettings((prev) =>
                              prev.map((item) =>
                                item.label === label
                                  ? { ...item, checked: e.target.checked }
                                  : item
                              )
                            );
                          }}
                        />
                      ))}
                    </div>
                  </div>
              </div>
            </div>
            <div className="col-span-2">
              <div className="flex flex-col w-full h-auto justify-center items-center">
                <Typography variant="h6" color="blue-gray" className="mb-3">
                  Your Current Plan
                  {/* put stripe logo here */}
                </Typography>
                <div className="shadow-md max-w-6xl border-2 border-blue-gray-100 px-24 py-8 rounded-lg text-center">
                  <Typography variant="h5" color="blue-gray" className="mb-3">
                    Basic
                  </Typography>
                  <Typography variant="h6" color="blue-gray" className="mb-3 text-left">
                    Items:
                  </Typography>
                  <div>
                    {/* stripeData.map(({planData, key, value})) */}
                    <Typography variant="h9" color="blue-gray" className="mb-3 text-left">
                      1x Business Plan.............................$100 {/* get data from stripe api request for here so it will be <var>.map(<data>, ....) */}
                    </Typography>
                    <Typography variant="h9" color="blue-gray" className="mb-3 text-left">
                      1x Ad Banner....................................$20  {/* get data from stripe api request for here so it will be <var>.map(<data>, ....) */}
                    </Typography>
                    <Typography variant="h9" color="blue-gray" className="mb-3 text-left">
                      Next Payment Date: 7/31/2024  {/* get data from stripe api request for here so it will be <var>.map(<data>, ....) */}
                    </Typography>
                  </div>
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
