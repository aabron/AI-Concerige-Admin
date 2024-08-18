import React, { useState, useEffect } from "react";
import { Card, CardBody, Typography } from "@material-tailwind/react";
import axios from "axios";
import StripePricingTable from "./stripe/pricing";

const Billing = () => {
    const [bussinessData, setBussinessData] = useState([]);
    const [recentInvoiceData, setRecentInvoiceData] = useState([]);
    const [previousInvoiceData, setPreviousInvoiceData] = useState([]);
    const [previousInvoiceUrls, setPreviousInvoiceUrls] = useState([]);

    useEffect(() => {
        const getBusinessData = async () => {
            const response = await axios.get('https://ai-concierge-main-0b4b3d25a902.herokuapp.com/api/getUserBusinessData/', {
                headers: {
                    'Authorization': `Token ${localStorage.getItem('token')}`
                },
                withCredentials: true
            });
            setBussinessData(response.data[0]);
        };
        const getInvoiceData = async () => {
            const response = await axios.get('https://ai-concierge-main-0b4b3d25a902.herokuapp.com/api/getInvoices/', {
                headers: {
                    'Authorization': `Token ${localStorage.getItem('token')}`
                },
                withCredentials: true
            });
            setRecentInvoiceData(response.data["invoices"].slice(-1)[0]);
            setPreviousInvoiceData(response.data["invoices"]);
            setPreviousInvoiceUrls(response.data["invoices"].map(invoice => invoice.hosted_invoice_url));
            console.log(response.data["invoices"].slice(-1)[0])
        };
        getInvoiceData();
        getBusinessData();
    }, []);

    return (
        <div className="flex items-center mt-16 bg-gray-100 w-full">
            <Card className="mx-3 mb-6 lg:mx-4 border border-blue-gray-100 w-full">
                <CardBody className="">
                    {bussinessData.payed ?
                        <>
                            <div className="mb-10 flex flex-col items-left">
                                <h1 className="text-3xl font-semibold text-black mb-2">Billing</h1>
                                <p className="text-base text-blue-gray-400">Manage your billing information and view your subscription details below.</p>
                            </div>

                            <div className="mb-12 grid grid-cols-1 lg:grid-cols-2 gap-6">
                                <div className="flex flex-col items-start h-full px-4 py-6 border border-blue-gray-100 rounded-lg shadow-md bg-white">
                                    <Typography variant="h4" className=" mb-4 text-blue-gray-800">
                                        Last Invoice Details
                                    </Typography>
                                    <div className="w-full flex flex-col justify-center">
                                        <div className="flex flex-col space-y-2">
                                            <Typography className="text-base text-black mb-2">
                                                <strong>Amount Paid:</strong> ${parseFloat(recentInvoiceData.amount_paid / 100).toFixed(2)}
                                            </Typography>
                                            <Typography className="text-base text-black mb-2">
                                                <strong>Amount Remaining:</strong> ${parseFloat(recentInvoiceData.amount_remaining).toFixed(2)}
                                            </Typography>
                                            <Typography className="text-base text-black mb-2">
                                                <strong>Next Due Date:</strong> {new Date(recentInvoiceData.due_date).toLocaleDateString()}
                                            </Typography>
                                            <Typography className="text-base text-black mb-2">
                                                <strong>Status:</strong> {recentInvoiceData.status}
                                            </Typography>
                                            <Typography className="text-base text-black mb-2">
                                                <strong>Created At:</strong> {new Date(recentInvoiceData.created_at).toLocaleString()}
                                            </Typography>
                                            <Typography className="text-base text-black mb-2">
                                                <strong>Updated At:</strong> {new Date(recentInvoiceData.updated_at).toLocaleString()}
                                            </Typography>
                                        </div>
                                        <div className="mt-6">
                                            <Typography className="text-base text-black mb-2">
                                                <strong>Update or Cancel Plan:</strong>
                                            </Typography>
                                            <Typography className="text-base text-blue-gray-400 mb-2">
                                                You can update or cancel your subscription plan by visiting the stripe one time billing portal.
                                            </Typography>
                                            <a href="https://billing.stripe.com/p/login/test_28ocPf1Pg25F7VScMM" className="text-blue-500 hover:underline">
                                                Go to Billing Portal
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col items-start h-full justify-center px-4 py-6 border border-blue-gray-100 rounded-lg shadow-md bg-white">
                                    <Typography variant="h4" className="text-center mb-4 text-blue-gray-800">
                                        Previous Invoices
                                    </Typography>
                                    <div className="w-full overflow-scroll">
                                        <div className="flex flex-col space-y-2">
                                            {previousInvoiceData?.map((invoice, index) => (
                                                <div key={index} className="mb-4">
                                                    <Typography className="text-base text-black mb-2">
                                                        <strong>Invoice {index + 1}:</strong>
                                                    </Typography>
                                                    <Typography className="text-base text-black mb-2">
                                                        <strong>Amount Due:</strong> ${parseFloat(invoice.amount_due / 100).toFixed(2)}
                                                    </Typography>
                                                    <Typography className="text-base text-black mb-2">
                                                        <strong>Amount Paid:</strong> ${parseFloat(invoice.amount_paid / 100).toFixed(2)}
                                                    </Typography>
                                                    <Typography className="text-base text-black mb-2">
                                                        <strong>Amount Remaining:</strong> ${parseFloat(invoice.amount_remaining).toFixed(2)}
                                                    </Typography>
                                                    <Typography className="text-base text-black mb-2">
                                                        <strong>Next Due Date:</strong> {new Date(invoice.due_date).toLocaleDateString()}
                                                    </Typography>
                                                    <Typography className="text-base text-black mb-2">
                                                        <strong>Status:</strong> {invoice.status}
                                                    </Typography>
                                                    <Typography className="text-base text-black mb-2">
                                                        <strong>Created At:</strong> {new Date(invoice.created_at).toLocaleString()}
                                                    </Typography>
                                                    <Typography className="text-base text-black mb-2">
                                                        <strong>Updated At:</strong> {new Date(invoice.updated_at).toLocaleString()}
                                                    </Typography>
                                                    <a href={previousInvoiceUrls[index]} className="text-blue-500 hover:underline">
                                                        View Invoice
                                                    </a>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                        :
                        <>
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
                        </>
                    }
                </CardBody>
            </Card>
        </div>
    );
};

export default Billing;
