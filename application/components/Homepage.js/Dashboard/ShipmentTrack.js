'use client'
import React, { useState } from 'react'
import { FaBars } from 'react-icons/fa'
import MapComponent from '@/components/map/Map';

export default function ShipmentTrack({ setShow }) {


    const [trigger, setTrigger] = useState('tracking');

    return (
        <div className="container w-full h-full md:h-3/4">

            <div className="containe w-full h-fit p-2">

                <FaBars onClick={() => { setShow(true) }} size={20} className='cursor-pointer lg:hidden mb-3' />

                <h1 className="text-2xl font-semibold md:hidden capitalize text-center my-4">shipment details</h1>

               
                <div className="container relative z-0 w-full h-fit">
                    <MapComponent search={"mumbai"} />
                </div>

            </div>

        </div>
    )
}
