'use client'

import { createContext, useState } from "react"

export const DataContext = createContext();

export default function DataProvider({ children }) {

    const [viewer, setViewer] = useState('user');
    const [email, setEmail] = useState('');
    const [userData, setUserData] = useState('');
    const [loading, setLoading] = useState(false);

    return (
        <DataContext.Provider value={{ viewer, setViewer, email, setEmail, userData, setUserData, loading, setLoading }}>
            {children}
        </DataContext.Provider>
    )
}
