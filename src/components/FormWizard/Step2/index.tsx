import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import { Container, Content } from './styled';
import { FormActions, useForm } from '../../../contexts/Form/FormContext';
import { FormLeft } from '../../FormLeft';
import { useUnidades } from '../../../hooks/useUnidades';

export const Step2 = () => {
    const navigate = useNavigate();
    const { state, dispatch } = useForm();

    const { units } = useUnidades();
    console.log("Units", units)

    useEffect(() => {
        if (state.name === '') {
            navigate('/matricula-online');
        } else {
            dispatch({
                type: FormActions.setCurrentStep,
                payload: 2
            });
        }
    }, []);

    const handleUnidadeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {

        dispatch({ type: FormActions.setUnidade, payload: e.target.value });
    };

    const handleCategoriaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {

        dispatch({ type: FormActions.setCategoria, payload: e.target.value });
    };

    const handleSubmit = () => {
        if (state.unidade !== '' && state.categoria !== '' && state.turma !== '') {
            navigate('/matricula-online/step2/step3');
        } else {
            if (state.unidade === '') {
                alert('Selecione a unidade');
            }
            if (state.categoria === '') {
                alert('Selecione a categoria');
            }
        }
    };

    return (
        <Container>
            <Content>
                <FormLeft
                    title='QUASE LÁ...'
                    text='Você está quase finalizando
                 a sua matrícula.'
                    src='../src/assets/setvolei.png'
                />
                <form>
                    <div className='infoMobile'>
                        <img className='logoMobile' src="./src/assets/setvolei.png" alt="" />
                        <h1>SEJA BEM-VINDO!</h1>
                        <p>Selecione os campos abaixo para realizar a sua matricula.</p>
                    </div>
                    <div className='infoPc'>
                        <h1>
                            Preencha os dados abaixo.
                        </h1>
                        <p>Certifique-se de selecionar corretamente.</p>
                    </div>


                    <label>SELECIONE UMA UNIDADE</label>
                    <select value={state.unidade} onChange={handleUnidadeChange} >
                        <option>SELECIONE</option>

                        {units.map((item, key) => (
                            <option>{item.name}</option>
                        ))}

                    </select>
                    <label>SELECIONE UMA CATEGORIA</label>
                    <select value={state.categoria} onChange={handleCategoriaChange}>
                        <option value="">SELECIONE</option>
                        <option value="opcao1"> Juvenil</option>
                        <option value="opcao2"> Adulto</option>
                    </select>

                    <div className='Buttons'>
                        <Link to="/matricula-online" className='backButton'>Voltar</Link>
                        <button onClick={handleSubmit}>AVANÇAR</button>
                    </div>
                </form>
            </Content>
        </Container >

    );
};

