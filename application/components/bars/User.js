'use client'
import React from 'react'

export default function User({user}) {


    return (
        <div className="container w-full my-5 flex gap-4">
            <img src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="" className="w-10 h-10 rounded-full" />
            <div className="container w-full gap-0 flex flex-col justify-center">
                <h1 className="text-[14px] font-semibold text-gray-500 capitalize">welcome back</h1>
                <h1 className="text-[15px] font-semibold text-black capitalize">{user}</h1>
            </div>
        </div>
    )
}
