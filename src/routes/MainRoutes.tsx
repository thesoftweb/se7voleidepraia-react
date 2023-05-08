import { useRoutes } from 'react-router-dom';
import { Login } from '../pages/Login';

import { Alunos } from '../pages/Alunos';
import { Turma } from '../pages/Turma';


export const MainRoutes = () => {
    return useRoutes([
        { path: '/', element: <Login /> },
        { path: '/turma', element: <Turma /> },
        { path: '/alunos', element: <Alunos /> },
    ]);
}