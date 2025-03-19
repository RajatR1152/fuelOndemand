'use client'
import Loader from '@/components/loaders/Loader';
import { DataContext } from '@/context/DataContext';
import axios from 'axios';
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import React, { useContext, useEffect, useState } from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { toast } from 'react-toastify';

export default function page() {

    const [type, setType] = useState('password');
    const [user, setUser] = useState({
        email: '',
        password: ''
    })
    const { loading, setLoading ,setViewer} = useContext(DataContext);

    const router = useRouter();

    let n;
    let v;

    function handle(e) {
        n = e.target.name;
        v = e.target.value;

        setUser({ ...user, [n]: v });
    }

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 2300);
    }, [submit])

    if (loading) return <Loader />

    function submit() {
        setLoading(true);
        axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/login`, user).then((res) => {
            if (res.data.code == 200) {
                toast.success(res.data.message);
                localStorage.setItem('email', res.data.email);
                localStorage.setItem('iad', res.data.email == 'admin@gmail.com' ? true : false);
                router.push('/');
            }
            else {
                toast.error(res.data.message);
            }
        })
    }

    return (
        <div className="container w-full h-screen flex items-center p-2 justify-center">

            <form onSubmit={(e) => { e.preventDefault() }} className=" w-full md:w-4/12 bg-white rounded-3xl p-5 flex flex-col gap-5">

                <h1 className="text-center text-2xl font-semibold">Sign In</h1>

                <input type="email" name='email' value={user?.email} onChange={handle} className="w-full p-3 bg-slate-100 focus:outline-none rounded-lg" placeholder='email...' required />

                <div className="cotnainer w-full bg-slate-100 rounded-lg flex">

                    <input type={type == "password" ? "password" : "text"} name='password' value={user?.password} onChange={handle} className="w-10/12 p-3 bg-slate-100 focus:outline-none rounded-lg" placeholder='password...' required />

                    {
                        type == 'password' ?
                            <button onClick={() => { setType('text') }} className="px-5 bg-transparent outnline-none w-fit ms-auto"> <FaEye /> </button>
                            : <button onClick={() => { setType('password') }} className="px-5 bg-transparent outnline-none w-fit ms-auto"> <FaEyeSlash /> </button>
                    }

                </div>

                <div className="conatiner w-full flex gap-2 items-center">
                    <input type="radio" name="tc" id="tc" />
                    <p>remember me</p>
                </div>

                <button onClick={() => { submit() }} className="w-full p-3 text-lg font-semibold bg-red-500 text-white rounded-lg hover:bg-red-600 capitalize">sign in</button>

                <div className="container flex w-fit mx-auto gap-4">
                    <p className="text-md font-semibold">don't have account ? </p>
                    <Link onClick={() => { setLoading(true) }} href={'/auth/sign-up'} className='text-red-500 font-semibold'>create account</Link>
                </div>

            </form>

        </div>

    )
}
