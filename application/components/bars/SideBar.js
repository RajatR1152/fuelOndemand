'use client'
import React, { useContext, useEffect, useState } from 'react';
import Navs from './Navs';
import Company from './Company';
import User from './User';
import Recent from './Recent';
import { RxCross2, RxExit } from 'react-icons/rx';
import { DataContext } from '@/context/DataContext';
import { getUser } from '../local/localVars';
import { useRouter } from 'next/navigation';

export default function SideBar({ show, setShow }) {

    const router = useRouter();

    useEffect(() => {
        let e = localStorage.getItem('email');
        if (!e) {
            router.push('/auth/sign-in');
        }
    }, [])

    function logOut() {
        localStorage.clear();
        router.push('/auth/sign-in');
    }

    const { email, setEmail, viewer, userData, setViewer, setUserData } = useContext(DataContext);

    useEffect(() => {
        const e = localStorage.getItem('email');
        if (e) setEmail(e);

        const ad = localStorage.getItem('iad');
        setIad(ad);

    }, [setEmail]);

    useEffect(() => {
        if (email == 'admin@gmail.com') {
            setViewer('admin');
        }
        else{
            setViewer('user');
        }
    }, [email])

    function setIad(i) {
        if (i) {
            setViewer('admin');
        }
        else {
            setViewer('user');
        }
    }

    useEffect(() => {
        const fetchUser = async () => {
            let d = await getUser();
            setUserData(d);
        };
        fetchUser();
    }, [email]);

    return (
        <div className={`fixed md:relative z-50 bg-white w-full flex flex-col gap-5 md:gap-2 xl:gap-3 h-screen lg:h-full p-5 transition-transform ${show ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
            <RxCross2 size={20} className='ms-auto cursor-pointer lg:hidden' onClick={() => setShow(false)} />
            <User user={userData?.username} />
            {viewer == 'admin' ? <Company /> : null}
            <Navs />

            {viewer == 'admin' ? <Recent /> : null}

            <button onClick={() => { logOut() }} className="w-fit text-red-500 mx-5 font-semibold flex gap-3 mt-auto mb-5"><RxExit size={22} />log out </button>

        </div>
    );
}
