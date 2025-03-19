'use client'
import React from 'react'

export default function Recent() {
    return (
        <div className="containe w-full mt-auto h-fit p-4 hidden xl:flex flex-col rounded-3xl bg-red-500">

            <h1 className="text-xl font-semibold capitalize text-white">recent trip</h1>

            <div className="container w-full my-1 flex gap-5">
                <div className="text-md font-semibold p-2 text-center capitalize w-5/12 hover:bg-white hover:text-red-500 rounded-3xl text-white">duration</div>
            </div>
            <div className="container w-full my-1 flex gap-5">
                <div className="text-md font-semibold p-2 text-center capitalize w-5/12 hover:bg-white hover:text-red-500 rounded-3xl text-white">stops</div>
            </div>
            <div className="container w-full my-1 flex gap-5">
                <div className="text-md font-semibold p-2 text-center capitalize w-5/12 hover:bg-white hover:text-red-500 rounded-3xl text-white">speed</div>
                <p className="text-2xl text-white">234kms</p>
            </div>

        </div>
    )
}
