import {
    Card,
    CardBody,
    Typography,
  } from "@material-tailwind/react";
  import { useEffect, useState } from "react";
  import axios from "axios";
  
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
                const response = await axios.get("http://127.0.0.1:8000/api/getBusinessBanner/", {
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

    console.log(businessBanner.image)
  
    return (
      <>
        <Card className="mx-3 mt-16 mb-6 lg:mx-4 border border-blue-gray-100">
          <CardBody className="p-4">
            <div className="mb-10 flex items-center justify-between flex-wrap gap-6">
              <div className="flex items-center gap-6">
                <Typography>
                  <h1 className="text-2xl font-semibold text-black">Add Your Ad Banner</h1>
                </Typography>
              </div>
            </div>
            <div className="grid-cols-1 mb-12 grid gap-12 px-4 lg:grid-cols-2 xl:grid-cols-3">
              <div className="flex flex-col items-center h-full justify-center">
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="ml-10 mb-4 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <button
                  onClick={handleUpload}
                  className="px-4 py-2 bg-gray-900 text-white rounded-md shadow-md hover:bg-gray-600/75 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 duration-300 ease-in-out"
                >
                  Upload
                </button>
              </div>
              <div className="col-span-2">
                <div className="flex flex-col w-full h-auto justify-center items-center">
                    <h1 className="text-2xl font-semibold text-black">Current Ad Banner</h1>
                    {businessBanner ? (
                        <img
                            src={businessBanner.image}
                            alt="Ad Banner"
                            className="w-auto h-20"
                        />
                    ) : (
                    selectedFile ? (
                        <img
                            src={URL.createObjectURL(selectedFile)}
                            alt="Ad Banner"
                            className="w-auto h-20"
                        />
                    ) : (
                        <img src="https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM=" alt="Ad Banner" className="w-auto h-72" />
                    ))}
                </div>
              </div>
            </div>
            <div className="px-4 pb-4"></div>
          </CardBody>
        </Card>
      </>
    );
  }
  
  export default AddBanner;
  