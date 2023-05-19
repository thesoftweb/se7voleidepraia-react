import { ChangeEvent, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/Auth/AuthContext";


import { Button, Container, Formulario, Img, Input, Logo, } from "./styled";

export const Login = () => {
    const auth = useContext(AuthContext);
    const navigate = useNavigate();

    const [cpf, setCpf] = useState('');
    const [password, setPassword] = useState('');


    const handleLogin = async (e) => {
        e.preventDefault();

        if (cpf && password) {
            const isLogged = await auth.signin(cpf, password);

            console.log(isLogged);
            if (isLogged) {
                navigate('/turma');
            } else {
                alert("Não deu certo.");
            }
        }
    }

    return (
        <Container>
            <Logo>
                <Img src="./src/assets/setvolei.png" alt="" />
            </Logo>
            <Formulario>
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