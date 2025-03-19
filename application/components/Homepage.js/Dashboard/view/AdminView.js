import React from 'react'
import ShipmentDetails from '../ShipmentDetails'
import ShipmentTrack from '../ShipmentTrack'

export default function AdminView({setShow}) {
    return (
        <div className="container w-full flex flex-col gap-5 md:gap-0 h-screen xl:overflow-hidden rounded-2xl md:p-3">
            <ShipmentTrack setShow={setShow} />
            <ShipmentDetails />
        </div>
    )
}
