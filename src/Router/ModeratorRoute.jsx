import React from 'react';
import useAuth from '../Hooks/useAuth';
import useRole from '../Hooks/useRole';

const ModeratorRoute = ({ children }) => {
     const { loading } = useAuth();
    const { role, roleLoading } = useRole()

    if (loading || roleLoading) {
        return <p>Loading....</p>;
    }

    if (role !== 'Moderator') {
        return <p>Forbiden Access</p>
    }

    return children;
};

export default ModeratorRoute;