import { Route, Routes, useRoutes } from "react-router-dom";
import { Login } from "../pages/Login";

import { Alunos } from "../pages/Alunos";
import { Turma } from "../pages/Turma";
import { Step1 } from "../components/FormWizard/Step1";
import { Step2 } from "../components/FormWizard/Step2";
import { Step3 } from "../components/FormWizard/Step3";
import { Step4 } from "../components/FormWizard/Step4";

import { RequireAuth } from "../contexts/Auth/RequireAuth";

import { PortalStep1 } from "../pages/Portal/Step1";
import { PortalStep2 } from "../pages/Portal/Step2";
import { UploadFoto } from "../pages/Portal/UploadFoto";

export const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route
        path="/turma"
        element={
          <RequireAuth>
            <Turma />
          </RequireAuth>
        }
      />
      <Route
        path="/alunos"
        element={
          <RequireAuth>
            <Alunos />
          </RequireAuth>
        }
      />

      <Route path="/matricula-online" element={<Step1 />} />
      <Route path="/matricula-online/step2" element={<Step2 />} />
      <Route path="/matricula-online/step3" element={<Step3 />} />
      <Route path="/matricula-online/step4" element={<Step4 />} />
      <Route path="/portal/aluno" element={<PortalStep1 />} />
      <Route path="/portal/aluno/cobrancas" element={<PortalStep2 />} />
      <Route path="/portal/aluno/upload-foto" element={<UploadFoto />} />
    </Routes>
  );
};
