import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import { Container, Content } from './styled';
import { FormActions, useForm } from '../../../contexts/Form/FormContext';
import { FormLeft } from '../../FormLeft';
import { useUnidades } from '../../../hooks/useUnidades';

import logo from "../../../assets/setvolei.png";
import { Turmas } from '../../../types/Turmas';

export const Step2 = () => {
    const navigate = useNavigate();
    const { state, dispatch } = useForm();

    //dados pra consulta
    const [selUnit, setSelUnit] = useState('');
    const [selCategory,setSelCategory] = useState('');
    const [turmas,setTurmas] = useState<Turmas[]>([]);;

    const { units } = useUnidades();
    // console.log("Units", units)

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

        setSelUnit(e.target.value);
        //dispatch({ type: FormActions.setUnidade, payload: e.target.value });
    };

    const handleCategoriaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {

        setSelCategory(e.target.value)
        //dispatch({ type: FormActions.setCategoria, payload: e.target.value });
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

    const fetchTurmas = async () => {

        console.log(selUnit,selCategory);

        let url = `https://app.se7voleidepraia.com.br/api/courses?unit_id=${selUnit}&category=${selCategory}`;
        
        console.log('URL pra consultar turmas dinamica: '+url);
        
        const request = await fetch(url);

        const {data} = await request.json();

        console.log(data);

        setTurmas(data);
    }



    return (
        <Container>
            <Content>
                <FormLeft
                    title='QUASE LÁ...'
                    text='Você está quase finalizando
                 a sua matrícula.'
                    src={logo}
                />
                <form>
                    <div className='infoMobile'>
                        <img className='logoMobile' src={logo} alt="" />
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
                    <select value={selUnit} onChange={handleUnidadeChange} >
                        <option>SELECIONE</option>

                        {units.map((item, key) => (
                            <option value={item.id} key={item.id}>{item.name}</option>
                        ))}

                    </select>
                    <label>SELECIONE UMA CATEGORIA</label>
                    <select value={selCategory} onChange={handleCategoriaChange}>
                        <option value="">SELECIONE</option>
                        <option value="kids">Crianças</option>
                        <option value="teens">Adolecentes</option>
                        <option value="adult">Adultos</option>
                        <option value="competitive">Competitivo</option>
                    </select>
                            
                    <div className='Buttons' onClick={fetchTurmas}>Ver turmas</div>

                    <div className='Buttons'>

                        <Link to="/matricula-online" className='backButton'>Voltar</Link>
                        <button onClick={handleSubmit}>AVANÇAR</button>
                    </div>


                    <ul>
                        { 
                            turmas.map((item,key) => (
                                <li key={item.id}>{item.name} | {item.category} | {item.unit} </li>
                            ))
                        }
                    </ul>
                </form>
            </Content>
        </Container >

    );
};

