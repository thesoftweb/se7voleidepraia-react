import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';


import { FormActions, useForm } from '../../../contexts/Form/FormContext';
import { FormLeft } from '../../FormLeft';
import { Container, Content } from './styled';

export const Step3 = () => {
    const navigate = useNavigate();
    const { state, dispatch } = useForm();

    // useEffect(() => {
    //     if (state.name === '') {
    //         navigate('/');
    //     } else {
    //         dispatch({
    //             type: FormActions.setCurrentStep,
    //             payload: 3
    //         });
    //     }
    // }, []);

    const handleSubmit = () => {
        navigate('/matricula-online/step3')

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
                        <h1>Selecione uma turma</h1>

                    </div>


                    <div className='turmaMatricula'>
                        <div className='turmaInfo'>
                            <label htmlFor="">Turma 1</label>

                        </div>
                        <div className='turmaInfo'>
                            <label htmlFor="">Turma 2</label>

                        </div>
                        <div className='turmaInfo'>
                            <label htmlFor="">Turma 3</label>

                        </div>


                    </div>








                    <div className='Buttons'>
                        <Link to="/matricula-online" className='backButton'>Voltar</Link>
                        <button onClick={handleSubmit}>AVANÇAR</button>
                    </div>
                </form>
            </Content>
        </Container >

    );
};