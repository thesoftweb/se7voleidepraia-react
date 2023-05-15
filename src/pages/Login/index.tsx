import { ChangeEvent, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/Auth/AuthContext";


import { Button, Container, Formulario, Img, Input, Logo, } from "./styled";

export const Login = () => {
    const auth = useContext(AuthContext);
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmailInput = (event: ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    }

    const handlePasswordInput = (event: ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    }

    const handleLogin = async () => {
        if (email && password) {
            const isLogged = await auth.signin(email, password);
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
                    value={email}
                    onChange={handleEmailInput}
                    placeholder="Digite seu CPF" />

                <Input
                    type="password"
                    value={password}
                    onChange={handlePasswordInput}
                    placeholder="Digite sua senha"
                />
                <Button onClick={handleLogin}>Login</Button>

            </Formulario>
        </Container>
    );
}