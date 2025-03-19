'use client'
import Loader from '@/components/loaders/Loader';
import { DataContext } from '@/context/DataContext';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useContext, useEffect, useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { toast } from 'react-toastify';

export default function SignupPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [user, setUser] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const router = useRouter();
    const { loading, setLoading } = useContext(DataContext);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 2300);
    }, [submit])

    if (loading) return <Loader />

    function handleChange(e) {
        setUser({ ...user, [e.target.name]: e.target.value });
    }

    async function submit(e) {
        e.preventDefault();
        setLoading(true);
        if (!user.username || !user.email || !user.password || !user.confirmPassword) {
            toast.error("All fields are required!");
            return;
        }

        if (user.password !== user.confirmPassword) {
            axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/login`, user)
            return;
        }

        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/signup`, {
                username: user.username,
                email: user.email,
                password: user.password,
                isAdmin: false
            });

            if (response.data.code == 200) {
                toast.success(response.data.message);
                setUser({ username: '', email: '', password: '', confirmPassword: '' });
                router.push('/auth/sign-in')
            } else {
                toast.error(response.data.messge);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "An error occurred during signup.");
        }
    }

    return (
        <div className="w-full h-screen flex p-2 items-center justify-center bg-gray-100">
            <form onSubmit={submit} className="w-full md:w-4/12 bg-white rounded-3xl p-5 flex flex-col gap-5 shadow-lg">
                <h1 className="text-center text-2xl font-semibold">Sign Up</h1>

                <input type="text" name="username" value={user.username} onChange={handleChange} className="w-full p-3 bg-gray-100 focus:outline-none rounded-lg" placeholder="Username..." required />

                <input type="email" name="email" value={user.email} onChange={handleChange} className="w-full p-3 bg-gray-100 focus:outline-none rounded-lg" placeholder="Email..." required />

                <div className="w-full bg-gray-100 rounded-lg flex items-center">
                    <input type={showPassword ? "text" : "password"} name="password" value={user.password} onChange={handleChange} className="w-full p-3 bg-gray-100 focus:outline-none rounded-lg" placeholder="Password..." required />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="p-3 bg-transparent focus:outline-none">
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                </div>

                <input type="password" name="confirmPassword" value={user.confirmPassword} onChange={handleChange} className="w-full p-3 bg-gray-100 focus:outline-none rounded-lg" placeholder="Confirm Password..." required />

                <div className="w-full flex gap-2 items-center">
                    <input type="checkbox" name="tc" id="tc" />
                    <label htmlFor="tc">Remember me</label>
                </div>

                <button type="submit" className="w-full p-3 text-lg font-semibold bg-red-500 text-white rounded-lg hover:bg-red-600 capitalize">Sign Up</button>

                <div className="flex justify-center gap-2">
                    <p className="text-md font-semibold">Already have an account?</p>
                    <Link onClick={()=>{setLoading(true)}} href="/auth/sign-in" className="text-red-500 font-semibold">Sign In</Link>
                </div>
            </form>
        </div>
    );
}
