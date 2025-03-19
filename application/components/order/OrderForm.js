'use client';

import { DataContext } from '@/context/DataContext';
// import axios from 'axios';
import Link from 'next/link';
import { useContext, useState } from 'react';
import { FaAngleDoubleLeft, FaPlusSquare } from 'react-icons/fa';
import { FaHouse } from 'react-icons/fa6';
import { useRazorpay } from 'react-razorpay';
import { cngPrice, dieselPrice, petrolPrice } from '../local/localVars';

export default function OrderForm({ formData, setFormData, setIsFilled }) {

    const { Razorpay } = useRazorpay();
    const { user } = useContext(DataContext);


    const [errors, setErrors] = useState({});

    let n;
    let v;

    const handleChange = (e) => {
        n = e.target.name;
        v = e.target.value;
        setFormData({ ...formData, [n]: v });

    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        formData.price = formData.quantity *
            (formData.fuelType === 'Petrol'
                ? petrolPrice
                : formData.fuelType === 'Diesel'
                    ? dieselPrice
                    : cngPrice
            );

        setIsFilled(true);


    };

    return (
        <div className="max-w-3xl w-full md:mt-0 mx-auto p-4 sm:p-6 bg-white shadow-lg rounded-xl">

            <div className="container mt-5 md:hidden mb-10 w-full flex gap-5">
                <Link href={'/'}><FaHouse size={22} className='text-gray-600' /></Link>
                <FaAngleDoubleLeft size={22} />
                <FaPlusSquare size={22} className='font-bold text-gray-600' />
            </div>

            <h2 className="text-2xl font-semibold mb-6 text-gray-800">Place Fuel Order</h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">

                <div>
                    <label className="block text-gray-700">Full Name</label>
                    <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        className={`border rounded w-full p-2 mt-1 ${errors.fullName ? 'border-red-500' : ''}`}
                        required
                    />
                    {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName}</p>}
                </div>

                <div>
                    <label className="block text-gray-700">Contact Number</label>
                    <input
                        type="tel"
                        name="contactNumber"
                        value={formData.contactNumber}
                        onChange={handleChange}
                        className={`border rounded w-full p-2 mt-1 ${errors.contactNumber ? 'border-red-500' : ''}`}
                        required
                    />
                    {errors.contactNumber && <p className="text-red-500 text-sm">{errors.contactNumber}</p>}
                </div>

                <div>
                    <label className="block text-gray-700">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`border rounded w-full p-2 mt-1 ${errors.email ? 'border-red-500' : ''}`}
                        required
                    />
                    {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                </div>

                <div>
                    <label className="block text-gray-700">Full Address</label>
                    <textarea
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        className={`border rounded w-full p-2 mt-1 ${errors.address ? 'border-red-500' : ''}`}
                        rows={1}
                        required
                    />
                    {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
                </div>

                <div>
                    <label className="block text-gray-700">Landmark</label>
                    <input
                        type="text"
                        name="landmark"
                        value={formData.landmark}
                        onChange={handleChange}
                        className="border rounded w-full p-2 mt-1"
                    />
                </div>

                <div>
                    <label className="block text-gray-700">Fuel Type</label>
                    <select
                        name="fuelType"
                        value={formData.fuelType}
                        onChange={handleChange}
                        className={`border rounded w-full p-2 mt-1 ${errors.fuelType ? 'border-red-500' : ''}`}
                        required
                    >
                        <option value="">Select Fuel Type</option>
                        <option value="Petrol">Petrol</option>
                        <option value="Diesel">Diesel</option>
                        <option value="CNG">CNG</option>
                    </select>
                    {errors.fuelType && <p className="text-red-500 text-sm">{errors.fuelType}</p>}
                </div>

                <div>
                    <label className="block text-gray-700">Quantity (Liters)</label>
                    <input
                        type="number"
                        name="quantity"
                        value={formData.quantity}
                        onChange={handleChange}
                        className={`border rounded w-full p-2 mt-1 ${errors.quantity ? 'border-red-500' : ''}`}
                        required
                    />
                    {errors.quantity && <p className="text-red-500 text-sm">{errors.quantity}</p>}
                </div>

                <div>
                    <label className="block text-gray-700">Payment Method</label>
                    <select
                        name="paymentMethod"
                        value={formData.paymentMethod}
                        onChange={handleChange}
                        className="border rounded w-full p-2 mt-1"
                        required
                    >
                        <option value="">Select Payment Method</option>
                        <option value="UPI">UPI</option>
                        <option value="Cash on Delivery">Cash on Delivery</option>
                    </select>
                </div>

                <button type="submit" className="bg-red-500 text-white w-full p-2 rounded">Place Order</button>
            </form>
        </div>
    );
}
