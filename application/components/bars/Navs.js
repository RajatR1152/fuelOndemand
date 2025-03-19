'use client'
import Link from 'next/link'
import React, { useContext } from 'react'
import { RxDashboard } from "react-icons/rx";
import { CiDeliveryTruck, CiUser } from "react-icons/ci";
import { AiOutlineHistory } from "react-icons/ai";
import { DataContext } from '@/context/DataContext';
import { BsFuelPump, BsPlusSquare } from "react-icons/bs";


export default function Navs() {

    const { viewer, setLoading, loading } = useContext(DataContext);

    return (
        <div className="contianer w-full rounded-xl bg-white lg:my-4 xl:my-5 flex flex-col p-2">

            <Link onClick={() => { setLoading(true) }} href={'/'} className='capitalize text-md font-semibold hover:bg-red-500 hover:text-white flex gap-2 items-center p-3 w-full rounded-2xl '> <RxDashboard size={20} /> dashboard</Link>
            {
                viewer == "user"
                    ?
                    <Link onClick={() => { setLoading(true) }} href={'/new'} className='capitalize text-md font-semibold hover:bg-red-500 hover:text-white flex gap-2 items-center p-3 w-full rounded-2xl '><BsPlusSquare className='font-bold' size={25} />new order</Link> :
                    null
            }
            {
                viewer == "admin"
                    ?
                    <Link onClick={() => { setLoading(true) }} href={'/orders'} className='capitalize text-md font-semibold hover:bg-red-500 hover:text-white flex gap-2 items-center p-3 w-full rounded-2xl '><CiDeliveryTruck className='font-bold' size={25} />shipments</Link>
                    : <Link onClick={() => { setLoading(true) }} href={'/orders'} className='capitalize text-md font-semibold hover:bg-red-500 hover:text-white flex gap-2 items-center p-3 w-full rounded-2xl '><CiDeliveryTruck className='font-bold' size={25} />orders</Link>
            }
            {
                viewer == "admin"
                    ?
                    <Link onClick={() => { setLoading(true) }} href={'/'} className='capitalize text-md font-semibold hover:bg-red-500 hover:text-white flex gap-2 items-center p-3 w-full rounded-2xl '><CiUser className='font-bold' size={25} />customers</Link>
                    : null
            }
            <Link onClick={() => { setLoading(true) }} href={'/'} className='capitalize text-md font-semibold hover:bg-red-500 hover:text-white flex gap-2 items-center p-3 w-full rounded-2xl '><BsFuelPump className='font-bold' size={25} />fuel stations</Link>
            {/* <Link onClick={()=>{setLoading(true)}} href={'/'} className='capitalize text-md font-semibold hover:bg-red-500 hover:text-white flex gap-2 items-center p-3 w-full rounded-2xl '><CiBellOn className='font-bold' size={25} />notifications</Link> */}
            <Link onClick={() => { setLoading(true) }} href={'/orders'} className='capitalize text-md font-semibold hover:bg-red-500 hover:text-white flex gap-2 items-center p-3 w-full rounded-2xl '><AiOutlineHistory size={25} />history</Link>

        </div>
    )
}
