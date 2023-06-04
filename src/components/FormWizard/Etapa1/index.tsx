import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Container, Content } from './styled';
import { FormActions, useForm } from '../../../contexts/Auth/FormContext';

export const Etapa1 = () => {
    const navigate = useNavigate();
    const { state, dispatch } = useForm();


    const handleUnidadeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const unidade = (event.target.value);
        dispatch({ type: 'SET_UNIDADE', payload: unidade });
    };

    const handleCategoriaChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const categoria = (event.target.value);
        dispatch({ type: 'SET_CATEGORIA', payload: categoria });
    };

    const handleTurmaChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const turma = (event.target.value);
        dispatch({ type: 'SET_TURMA', payload: turma });
    };

    const handleSubmit = () => {
        if (state.unidade !== '' && state.categoria !== '' && state.turma !== '') {
            navigate('/matricula-online/step2');
        } else {
            if (state.unidade === '') {
                alert('Selecione a unidade');
            }
            if (state.categoria === '') {
                alert('Selecione a categoria');
            }
            if (state.turma === '') {
                alert('Selecione a turma');
            }
        }
    };

    return (
        <Container>
            <Content>
                <div className='logo'>
                    <img src="../src/assets/setvolei.png" alt="" />
                    <h1>SEJA BEM-VINDO!</h1>
                    <p>Selecione os campos abaixo para realizar a sua matricula.</p>
                </div>
                <form >
                    <label>UNIDADE</label>
                    <select value={state.unidade} onChange={handleUnidadeChange} >
                        <option value="">SELECIONE</option>
                        <option value="opcao1">Opção 1</option>
                        <option value="opcao2">Opção 2</option>
                        <option value="opcao3">Opção 3</option>
                    </select>
                    <label>CATEGORIA</label>
                    <select value={state.categoria} onChange={handleCategoriaChange}>
                        <option value="">SELECIONE</option>
                        <option value="opcao1"> Juvenil</option>
                        <option value="opcao2"> Adulto</option>
                    </select>
                    <label>TURMA</label>
                    <select value={state.turma} onChange={handleTurmaChange}>
                        <option value="">SELECIONE</option>
                        <option value="opcao1"> manha</option>
                        <option value="opcao2"> tarde</option>
                    </select>
                    <button onClick={handleSubmit}>PRÓXIMO</button>
                </form>
            </Content>
        </Container >

    );
};

