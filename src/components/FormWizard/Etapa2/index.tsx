import React from 'react';


import { useNavigate, Link } from 'react-router-dom';
import { Container, Content } from '../Etapa2/styled';
import { useForm } from '../../../contexts/Auth/FormContext';
import { ChangeEvent, useEffect } from 'react';
import { FormLeft } from '../../FormTheme';

export const Etapa2 = () => {

    const navigate = useNavigate();
    const { state, dispatch } = useForm();

    // useEffect(() => {
    //     if (state.unidade !== '' && state.categoria !== '' && state.turma !== '') {
    //         navigate('/matricula-online');
    //     } else {

    //     }
    // }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
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
                <form action="">
                    <div className='InfoMobile'>
                        <img className='logoMobile' src="../src/assets/setvolei.png" alt="" />
                        <h1>QUASE LÁ...</h1>
                        <p>Preencha os dados abaixo para realizar a sua matricula.</p>
                    </div>
                    <div className='Teste'>
                        <h1>
                            Preencha os dados abaixo.
                        </h1>
                        <p>Certifique-se de preencher corretamente.</p>

                    </div>
                    <input placeholder='DIGITE SEU NOME' type="text" />
                    <input placeholder='DIGITE SUA IDADE' type="text" />
                    <input placeholder='DIGITE SEU EMAIL' type="text" />
                    <label >ESCOLHA SUA FOTO</label>
                    <input type="file" id="fileInput" name="myfile"></input>

                    <div className='Buttons'>
                        <Link to="/matricula-online" className='backButton'>Voltar</Link>
                        <button onClick={handleSubmit}>Proximo</button>
                    </div>
                </form>

            </Content>
        </Container>
    );
};


