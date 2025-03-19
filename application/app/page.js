'use client'
import SideBar from '@/components/bars/SideBar'
import Dashboard from '@/components/Homepage.js/Dashboard'
import React, { useEffect, useState } from 'react'
import { messaging } from './shared/firebaseConfig'
import { getToken } from 'firebase/messaging'

export default function Page() {

  const [showSideBar, setShowSideBar] = useState(false);

  function requestPermission() {
    console.log('Requesting permission...');
    Notification.requestPermission().then((permission) => {
      if (permission === 'granted') {
        console.log('Notification permission granted.');

        getToken(messaging, { vapidKey: 'BBFGMfAMyyJzhi5HY5A57GMIvaYrokt1KDxVnRvaGbU5w6lXFikK5b6o3Rykdeu1s2ovRBkYhlakx9noqylqh-I' }).then((currentToken) => {
          if (currentToken) {
            console.log("token : ", currentToken);
          } else {

            console.log('No registration token available. Request permission to generate one.');
          }
        }).catch((err) => {
          console.log('An error occurred while retrieving token. ', err);
        });

      }
    })
  }

  useEffect(() => {
    requestPermission();
  }, [])

  return (
    <div className="flex w-full h-screen">

      <div className="lg:w-3/12 xl:w-2/12 hidden lg:block">
        <SideBar />
      </div>

      {
        showSideBar && <div className="fixed w-10/12 lg:hidden z-50">
          <SideBar show={setShowSideBar} setShow={setShowSideBar} />
        </div>
      }

      <div className="w-full md:9/12 xl:w-10/12">
        <Dashboard setShow={setShowSideBar} />
      </div>

    </div>
  )
}
