import Link from 'next/link'
import React from 'react'

export default function Tracking() {

    const data = {
        distance: 340,
        time: [
            {
                hr: 1,
                min: 20
            }
        ],
        fuel: 10,
        mil: 34
    }

    return (
        <div className="container w-fit h-full my-3 flex flex-col gap-3">

            <div className="container bg-white p-3 shadow-lg xl:p-5 rounded-3xl w-fit">

                <h1 className=" md:text-md xl:text-xl mb-2 font-semibold capitalize">distance : </h1>

                <div className="flex items-center gap-3">

                    <p className="text-xl xl:text-3xl font-semibold text-red-500">{data.distance}</p>
                    <p className="text-lg font-semibold">KM</p>
                    <p>/</p>
                    <p className="text-xl xl:text-3xl font-semibold text-red-500">{data.time[0].hr}</p>
                    <p className="text-lg font-semibold">hr</p>
                    <p className="text-xl xl:text-3xl font-semibold text-red-500">{data.time[0].min}</p>
                    <p className="text-lg font-semibold">min</p>

                </div>

            </div>

            <div className="container p-3 bg-white shadow-lg md:p-5 rounded-3xl w-full">

                <h1 className="md:text-md xl:text-xll mb-2 font-semibold capitalize">fuel efficiency : </h1>

                <div className="flex items-center gap-3">

                    <p className="text-xl xl:text-3xl font-semibold text-red-500">{data.mil}</p>
                    <p className="text-lg font-semibold">KM</p>
                    <p>/</p>
                    <p className="text-xl xl:text-3xl font-semibold text-red-500">1</p>
                    <p className="text-lg font-semibold">litre</p>

                </div>

                <div className="container mt-3 w-fit md:hidden xl:flex gap-6">
                    <Link href={'/'} className="hover:bg-red-500 bg-transparent border-2 border-red-500 text-red-500 px-3 p-2 rounded-2xl font-semibold hover:text-white">view all</Link>
                    <Link href={'/'} className="hover:bg-red-500 bg-transparent border-2 border-red-500 text-red-500 px-3 p-2 rounded-2xl font-semibold hover:text-white">optimize</Link>
                </div>

            </div>


        </div>
    )
}
