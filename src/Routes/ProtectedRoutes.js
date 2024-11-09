import React, { useEffect } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import UserServices from '../Services/UserService';

const userService = new UserServices();

const ProtectedRoutes = ({ children, requireAdmin = false }) => {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuth = () => {
            const isAuthenticated = userService.usuarioAutenticado();

            if (!isAuthenticated) {
                sessionStorage.setItem('lastAttemptedRoute', location.pathname);
                navigate('/login', { replace: true });
                return;
            }

            if (requireAdmin && !userService.isAdmin()) {
                navigate('/home', { replace: true });
                return;
            }
        };

        checkAuth();

        const intervalId = setInterval(checkAuth, 60000);

        return () => {
            clearInterval(intervalId);
        };
    }, [location, navigate, requireAdmin]);

    const isAuthenticated = userService.usuarioAutenticado();

    if (!isAuthenticated) {
        return <Navigate to="/login" replace state={{ from: location }} />;
    }

    if (requireAdmin && !userService.isAdmin()) {
        return <Navigate to="/home" replace />;
    }

    return children;
};

export default ProtectedRoutes;
