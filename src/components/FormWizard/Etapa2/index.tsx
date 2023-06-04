import React from 'react';


import { useNavigate, Link } from 'react-router-dom';
import { Container, Content, Form, Label, Input } from '../Etapa2/styled';
import { useForm } from '../../../contexts/Auth/FormContext';
import { ChangeEvent, useEffect } from 'react';


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
                <div className='logo'>
                    <img src="../src/assets/setvolei.png" alt="" />
                    <h1>QUASE LÁ...</h1>
                    <p>Preencha os campos abaixo para realizar a segunda etapa da sua matricula.</p>
                </div>
                <form action="">
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


