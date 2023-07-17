import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";

import { FormActions, useForm } from "../../../contexts/Form/FormContext";
import { ChangeEvent, useEffect } from "react";

import logo from "../../../assets/setvolei.png";
import { Header } from "../../Shared/Header";
import { Logo } from "../../Shared/Logo";
import { Button } from "../../Shared/Buttons";
import { format } from 'date-fns';

import InputMask from 'react-input-mask';

import "./styles.css";

export const Step1 = () => {
    const navigate = useNavigate();
    const { state, dispatch } = useForm();

    // const [MenorIdade, setMenorIdade] = useState(state.isMenor);
    const [isMenor, setIsMenor] = useState(state.isMenor);

    useEffect(() => {
        dispatch({
            type: FormActions.setCurrentStep,
            payload: 1,
        });

        setIsMenor(state.isMenor);
    }, [isMenor]);

    const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch({ type: FormActions.setName, payload: e.target.value });
    };

    const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch({ type: FormActions.setEmail, payload: e.target.value });
    };

    const formatDate = (date: Date): string => {
        const day = date.getDate().toString().padStart(2, "0");
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const year = date.getFullYear().toString();

        return `${day}/${month}/${year}`;
    };

    const handleIdadeChange = (e: ChangeEvent<HTMLInputElement>) => {

        dispatch({ type: FormActions.setBirth_date, payload: e.target.value });

        const currentDate = new Date();
        const birthDate = new Date(e.target.value);

        const age = currentDate.getFullYear() - birthDate.getFullYear();
        console.log("idade" + age);

        const formattedBirthDate = format(birthDate, 'dd/MM/yyyy');

        console.log("data de nascimento: " + formattedBirthDate);

        if (age >= 18) {
            // setIsMenor(false);
            dispatch({ type: FormActions.setIsMenor, payload: false });
        } else {
            setIsMenor(true);
            // console.log(isMenor);
            dispatch({ type: FormActions.setIsMenor, payload: true });
        }

    };

    const handleCpfChange = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch({ type: FormActions.setCpf, payload: e.target.value });
    };

    // Responsavel Financeiro
    const handleRespNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch({ type: FormActions.setResp_Name, payload: e.target.value });
    };
    const handleRespEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch({ type: FormActions.setResp_Email, payload: e.target.value });
    };

    const handleTelefoneChange = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch({ type: FormActions.setPhone, payload: e.target.value });
    };

    const handleRespCpfChange = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch({ type: FormActions.setResp_cpf, payload: e.target.value });
    };

    const handleSubmit = () => {
        if (state.name !== "" && state.email !== "" && state.birth_date !== "") {
            navigate("/matricula-online/step2");
        } else {
            if (state.name === "") {
                alert("PREENCHA SEU NOME");
            }
            if (state.email === "") {
                alert("PREENCHA SEU EMAIL");
            }
            if (state.birth_date === "") {
                alert("PREENCHA SUA DATA DE NASCIMENTO");
            }
            // if (state.telefone === '') {
            //     alert('SELECIONE SEU TELEFONE');
            // }
        }
    };

    return (
        <div className="container">
            <Logo />
            <Header title="Seja bem-vindo" subtitle="Preencha seus dados pessoais" />
            <div className="form-wrapper">
                <input
                    placeholder="DIGITE SEU NOME"
                    type="text"
                    value={state.name}
                    onChange={handleNameChange}
                />
                <input
                    placeholder="DIGITE SEU EMAIL"
                    type="email"
                    value={state.email}
                    onChange={handleEmailChange}
                />
                <InputMask
                    mask="(99) 99999-9999"
                    placeholder="DIGITE SEU TELEFONE"
                    type="tel"
                    value={state.phone}
                    onChange={handleTelefoneChange}
                />
                <input
                    placeholder="DIGITE SUA IDADE"
                    type="date"
                    value={state.birth_date}
                    onChange={handleIdadeChange}
                />
            </div>

            <div className="form-wraper">
                {!isMenor && (
                    <InputMask
                        mask="999.999.999-99"
                        placeholder="CPF do Responsável"
                        type="text"
                        value={state.cpf}
                        onChange={handleCpfChange}
                    />
                )}
            </div>
            {isMenor && (
                <div className="form-wrapper">
                    <input
                        placeholder="Nome do Responsável"
                        type="text"
                        value={state.resp_name}
                        onChange={handleRespNameChange}
                    />
                    <input
                        placeholder="E-mail do Responsável"
                        type="email"
                        value={state.resp_email}
                        onChange={handleRespEmailChange}
                    />
                    <InputMask
                        mask="999.999.999-99"
                        placeholder="CPF do Responsável"
                        type="text"
                        value={state.resp_cpf}
                        onChange={handleRespCpfChange}
                    />

                    <input
                        placeholder="Telefone do Responsável"
                        type="text"
                        value={state.resp_phone}
                        onChange={handleTelefoneChange}
                    />
                </div>
            )}
            <div className="buttons">
                <Button onClick={handleSubmit} label="Avançar" />
            </div>
        </div>
    );
};
