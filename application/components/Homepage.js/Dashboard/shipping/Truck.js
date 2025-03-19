
import Link from 'next/link'
import React from 'react'

export default function Truck() {
  return (
    <div className="container md:w-4/12 h-full bg-white rounded-3xl p-5 md:hidden flex xl:flex flex-col gap-3">

      <h1 className="text-xl font-semibold capitalize"> current truck details</h1>

      <img src="https://as2.ftcdn.net/jpg/05/40/76/61/1000_F_540766172_9BreB2fWcDCPpdArO95n5zGB537lWjdN.jpg" alt="" className="w-5/12 h-auto" />

      <div className="container w-full">

        <div className="flex w-full">
          <p className="text-lg font-semibold">truck no.</p>
          <p className="text-lg font-semibold ms-auto">MH 40 AK 0047</p>
        </div>

        <div className="flex w-full">
          <p className="text-lg font-semibold">fuel capicity.</p>
          <p className="text-lg font-semibold ms-auto">20000 ltr</p>
        </div>

      </div>

      <Link href={'/'} className="text-md font-semibold text-red-500 ms-auto"> view all</Link>

    </div>

  )
}
