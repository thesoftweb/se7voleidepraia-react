import React from 'react';
import { Container, Content, Form, Label, Input } from '../Etapa2/styled';


type Step2Props = {
    onNext: () => void;
    onPrev: () => void;
};

export const Etapa2 = () => {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

    };

    return (
        <Container>
            <Content>
                <Form onSubmit={handleSubmit}>
                    <Label>Nome</Label>
                    <Input type="text" />
                    <Label>Email</Label>
                    <Input type="text" />
                    <Label>Idade</Label>
                    <Input type="text" />
                    <Label>Foto</Label>
                    <Input type="file" />
                </Form>
            </Content>
        </Container>
    );
};


