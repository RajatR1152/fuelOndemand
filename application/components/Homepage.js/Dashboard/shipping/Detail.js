'use client'
import PriceFormatter from '@/components/PriceFormatter'
import { DataContext } from '@/context/DataContext'
import axios from 'axios'
import Link from 'next/link'
import React, { useContext, useEffect, useState } from 'react'
import { CiLocationOn } from 'react-icons/ci'
import { FaUser } from 'react-icons/fa6'

export default function Detail() {

    const { viewer, userData } = useContext(DataContext);
    const [data, setData] = useState([]);
    const [adData, setAdData] = useState([]);

    useEffect(() => {
        let e = localStorage.getItem('email');
        getOrders(e);
        getOrders2();

    }, [])

    function getOrders(e) {
        axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/getuserorder`, { email: e }).then((res) => {
            let data = res?.data.reverse();
            setData(data);
        })
    }

    function getOrders2(e) {
        axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/getorders`).then((res) => {
            setAdData(res?.data.reverse());
        })
    }
    return (
        <div className={`container md:w-full xl:${viewer == 'admin' ? 'w-8/12' : 'w-full'} h-fit md:h-full bg-white rounded-3xl p-3 px-5`}>

            <div className="container w-full flex items-center">
                <h1 className="text-xl xl:text-2xl font-semibold text-gray-800 capitalize">{viewer == 'admin' ? "shipping details" : "Orders"}</h1>
                <Link href={'/orders'} className="text-md text-red-500 font-semibold ms-auto">view all</Link>
            </div>

            {
                viewer == 'admin' ?
                    <div className="flex md:flex-row flex-col mt-4">

                        <div className="container md:w-8/12 xl:w-4/12 md:rounded-s-3xl border p-3">

                            <div className="container mt-5 gap-4 items-center w-8/12 mx-auto flex ">
                                <FaUser size={22} />
                                <p className="text-lg capitalize font-semibold text-center">{adData[0]?.fullName}</p>
                            </div>

                            <div className="container w-8/12 mx-auto items-center flex gap-4">
                                <CiLocationOn size={32} />
                                <p className="text-md font-semibold capitalize mt-4 ">{adData[0]?.address}</p>
                            </div>

                        </div>

                        <div className="container md:w-5/12 xl:w-4/12 border flex flex-col gap-4 items-center p-3">

                            <p className="text-lg font-semibold">{adData[0]?.paymentMethod == 'UPI' ? 'have been paid' : 'have to pay'} :</p>

                            <p className="text-4xl font-semibold text-red-500"><PriceFormatter price={adData[0]?.price} /></p>

                            <div className="container w-full items-center justify-center flex gap-4 mt-4">
                                <Link href={'/orders'} className="p-2 px-4 bg-red-500 font-semibold text-white rounded-xl">view details</Link>
                                <Link href={'/orders'} className="p-2 px-4 bg-red-500 font-semibold text-white rounded-xl">cancel</Link>
                            </div>

                        </div>

                        <div className="container w-full xl:items-start items-center justify-center xl:w-4/12 border md:hidden rounded-e-none md:rounded-e-3xl flex xl:flex flex-col gap-3 p-3">

                            <p className="text-lg font-semibold capitalize">status</p>
                            <p className="text-lg font-semibold p-2 px-4 bg-red-500 text-white rounded-xl w-fit capitalize">{adData[0]?.status}</p>
                            <p className="text-lg font-semibold capitalize">fuel type</p>
                            <p className="text-lg font-semibold p-2 px-4 bg-red-500 text-white rounded-xl w-fit  capitalize">{adData[0]?.fuelType}</p>

                        </div>

                    </div> :
                    (
                        <>

                            {data.length > 0 ? <div className="flex md:flex-row flex-col mt-4">

                                <div className="container md:w-8/12 xl:w-4/12 md:rounded-s-3xl border p-3">

                                    <div className="container mt-5 gap-4 items-center w-8/12 mx-auto flex ">
                                        <FaUser size={22} />
                                        <p className="text-lg capitalize font-semibold text-center">{data[0]?.fullName}</p>
                                    </div>

                                    <div className="container w-8/12 mx-auto items-center flex gap-4">
                                        <CiLocationOn size={32} />
                                        <p className="text-md font-semibold capitalize mt-4 ">{data[0]?.address}</p>
                                    </div>

                                </div>

                                <div className="container md:w-5/12 xl:w-4/12 border flex flex-col gap-4 items-center p-3">

                                    <p className="text-lg font-semibold">{data[0]?.paymentMethod == 'UPI' ? 'have been paid' : 'have to pay'} :</p>

                                    <p className="text-4xl font-semibold text-red-500"><PriceFormatter price={data[0]?.price} /></p>

                                    <div className="container w-full items-center justify-center flex gap-4 mt-4">
                                        <Link href={'/orders'} className="p-2 px-4 bg-red-500 font-semibold text-white rounded-xl">view details</Link>
                                        <Link href={'/orders'} className="p-2 px-4 bg-red-500 font-semibold text-white rounded-xl">cancel</Link>
                                    </div>

                                </div>

                                <div className="container w-full xl:items-start items-center justify-center xl:w-4/12 border md:hidden rounded-e-none md:rounded-e-3xl flex xl:flex flex-col gap-3 p-3">

                                    <p className="text-lg font-semibold capitalize">status</p>
                                    <p className="text-lg font-semibold p-2 px-4 bg-red-500 text-white rounded-xl w-fit capitalize">{data[0]?.status}</p>
                                    <p className="text-lg font-semibold capitalize">fuel type</p>
                                    <p className="text-lg font-semibold p-2 px-4 bg-red-500 text-white rounded-xl w-fit  capitalize">{data[0]?.fuelType}</p>

                                </div>

                            </div> :
                                <div className="container h-fit md:h-[200px]">
                                    <h1 className="text-3xl my-10 md:my-0 font-semibold text-center">you dont have any orders</h1>
                                </div>
                            }
                        </>
                    )

            }


        </div>
    )
}
