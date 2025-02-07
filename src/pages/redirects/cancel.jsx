import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardBody, Typography } from "@material-tailwind/react";

const Cancel = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/dashboard/home");
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <Card className="mx-3 mt-16 mb-6 lg:mx-4 border border-blue-gray-100">
        <CardBody className="p-4">
          <div className="mb-10 flex items-center justify-between flex-wrap gap-6">
            <div className="flex items-center gap-6">
              <Typography>
                <h1 className="text-2xl font-semibold text-black">Payment Cancelled</h1>
                <p className="text-base text-blue-gray-400">You have cancelled your payment. You will be redirected to the dashboard shortly.</p>
              </Typography>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default Cancel;
