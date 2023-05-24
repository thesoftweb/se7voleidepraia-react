import { useRoutes } from 'react-router-dom';
import { Login } from '../pages/Login';

import { Alunos } from '../pages/Alunos';
import { Turma } from '../pages/Turma';
import { Matricula } from '../pages/Matricula';
import { Etapa1 } from '../components/FormWizard/Etapa1';
import { Etapa2 } from '../components/FormWizard/Etapa2';




export const MainRoutes = () => {
    return useRoutes([
        { path: '/', element: <Login /> },
        { path: '/turma', element: <Turma /> },
        { path: '/alunos', element: <Alunos /> },

        { path: '/matricula-online', element: <Matricula /> },

        { path: '/matricula-online/step1', element: <Etapa1 /> },
        { path: '/matricula-online/step1/step2', element: <Etapa2 /> },
        { path: '/matricula-online/step1/step2/step3', element: <Etapa1 /> }
    ]);
}