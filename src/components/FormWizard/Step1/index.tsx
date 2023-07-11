import { useNavigate, Link } from 'react-router-dom';
import { Container, Content } from './styled';
import { FormActions, useForm } from '../../../contexts/Form/FormContext';
import { ChangeEvent, useEffect } from 'react';
import { FormLeft } from '../../FormLeft';
import { insertMaskInPhone } from '../../../hooks/mask';
import logo from "../../../assets/setvolei.png";

export const Step1 = () => {
    const navigate = useNavigate();
    const { state, dispatch } = useForm();

    useEffect(() => {
        dispatch({
            type: FormActions.setCurrentStep,
            payload: 1
        });
    }, []);

    const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch({ type: FormActions.setName, payload: e.target.value });
    }

    const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch({ type: FormActions.setEmail, payload: e.target.value });
    }

    const handleIdadeChange = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch({ type: FormActions.setIdade, payload: e.target.value });
    }

    const handleTelefoneChange = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch({ type: FormActions.setTelefone, payload: e.target.value });
    }

    const handleSubmit = () => {
        if (state.name !== '' && state.email !== '' && state.idade !== 0 && state.telefone) {
            navigate('/matricula-online/step2');
        } else {
            if (state.name === '') {
                alert('PREENCHA SEU NOME');
            }
            if (state.email === '') {
                alert('PREENCHA SEU EMAIL');
            }
            if (state.idade === 0) {
                alert('PREENCHA SUA DATA DE NASCIMENTO');
            }
            if (state.telefone === '') {
                alert('SELECIONE SEU TELEFONE');
            }
        }
    };

    return (
        <Container>
            <Content>
                <FormLeft
                    title='SEJA BEM-VINDO!'
                    text='Selecione os campos ao lado para realizar a sua matricula.'
                    src={logo}
                />
                <form action="">
                    <div className='InfoMobile'>
                        <img className='logoMobile' src={logo} alt="" />
                        <h1>SEJA BEM-VINDO!</h1>
                        <p>Selecione os campos ao lado para realizar a sua matricula.</p>
                    </div>
                    <div className='Teste'>
                        <h1>
                            Preencha os dados abaixo.
                        </h1>
                        <p>Certifique-se de preencher corretamente.</p>
                    </div>
                    <input placeholder='DIGITE SEU NOME' type="text" value={state.name} onChange={handleNameChange} />
                    <input placeholder='DIGITE SEU EMAIL' type="email" value={state.email} onChange={handleEmailChange} />
                    <input placeholder='DIGITE SUA IDADE' type="number" value={state.idade} onChange={handleIdadeChange} />
                    <input placeholder='DIGITE SEU TELEFONE' type="tel" value={insertMaskInPhone(state.telefone)} onChange={handleTelefoneChange} />

                    <div className='Buttons'>
                        <button onClick={handleSubmit}>AVANÇAR</button>
                    </div>
                </form>

            </Content>
        </Container>
    );
};


