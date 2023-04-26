import { useRoutes } from 'react-router-dom';
import { Login } from '../pages/Login';
import { Private } from '../pages/Private';
import { RequireAuth } from '../contexts/Auth/RequireAuth';
import { useContext } from 'react';
import { AuthContext } from '../contexts/Auth/AuthContext';

export const MainRoutes = () => {
    const auth = useContext(AuthContext);
    return useRoutes([
        { path: '/', element: <Login /> },
        { path: '/private', element: <Private /> },

    ]);
}