import { useRoutes } from 'react-router-dom';
import { Login } from '../pages/Login';

import { Alunos } from '../pages/Alunos';
import { Turma } from '../pages/Turma';
import { Matricula } from '../pages/Matricula';



export const MainRoutes = () => {
    return useRoutes([
        { path: '/', element: <Login /> },
        { path: '/turma', element: <Turma /> },
        { path: '/alunos', element: <Alunos /> },
        { path: '/matricula-online', element: <Matricula /> },
    ]);
}