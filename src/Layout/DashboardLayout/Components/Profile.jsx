import React from 'react';
import useAuth from '../../../Hooks/useAuth';
import useRole from '../../../Hooks/useRole';

const Profile = () => {
    const {user} = useAuth();
    const { role, roleLoading } = useRole();
    return (
        <div>
            <h1 className='text-3xl text-center font-bold '>This is Profile  page</h1>
        </div>
    );
};

export default Profile;