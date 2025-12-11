import React from 'react';
import Navbar from '../../Pages/Shered/Navbar/Navbar';
import Footer from '../../Pages/Shered/Footer/Footer';
import { Outlet } from 'react-router';

const RootLayout = () => {
    return (
        <div className='flex flex-col bg-[#F6FAFF]'>
          <Navbar></Navbar>
            <div className='flex-1  min-h-screen'><Outlet></Outlet></div>
            <Footer></Footer>
        </div>
    );
};

export default RootLayout;