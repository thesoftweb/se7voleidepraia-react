import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/Auth/AuthContext";

import { insertMaskInCpf } from "../../hooks/mask";
import { Logo } from "../../components/Shared/Logo";
import { Button } from "../../components/Shared/Buttons";
import { Header } from "../../components/Shared/Header";

import "./styles.css";

export const Login = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    if (!username || !password) {
      setError("Digite usuario e senha");
    }
    const isLogged = await auth.signin(username, password);

    if (!isLogged) {
      setError("Usuario ou senha invalidos");
      return;
    }

    console.log(isLogged);

    navigate("/turma");
  };

  return (
    <div className="container">
      <Logo />
      <Header
        title="Se7Volei de Praia"
        subtitle="Informe seus dados de acesso"
      />
      <div className="form-wrapper">
        <p>{error}</p>
        <input
          type="text"
          value={insertMaskInCpf(username)}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Digite seu usário"
        />

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Digite sua senha"
        />
      </div>
      <Button label="Login" onClick={handleLogin} />
    </div>
  );
};
