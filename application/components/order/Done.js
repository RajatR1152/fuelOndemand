import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';

export default function Done({ formData }) {
    const [data, setData] = useState([]);

    useEffect(() => {
        create();
    }, [])

    function create() {
        axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/createorder`, { data: formData }).then(() => {
            toast.success('order created successfully');

        })
    }

    return (
        <div className="container w-full h-screen flex flex-col items-center justify-center">
            <img src="https://png.pngtree.com/png-vector/20230105/ourmid/pngtree-3d-green-check-mark-icon-png-image_6552255.png" alt="" className="w-3/12 h-auto" />
            <h1 className="text-3xl text-center font-semibold">Your order has been placed.</h1>
        </div>
    )
}
