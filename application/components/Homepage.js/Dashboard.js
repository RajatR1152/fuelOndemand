'use client'
import React, { useContext, useEffect } from 'react'
import AdminView from './Dashboard/view/AdminView'
import { DataContext } from '@/context/DataContext'
import UserView from './Dashboard/view/UserView';
import Loader from '../loaders/Loader';


export default function Dashboard({ setShow }) {

    const { viewer, setViewer, loading, setLoading } = useContext(DataContext);


    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 2300);
    }, [])

    if (loading) return <Loader />

    return (

        <>
            {
                viewer == "admin" ?
                    <AdminView setShow={setShow} />
                    :
                    <UserView setShow={setShow} />
            }
        </>

    )
}
