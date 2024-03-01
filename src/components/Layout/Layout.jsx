import React, { useContext, useEffect } from 'react'
import stayle from './Layout.module.css'
import Navbar from '../Navbar/Navbar'
import { Outlet, } from 'react-router'
import Footer from '../Footer/Footer'
import { UserContext } from '../Context/UserContext'

export default function Layout() {

  let { setUserToken } = useContext(UserContext);

  useEffect(() => {
    if (localStorage.getItem('userToken') !== null) {
      setUserToken(localStorage.getItem('userToken'))
    }
  }, []);

  return <>
    <Navbar />
    <div className='container my-5 py-3'>
      <Outlet />
    </div>
    <Footer />
  </>
}
