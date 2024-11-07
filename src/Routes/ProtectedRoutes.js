import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import UserServices from '../Services/UserService';

const userService = new UserServices();

const ProtectedRoutes = ({ children, requireAdmin = false }) => {
    const location = useLocation();
    const usuarioAutenticado = userService.usuarioAutenticado();

    if (!usuarioAutenticado) {
        return <Navigate to="/login" replace state={{ from: location }} />;
    }

    if (requireAdmin && !userService.isAdmin()) {
        return <Navigate to="/home" replace />;
    }

    return children;
};

export default ProtectedRoutes;
