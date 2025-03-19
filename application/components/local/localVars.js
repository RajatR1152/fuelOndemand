'use client'

import axios from "axios";

export const localUser = () => {
    let e = localStorage.getItem('email');
    let adm = localStorage.getItem('iad');

    return {
        email: e,
        isAdmin: adm
    }
}

export const getUser = async () => {
    try {
        const e = localStorage.getItem('email');
        if (!e) return null;

        const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/getUser`, { email: e });
        return res.data;
    } catch (error) {
        console.error('Error fetching user data:', error);
        return null;
    }
};

export const petrolPrice = 104.11;
export const dieselPrice = 90.67;
export const cngPrice = 89.90;