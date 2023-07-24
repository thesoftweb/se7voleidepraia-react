import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { FormActions, useForm } from "../../../contexts/Form/FormContext";
import { ChangeEvent, useEffect } from "react";
import { Header } from "../../Shared/Header";
import { Logo } from "../../Shared/Logo";
import { Button } from "../../Shared/Buttons";
import InputMask from "react-input-mask";
import { Erros } from "../../../types/Erros";
import { parse, isValid, getYear, getMonth, getDate } from 'date-fns';
import { format } from "date-fns";

import "./styles.css";

export const Step1 = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useForm();
  const [isMenor, setIsMenor] = useState(state.isMenor);
  const [errors, setErrors] = useState<Erros>({});

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

  // const formatDate = (data: Date): string => {
  //   const day = data.getDate().toString().padStart(2, "0");
  //   const month = (data.getMonth() + 1).toString().padStart(2, "0");
  //   const year = data.getFullYear().toString();
  //   return `${day}/${month}/${year}`;
  // };
  // const formatBirthDate = (birthDate: string): string => {
  //   const date = new Date(birthDate);
  //   return format(date, "dd/MM/yyyy");
  // };

  const handleIdadeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const currentDate = new Date();
    const birthDate = new Date(e.target.value);
    let age = currentDate.getFullYear() - birthDate.getFullYear();

    // Verifica se o mês de nascimento é maior que o mês atual
    // ou se é o mesmo mês, mas o dia de nascimento é maior que o dia atual
    // Nesses casos, ainda não fez aniversário, então subtrai 1 da idade
    const currentMonth = currentDate.getMonth();
    const birthMonth = birthDate.getMonth();
    const currentDay = currentDate.getDate();
    const birthDay = birthDate.getDate();

    if (
      birthMonth > currentMonth ||
      (birthMonth === currentMonth && birthDay > currentDay)
    ) {
      age--;
    }
    console.log('IDADE', age);

    dispatch({ type: FormActions.setBirth_date, payload: e.target.value });

    if (age >= 18) {
      dispatch({ type: FormActions.setIsMenor, payload: false });
    } else {
      setIsMenor(true);
      dispatch({ type: FormActions.setIsMenor, payload: true });
    }
  };

  const handleCpfChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: FormActions.setCpf, payload: e.target.value });
  };

  const handleRespNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: FormActions.setResp_Name, payload: e.target.value });
  };

  const handleTelefoneChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: FormActions.setPhone, payload: e.target.value });
  };

  const handleRespCpfChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: FormActions.setResp_cpf, payload: e.target.value });
  };

  const handleRespPhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: FormActions.setResp_Telefone, payload: e.target.value });
  };

  const handleSubmit = () => {
    const newErrors: Erros = {};
    if (
      state.name !== "" &&
      state.phone !== "" &&
      state.birth_date !== "" &&
      state.email !== "" &&
      state.cpf !== ""
    ) {
      navigate("/matricula-online/step2");
    } else {

      if (state.name === "") {
        newErrors.name = "PREENCHA SEU NOME";
      }
      if (state.email === "") {
        newErrors.email = "PREENCHA SEU EMAIL";
      }
      if (state.phone === "") {
        newErrors.phone = "PREENCHA SEU TELEFONE";
      }
      if (state.birth_date === "") {
        newErrors.birth_date = "PREENCHA SUA DATA DE NASCIMENTO";
      }
      if (state.cpf === "") {
        newErrors.cpf = "PREENCHA SEU CPF";
      }
      setErrors(newErrors);
    }
  };

  return (
    <div className="container">
      <Logo />
      <Header title="Seja bem-vindo" subtitle="Preencha seus dados pessoais" />
      <div className="form-wrapper">

        {errors && <span className="error-message">{errors.name}</span>}
        <input
          placeholder="DIGITE SEU NOME"
          type="text"
          value={state.name}
          onChange={handleNameChange}
        />

        {errors && <span className="error-message">{errors.phone}</span>}
        <InputMask
          mask="(99) 99999-9999"
          placeholder="DIGITE SEU TELEFONE"
          type="tel"
          value={state.phone}
          onChange={handleTelefoneChange}
        />

        {errors && <span className="error-message">{errors.birth_date}</span>}
        <input
          type="date"
          placeholder="DATA DE NASCIMENTO"
          value={state.birth_date}
          onChange={handleIdadeChange}
        />
        {/* <InputMask
          mask="99/99/9999"
          placeholder="DATA DE NASCIMENTO"
          type="text"
          value={state.birth_date}
          onChange={handleIdadeChange}
        /> */}

        {errors && <span className="error-message">{errors.email}</span>}
        <input
          placeholder="DIGITE SEU EMAIL"
          type="email"
          value={state.email}
          onChange={handleEmailChange}
        />


        <div className="form-wraper">

          {!isMenor && (
            <InputMask
              mask="999.999.999-99"
              placeholder="DIGITE SEU CPF"
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
            <InputMask
              mask="999.999.999-99"
              placeholder="CPF do Responsável"
              type="text"
              value={state.resp_cpf}
              onChange={handleRespCpfChange}
            />
            <InputMask
              mask="(99) 99999-9999"
              placeholder="Telefone do Responsável"
              type="tel"
              value={state.resp_phone}
              onChange={handleRespPhoneChange}
            />
          </div>
        )}
        <div className="buttons-step1">
          <Button onClick={handleSubmit} label="Avançar" />
        </div>

      </div>
    </div>
  );
};
