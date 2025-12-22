import Lottie from 'lottie-react';
import React from 'react';
import loading from "../../public/Book loading.json";
const LoadingDashboard = () => {
    return (
         <div className='flex justify-center items-center min-h-screen gap-15 sm:gap-25 '>
           <div className='w-[250px]'>
             <Lottie animationData={loading} loop={true} />
           </div>
        </div>
    );
};

export default LoadingDashboard;