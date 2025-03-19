'use client';
import SideBar from '@/components/bars/SideBar';
import Loader from '@/components/loaders/Loader';
import OrderTable from '@/components/order/OrderTable';
import { DataContext } from '@/context/DataContext';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';

export default function Page() {
    const [showSideBar, setShowSideBar] = useState(false);
    const [data, setData] = useState([]);
    const { loading, setLoading } = useContext(DataContext);

    useEffect(() => {
        let e = localStorage.getItem('email');
        getOrders(e);
    }, [])

    function getOrders(e) {
        axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/getorders`).then((res) => {
            setData(res?.data);
        })
    }

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

            <div className="w-full md:h-screen h-fit md:bg-slate-100 bg-white md:w-full flex flex-col ">
                <h1 className="text-3xl font-semibold mx-5 my-10">your orders</h1>
                <OrderTable orders={data} />
            </div>

        </div>
    );
}
