'use client'
import React from 'react'
import Detail from './shipping/Detail'
import Truck from './shipping/Truck'

export default function ShipmentDetails() {
    return (
        <div className="container w-full h-fit mt-auto flex md:flex-row flex-col gap-2">
            <Detail />
            <Truck />
        </div>
    )
}
