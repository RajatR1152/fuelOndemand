import React from 'react'

export default function Loader() {
    return (
        <div className="flex mx-auto w-9/12 justify-center items-center h-screen">
            <div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
    )
}
