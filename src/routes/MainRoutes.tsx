import { Route, Routes, useRoutes } from 'react-router-dom';
import { Login } from '../pages/Login';

import { Alunos } from '../pages/Alunos';
import { Turma } from '../pages/Turma';

import { Step1 } from '../components/FormWizard/Step1';
import { Step2 } from '../components/FormWizard/Step2';
import { RequireAuth } from '../contexts/Auth/RequireAuth';


export const MainRoutes = () => {
    return useRoutes([
        { path: '/', element: <Login /> },

        { path: '/turma', element: <Turma /> },
        { path: '/alunos', element: <Alunos /> },

        { path: '/matricula-online', element: <Step1 /> },
        { path: '/matricula-online/step2', element: <Step2 /> },
    ]);
    // <Routes>
    //     <Route path='/' element={<Login />} />
    //     <Route path='/turma' element={<RequireAuth><Turma /></RequireAuth>} />
    //     <Route path='/alunos' element={<RequireAuth><Alunos /></RequireAuth>} />

    //     <Route path='/matricula-online' element={<Step1 />} />
    //     <Route path='/matricula-online/step2' element={<Step2 />} />
    // </Routes>


}







