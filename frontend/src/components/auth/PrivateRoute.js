import React from 'react';
import { UseSelector, useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
    const { currentUser, isAuthenticated } = useSelector((store) => store.user);
    return (
        (isAuthenticated && currentUser) ? <Outlet /> : <Navigate to={'signup'} />
    )
}

export default PrivateRoute