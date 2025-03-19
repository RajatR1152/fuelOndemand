import React from 'react'
import ShipmentTrack from '../ShipmentTrack'
import Orders from '../user/Orders'

export default function UserView({ setShow }) {
  return (
    <div className="container w-full flex flex-col gap-5 md:gap-0 h-screen xl:overflow-hidden rounded-2xl md:p-3">
      <ShipmentTrack setShow={setShow} />
      <Orders />
    </div>
  )
}
