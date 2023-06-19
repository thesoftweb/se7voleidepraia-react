import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/Auth/AuthContext";

import { Button, Container, Formulario, Img, Input, Logo, } from "./styled";

export const Login = () => {
    const auth = useContext(AuthContext);
    const navigate = useNavigate();

    const [cpf, setCpf] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async () => {
        // if (!cpf || !password) {
        //     setError('Digite cpf e senha')
        // }
        // const isLogged = await auth.signin(cpf, password);

        // if (!isLogged) {
        //     setError('Usuario ou senha invalidos')
        //     return;
        // }
        navigate('/turma');
    }

    return (
        <Container>
            <Logo>
                <Img src="./src/assets/setvolei.png" alt="" />
            </Logo>
            <Formulario>
                <p>{error}</p>
                <Input
                    type="text"
                    value={cpf}
                    onChange={(e) => setCpf(e.target.value)}
                    placeholder="Digite seu CPF" />

                <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Digite sua senha"
                />
                <Button onClick={handleLogin}>Login</Button>
            </Formulario>
        </Container>
    );
}