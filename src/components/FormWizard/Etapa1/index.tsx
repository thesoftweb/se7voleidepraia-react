import React from 'react';
import { Link } from "react-router-dom";
import { Container, Form, Content, Label, Select, Option, Button } from './styled';


type Step1Props = {

};

export const Etapa1 = () => {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
    };

    return (
        <Container>
            <Content>
                <Form>
                    <Label>Unidade</Label>
                    <Select >
                        <Option> Cabo Branco</Option>
                        <Option>Bessa</Option>
                    </Select>
                    <Label>Categoria</Label>
                    <Select>
                        <Option> Juvenil</Option>
                        <Option>Adulto</Option>
                    </Select>
                    <Label>Turma</Label>
                    <Select>
                        <Option> Manhã</Option>
                        <Option>Tarde</Option>
                        <Option> Noite</Option>
                    </Select>
                    <Link to={`/matricula-online/step1/step2`} >
                        <Button>Selecionar</Button>
                    </Link>
                </Form>
            </Content>
        </Container>
    );
};

