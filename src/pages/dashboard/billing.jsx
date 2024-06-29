import React from "react";
import { Card, CardBody, Typography } from "@material-tailwind/react";
import StripePricingTable from "./stripe/pricing";

const Billing = () => {
    
    return (
        <div className="flex items-center mt-16 bg-gray-100 w-full">
            <Card className="mx-3 mb-6 lg:mx-4 border border-blue-gray-100 w-full">
                <CardBody className="">
                    <div className="mb-10 flex items-center justify-between flex-wrap gap-6">
                        <div className="flex items-center gap-6">
                            <Typography>
                                <h1 className="text-2xl font-semibold text-black">Billing</h1>
                                <p className="text-base text-blue-gray-400">Manage your billing information and view your subscription details below.</p>
                            </Typography>
                        </div>
                    </div>
                    <div className="">
                        <div className="flex flex-col items-center h-full justify-center px-2 py-3 border border-blue-gray-100 rounded-lg shadow-md">
                            <h5 className="text-lg text-black text-center mb-12">Your current subscription plan details will be displayed here.</h5>
                            <div className="w-full rounded-lg">
                                <StripePricingTable />
                            </div>
                        </div>
                    </div>
                </CardBody>
            </Card>
        </div>
    );
};

export default Billing;
