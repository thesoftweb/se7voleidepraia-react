import { useContext, useState } from "react";
import { insertMaskInCpf } from "../../../hooks/mask";
import { Button } from "../../../components/Shared/Buttons";
import { Header } from "../../../components/Shared/Header";
import { Logo } from "../../../components/Shared/Logo";

import { AuthContext } from "../../../contexts/Auth/AuthContext";

export const PortalStep1 = () => {
  const auth = useContext(AuthContext);

  const [username, setUsername] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    if (!username) {
      setError("Digite o cpf");
    }

    const isLogged = true;

    if (!isLogged) {
      setError("Usuario ou senha invalidos");
      return;
    }

    console.log(isLogged);

    // navigate("/turma");
  };

  return (
    <div className="container">
      <Logo />
      <Header title="Se7Volei de Praia" subtitle="Acesso do Aluno" />
      <div className="form-wrapper">
        <p>{error}</p>
        <input
          type="text"
          value={insertMaskInCpf(username)}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Digite seu usário"
        />
      </div>
      <Button label="Entrar" onClick={handleLogin} />
    </div>
  );
};
