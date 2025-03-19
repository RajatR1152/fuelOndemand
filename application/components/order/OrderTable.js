'use client'
import { DataContext } from '@/context/DataContext';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export default function OrderTable({ orders }) {
    const [email, setEmail] = useState('');
    const { userData, viewer } = useContext(DataContext);

    useEffect(() => {
        let e = localStorage.getItem('email');
        setEmail(e);
    }, []);

    const cancelOrder = async (orderId) => {
        try {
            const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/cancel`, { orderId });
            toast.success('Order cancelled:');
        } catch (error) {
            toast.error('Failed to cancel order:');
        }
    };

    const markComplete = async (orderId) => {
        try {
            const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/confirm`, { orderId });
            toast.success('Order confirmed:');
        } catch (error) {
            toast.error('Failed to confirm order:');
        }
    };

    return (
        <div className="w-full overflow-x-auto p-5">
            <table className="w-full border-collapse border border-gray-200">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="border border-gray-300 px-4 py-2 text-left">Full Name</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Email</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Address</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Fuel Type</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Quantity</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Payment Method</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Price</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Action</th>
                    </tr>
                </thead>
                <tbody>

                    {
                        viewer == 'admin' ? (
                            orders.reverse()
                                .map((order, index) => (
                                    <tr key={index} className="hover:bg-gray-50">
                                        <td className="border border-gray-300 px-4 py-2">{order?.fullName}</td>
                                        <td className="border border-gray-300 px-4 py-2">{order?.email}</td>
                                        <td className="border border-gray-300 px-4 py-2">{order?.address}</td>
                                        <td className="border border-gray-300 px-4 py-2">{order?.fuelType}</td>
                                        <td className="border border-gray-300 px-4 py-2">{order?.quantity}</td>
                                        <td className="border border-gray-300 px-4 py-2">{order?.paymentMethod}</td>
                                        <td className="border border-gray-300 px-4 py-2">₹{order?.price}</td>
                                        <td className="border border-gray-300 px-4 flex gap-5 py-2">
                                            {order.status == 'pending' ? <button
                                                onClick={() => cancelOrder(order?.id)}
                                                className="w-fit px-6 py-2 rounded-xl bg-red-500 hover:bg-red-600 font-semibold text-white"
                                            >
                                                Cancel
                                            </button> :
                                                <p className="text-green-500 fon-semibold">completed</p>
                                            }
                                            {
                                                viewer == 'admin' && order.status == 'pending' ?
                                                    <button
                                                        onClick={() => markComplete(order?.id)}
                                                        className="w-fit px-6 py-2 rounded-xl bg-green-500 hover:bg-green-600 font-semibold text-white"
                                                    >done
                                                    </button>
                                                    :
                                                    null
                                            }
                                        </td>
                                    </tr>
                                ))
                        )
                            :
                            <>
                                {
                                    orders.length > 0 ?
                                        orders.reverse()
                                            .filter(order => order.email === userData?.email).reverse()
                                            .map((order, index) => (
                                                <tr key={index} className="hover:bg-gray-50">
                                                    <td className="border border-gray-300 px-4 py-2">{order?.id || 'N/A'}</td>
                                                    <td className="border border-gray-300 px-4 py-2">{order?.fullName}</td>
                                                    <td className="border border-gray-300 px-4 py-2">{order?.email}</td>
                                                    <td className="border border-gray-300 px-4 py-2">{order?.address}</td>
                                                    <td className="border border-gray-300 px-4 py-2">{order?.fuelType}</td>
                                                    <td className="border border-gray-300 px-4 py-2">{order?.quantity}</td>
                                                    <td className="border border-gray-300 px-4 py-2">{order?.paymentMethod}</td>
                                                    <td className="border border-gray-300 px-4 py-2">₹{order?.price}</td>
                                                    <td className="border border-gray-300 px-4 py-2">
                                                        {order.status == 'pending' ? <button
                                                            onClick={() => cancelOrder(order?.id)}
                                                            className="w-fit px-6 py-2 rounded-xl bg-red-500 hover:bg-red-600 font-semibold text-white"
                                                        >
                                                            Cancel
                                                        </button> :
                                                            <p className="text-green-500 fon-semibold">completed</p>
                                                        }
                                                    </td>
                                                </tr>
                                            ))
                                        :
                                        <div className="contaiern p-5 w-full text-center">
                                            <h1 className="text-lg font-bold">you dont have any orders</h1>
                                        </div>
                                }
                            </>

                    }

                </tbody>
            </table>
        </div>
    );
}






