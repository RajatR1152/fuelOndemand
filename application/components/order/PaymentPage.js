'use client'
import axios from 'axios';
import React from 'react'
import { useRazorpay } from 'react-razorpay';
import { cngPrice, dieselPrice, petrolPrice } from '../local/localVars';
import { toast } from 'react-toastify';

export default function PaymentPage({ formData }) {
    const { Razorpay } = useRazorpay();



    const handlePayment = async () => {


        const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/order`, { amount: formData?.price })
        const { amount, orderId } = res.data;

        const options = {
            key: "rzp_test_PwPHcfV19dGbu7",
            amount: amount,
            currency: "INR",
            name: "Test Company",
            description: "Test Transaction",
            order_id: orderId,
            handler: (response) => {

                axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/createorder`, { data: formData }).then(() => {
                    toast.success('order created successfully')
                })
            },
            prefill: {
                name: formData.fullName,
                email: formData.email,
                contact: formData.contactNumber,
            },
            theme: {
                color: "#F37254",
            },
        };

        const razorpayInstance = new Razorpay(options);
        razorpayInstance.open();

        razorpayInstance.on('payment.failed', (response) => {
            console.log('Payment failed:', response.error);
            alert("Payment Failed. Please try again.");
        });
    }

    return (
        <div>
            <h1 className="text-xl font-semibold capitalize my-5">confirm order</h1>
            <div className="overflow-x-auto">
                <table className="min-w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Field</th>
                            <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Value</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.entries(formData).map(([key, value]) => (
                            <tr key={key} className="even:bg-gray-50">
                                <td className="border border-gray-300 px-4 py-2 capitalize">{key}</td>
                                <td className="border border-gray-300 px-4 py-2">{value || '-'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <button onClick={handlePayment} className="w-full mt-5 bg-red-500 hover:bg-600 p-3 roundex-xl font-semibold text-white">pay now</button>
        </div>
    );
}

