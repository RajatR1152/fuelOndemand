'use client';
import SideBar from '@/components/bars/SideBar';
import Loader from '@/components/loaders/Loader';
import Done from '@/components/order/Done';
import OrderForm from '@/components/order/OrderForm';
import PaymentPage from '@/components/order/PaymentPage';
import { DataContext } from '@/context/DataContext';
import React, { useContext, useEffect, useState } from 'react';

export default function Page() {
    const [showSideBar, setShowSideBar] = useState(false);
    const { loading, setLoading } = useContext(DataContext);
    const [isFilled, setIsFilled] = useState(false);
    const [formData, setFormData] = useState({
        fullName: '',
        contactNumber: '',
        email: '',
        address: '',
        landmark: '',
        fuelType: '',
        quantity: '',
        paymentMethod: '',
        termsAccepted: false,
    });

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 2300);
    }, [])

    if (loading) return <Loader />


    return (
        <div className="flex w-full h-screen">
            <div className="lg:w-3/12 xl:w-2/12 hidden lg:block">
                <SideBar />
            </div>

            {showSideBar && (
                <div className="fixed w-10/12 lg:hidden z-50">
                    <SideBar show={setShowSideBar} setShow={setShowSideBar} />
                </div>
            )}

            <div className="w-full md:h-screen h-fit md:bg-slate-100 bg-white md:w-9/12 flex flex-col items-center justify-center xl:w-10/12">
                {isFilled ? (
                    formData.paymentMethod == 'UPI' ? (
                        <PaymentPage formData={formData} />
                    ) : (
                        <Done formData={formData} />
                    )
                ) : (
                    <OrderForm
                        setIsFilled={setIsFilled}
                        formData={formData}
                        setFormData={setFormData}
                    />
                )}
            </div>
        </div>
    );
}
