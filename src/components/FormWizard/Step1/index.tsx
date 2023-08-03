import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { FormActions, useForm } from "../../../contexts/Form/FormContext";
import { ChangeEvent, useEffect } from "react";
import { Header } from "../../Shared/Header";
import { Logo } from "../../Shared/Logo";
import { Button } from "../../Shared/Buttons";
import InputMask from "react-input-mask";
import { Erros } from "../../../types/Erros";
import { parse, isValid, getYear, getMonth, getDate } from "date-fns";
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
    console.log("IDADE", age);
    setIsMenor(age < 18);

    dispatch({ type: FormActions.setBirth_date, payload: e.target.value });

    if (age >= 18) {
      dispatch({ type: FormActions.setIsMenor, payload: false });
    } else {
      setIsMenor(true);
      dispatch({ type: FormActions.setIsMenor, payload: true });
    }
  };

  const validatePhone = (phone: string): boolean => {
    const cleanPhone = phone.replace(/\D/g, '');
    return cleanPhone.length === 11;
  };

  const validateCpf = (cpf: string): boolean => {
    const cleanCpf = cpf.replace(/\D/g, '');
    return cleanCpf.length === 11;
  };

  const validateRespCpf = (resp_cpf: string): boolean => {
    const cleanRespCpf = resp_cpf.replace(/\D/g, '');
    return cleanRespCpf.length === 11;
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

  const handleRespEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: FormActions.setResp_Email, payload: e.target.value });
  }

  const handleSubmit = () => {
    const newErrors: Erros = {};
    console.log("State:", state);
    console.log("Is Menor:", isMenor);

    if (
      state.name !== "" &&
      state.phone !== "" &&
      validatePhone(state.phone) &&
      state.birth_date !== ""
    ) {
      if (isMenor) {
        if (
          state.resp_name !== "" &&
          state.resp_cpf !== "" &&
          validateRespCpf(state.resp_cpf) &&
          state.resp_phone !== "" &&
          validatePhone(state.resp_phone) &&
          state.resp_email !== ""
        ) {
          navigate("/matricula-online/step2");
        } else {
          if (state.resp_name === "") {
            newErrors.resp_name = "PREENCHA O NOME DO RESPONSÁVEL";
          }
          if (state.resp_cpf === "") {
            newErrors.resp_cpf = "PREENCHA O CPF DO RESPONSÁVEL";
          } else if (!validateRespCpf(state.resp_cpf)) {
            newErrors.resp_cpf = "CPF DO RESPONSÁVEL INVÁLIDO";
          }
          if (state.resp_phone === "") {
            newErrors.resp_phone = "PREENCHA O TELEFONE DO RESPONSÁVEL";
          } else if (!validatePhone(state.resp_phone)) {
            newErrors.resp_phone = "TELEFONE DO RESPONSÁVEL INVÁLIDO";
          }
          if (state.resp_email === "") {
            newErrors.resp_email = "PREENCHA O E-MAIL DO RESPONSÁVEL";
          }
        }
      } else {
        if (state.cpf !== "" && validateCpf(state.cpf) && state.email !== "") {
          navigate("/matricula-online/step2");
        } else {
          if (state.cpf === "" && state.email === "") {
            newErrors.cpf = "PREENCHA SEU CPF";
          } else if (!validateCpf(state.cpf)) {
            newErrors.cpf = "CPF INVÁLIDO";
          }
        }
      }
    } else {
      if (state.name === "") {
        newErrors.name = "PREENCHA SEU NOME";
      }
      if (state.phone === "") {
        newErrors.phone = "PREENCHA SEU TELEFONE";
      } else if (!validatePhone(state.phone)) {
        newErrors.phone = "TELEFONE INVÁLIDO";
      }
      if (state.birth_date === "") {
        newErrors.birth_date = "PREENCHA SUA DATA DE NASCIMENTO";
      }
    }
    setErrors(newErrors);
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
          required
        />

        {errors && <span className="error-message">{errors.birth_date}</span>}
        <input
          type="date"
          placeholder="DATA DE NASCIMENTO"
          value={state.birth_date}
          onChange={handleIdadeChange}
        />
        {errors && <span className="error-message">{errors.cpf}</span>}
        <div className="form-wrapper">

          {!isMenor && (
            <div className="form-isFalse">
              {errors && <span className="error-message">{errors.email}</span>}
              <input
                placeholder="DIGITE SEU EMAIL"
                type="email"
                value={state.email}
                onChange={handleEmailChange}
              />
              {errors && <span className="error-message">{errors.cpf}</span>}
              <InputMask
                mask="999.999.999-99"
                placeholder="DIGITE SEU CPF"
                type="text"
                value={state.cpf}
                onChange={handleCpfChange}
                required
              />
            </div>
          )}
        </div>
        {isMenor && (
          <div className="form-wrapper">
            {errors && <span className="error-message">{errors.resp_name}</span>}
            <input
              placeholder="NOME DO RESPONSÁVEL"
              type="text"
              value={state.resp_name}
              onChange={handleRespNameChange}
            />
            {errors && <span className="error-message">{errors.resp_cpf}</span>}
            <InputMask
              mask="999.999.999-99"
              placeholder="DIGITE SEU CPF "
              type="text"
              value={state.resp_cpf}
              onChange={handleRespCpfChange}
            />
            {errors && <span className="error-message">{errors.resp_phone}</span>}
            <InputMask
              mask="(99) 99999-9999"
              placeholder="TELEFONE DO RESPONSÁVEL"
              type="tel"
              value={state.resp_phone}
              onChange={handleRespPhoneChange}
            />
            {errors && <span className="error-message">{errors.resp_email}</span>}
            <input
              placeholder="DIGITE SEU EMAIL"
              type="email"
              value={state.resp_email}
              onChange={handleRespEmailChange}
              required
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
