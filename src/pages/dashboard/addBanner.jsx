import {
    Card,
    CardBody,
    Typography,
  } from "@material-tailwind/react";
  import { useEffect, useState } from "react";
  import axios from "axios";
  import { Link } from "react-router-dom";
  
  export function AddBanner() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [businessBanner, setBusinessBanner] = useState([]);
  
    const handleFileChange = (event) => {
      setSelectedFile(event.target.files[0]);
    };
  
    const handleUpload = async () => {
      if (!selectedFile) return;
      const formData = new FormData();
      formData.append("business_banner", selectedFile);
  
      try {
        const response = await axios.post("https://ai-concierge-main-0b4b3d25a902.herokuapp.com/api/updateBusinessBanner/", formData, {
          headers: {
            "Authorization": `Token ${localStorage.getItem('token')}`,
            "Content-Type": "multipart/form-data",
          },
        });
        console.log("File uploaded successfully:", response.data);
        // Handle success response
      } catch (error) {
        console.error("Error uploading file:", error);
        // Handle error response
      }
    };
  
    useEffect(() => {
        const getBusinessBanner = async () => {
            try {
                const response = await axios.get("https://ai-concierge-main-0b4b3d25a902.herokuapp.com/api/getBusinessBanner/", {
                    headers: {
                        "Authorization": `Token ${localStorage.getItem('token')}`,
                    },
                });
                setBusinessBanner(response.data);
            } catch (error) {
                console.error("Error getting business banner:", error);
            }
        }
        getBusinessBanner();
    }, []);

    // console.log(businessBanner)
  
    return (
      <>
        <Card className="mx-3 mt-16 mb-6 lg:mx-4 border border-blue-gray-100">
          <CardBody className="p-4">
            {businessBanner.payed ? (
              <>
                <div className="mb-10 flex items-center justify-between flex-wrap gap-6">
                  <div className="flex items-center gap-6">
                    <Typography>
                      <h1 className="text-2xl font-semibold text-black">Add Your Ad Banner</h1>
                      <p className="text-base text-blue-gray-400">Ad Banners are only available in the Ad Banner plan or the Both plan. </p>
                    </Typography>
                  </div>
                </div>
                <div className="grid-cols-1 mb-12 grid gap-12 px-4 lg:grid-cols-2 xl:grid-cols-3">
                  <div className="flex flex-col items-center h-full justify-center px-2 py-3 border border-blue-gray-100 rounded-lg shadow-md">
                    <h5 className="text-lg text-black text-center mb-12 ">Here you can upload the ad banner that will be placed at the bottom of any Mobile Dynamic Dispaly</h5>
                    <input
                      type="file"
                      onChange={handleFileChange}
                      className=" mb-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    <button
                      onClick={handleUpload}
                      className="px-4 py-2 bg-gray-900 text-white rounded-md shadow-md hover:bg-gray-600/75 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 duration-300 ease-in-out"
                    >
                      Upload
                    </button>
                    {selectedFile ? (
                            <img
                                src={URL.createObjectURL(selectedFile)}
                                alt="Ad Banner"
                                className="w-auto max-h-[550px] rounded-lg mt-5"
                            />
                        ) : (
                            <img src="https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM=" alt="Ad Banner" className="w-auto max-w-[540px] max-h-[225px] rounded-lg mt-5" />
                    )};
                  </div>
                  <div className="col-span-2 px-2 py-3 border border-blue-gray-100 rounded-lg shadow-md">
                    <div className="flex flex-col w-full h-auto justify-center items-center">
                        <h1 className="text-2xl font-semibold text-black">Current Ad Banner</h1>
                        <h5 className="text-lg text-black text-center mb-5">This is the current ad banner that will be placed at the bottom of any Mobile Dynamic Dispaly</h5>
                        {businessBanner && (
                            <img
                                src={businessBanner.image}
                                alt="Ad Banner"
                                className="w-auto max-h-[550px] rounded-lg"
                            />
                        )}
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center h-full">
                <h1 className="text-2xl font-semibold text-black">You must pay for the business banner</h1>
                <h5 className="text-xl font-normal text-blue-gray-500">The Bussines Banner is only available in the Ad Banner Plan or the Both Plan</h5>
                <Link to="/dashboard/Billing">
                  <button className="px-4 py-2 mt-4 bg-gray-900 text-white rounded-md shadow-md hover:bg-gray-600/75 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 duration-300 ease-in-out animate-bounce">
                    Go to Billing
                  </button>
                </Link>
              </div>
            )}
            <div className="px-4 pb-4"></div>
          </CardBody>
        </Card>
      </>
    );
  }
  
  export default AddBanner;
  