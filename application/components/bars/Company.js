'use client'
import React from 'react'

export default function Company() {
    return (
        <div className="container w-full flex bg-white gap-4 p-2 rounded-2xl">
            <img src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="" className="w-10 h-10 rounded-full" />
            <div className="container w-full gap-0 flex flex-col justify-center">
                <h1 className="text-sm font-semibold text-gray-500 capitalize">company</h1>
                <h1 className="text-[15px] font-bold text-black capitalize">RR pvt. ltd.</h1>
            </div>
        </div>
    )
}
