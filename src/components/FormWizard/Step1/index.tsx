import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { FormActions, useForm } from "../../../contexts/Form/FormContext";
import { ChangeEvent, useEffect } from "react";
import { Header } from "../../Shared/Header";
import { Logo } from "../../Shared/Logo";
import { Button } from "../../Shared/Buttons";
import InputMask from "react-input-mask";
import { Erros } from "../../../types/Erros";

import "./styles.css";

export const Step1 = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useForm();
  const [isMenor, setIsMenor] = useState(state.isMenor);
  const [errors, setErrors] = useState<Erros>({});
  const [btnDisabled, setBtnDisabled] = useState(false);

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

  const validarIdade = (dataNascimento: string) => {
    const dataNascimentoArray = dataNascimento.split("/");
    const diaNascimento = parseInt(dataNascimentoArray[0], 10);
    const mesNascimento = parseInt(dataNascimentoArray[1], 10);
    const anoNascimento = parseInt(dataNascimentoArray[2], 10);

    const dataNascimentoDate = new Date(
      anoNascimento,
      mesNascimento - 1,
      diaNascimento
    );

    const hoje = new Date();

    const diferencaAnos = hoje.getFullYear() - dataNascimentoDate.getFullYear();

    console.log(dataNascimento, diferencaAnos);
    if (
      diferencaAnos > 18 ||
      (diferencaAnos === 18 && hoje >= dataNascimentoDate)
    ) {
      setIsMenor(false);
      dispatch({ type: FormActions.setIsMenor, payload: false });
    } else {
      setIsMenor(true);
      dispatch({ type: FormActions.setIsMenor, payload: true });
    }
  };

  const handleIdadeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const valorInput = e.target.value;

    dispatch({ type: FormActions.setBirth_date, payload: valorInput });
  };

  const validatePhone = (phone: string): boolean => {
    const cleanPhone = phone.replace(/\D/g, "");
    return cleanPhone.length === 11;
  };

  const validateCpf = (cpf: string): boolean => {
    const cleanCpf = cpf.replace(/\D/g, "");
    return cleanCpf.length === 11;
  };

  const validateRespCpf = (resp_cpf: string): boolean => {
    const cleanRespCpf = resp_cpf.replace(/\D/g, "");
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
  };

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
            newErrors.resp_name = "Nome do responsável obrigatório";
          }
          if (state.resp_cpf === "") {
            newErrors.resp_cpf = "CPF do responsável obrigatório";
          } else if (!validateRespCpf(state.resp_cpf)) {
            newErrors.resp_cpf = "CPF do responsável inválido";
          }
          if (state.resp_phone === "") {
            newErrors.resp_phone = "Telefone do responsável obrigatório";
          } else if (!validatePhone(state.resp_phone)) {
            newErrors.resp_phone = "Telfone do responsável inválido";
          }
          if (state.resp_email === "") {
            newErrors.resp_email = "E-mail do responsável obrigatório";
          }
        }
      } else {
        if (state.cpf !== "" && validateCpf(state.cpf) && state.email !== "") {
          navigate("/matricula-online/step2");
        } else {
          if (state.cpf === "" && state.email === "") {
            newErrors.cpf = "CPF obrigatório";
          } else if (!validateCpf(state.cpf)) {
            newErrors.cpf = "CPF Inválido";
          }
        }
      }
    } else {
      if (state.name === "") {
        newErrors.name = "Campo nome é obrigatório";
      }
      if (state.phone === "") {
        newErrors.phone = "Campo telefone é obrigatório";
      } else if (!validatePhone(state.phone)) {
        newErrors.phone = "Telfone inválido";
      }
      if (state.birth_date === "") {
        newErrors.birth_date = "Campo data de nascimento é obrigatório";
      }
      if (state.email === "") {
        newErrors.email = "Campo e-mail é obrigatório";
      }
      if (state.cpf === "") {
        newErrors.cpf = "Campo cpf é obrigatório";
      }
    }
    setErrors(newErrors);
  };

  const handleCheckCpf = () => {
    const newErrors: Erros = {};
    console.log("resp CPF +>>>>>>>", state.resp_cpf);
    console.log("CPF +>>>>>>>", state.cpf);

    let cpf = state.cpf ? state.cpf : state.resp_cpf;

    console.log("vai validar o ", cpf);

    if (validarCPF(cpf)) {
      setErrors(newErrors);
      setBtnDisabled(false);
      // return alert("CPF é inv");
    } else {
      setBtnDisabled(true);
      newErrors.cpf = "CPF é inválido!";
      newErrors.resp_cpf = "CPF é inválido!";
      setErrors(newErrors);
      // return alert("invalido");
    }
  };

  const validarCPF = (cpf: string) => {
    // Remove qualquer formatação do CPF, como pontos e traços
    cpf = cpf.replace(/[.-]/g, ""); // Remove formatação

    if (cpf.length !== 11 || !/^\d{11}$/.test(cpf)) {
      return false;
    }

    // Verifica se todos os dígitos são iguais
    if (/^(\d)\1+$/.test(cpf)) {
      return false;
    }

    let soma = 0;
    let resto;

    for (let i = 1; i <= 9; i++) {
      soma += parseInt(cpf[i - 1]) * (11 - i);
    }

    resto = (soma * 10) % 11;

    if (resto === 10 || resto === 11) {
      resto = 0;
    }

    if (resto !== parseInt(cpf[9])) {
      return false;
    }

    soma = 0;

    for (let i = 1; i <= 10; i++) {
      soma += parseInt(cpf[i - 1]) * (12 - i);
    }

    resto = (soma * 10) % 11;

    if (resto === 10 || resto === 11) {
      resto = 0;
    }

    if (resto !== parseInt(cpf[10])) {
      return false;
    }

    return true;
  };

  return (
    <div className="container">
      <Logo />
      <Header title="Seja bem-vindo" subtitle="Preencha os dados do Aluno(a)" />
      <div className="form-wrapper">
        {errors && <span className="error-message">{errors.name}</span>}
        <input
          placeholder="Seu Nome"
          type="text"
          value={state.name}
          onChange={handleNameChange}
        />

        {errors && <span className="error-message">{errors.phone}</span>}
        <InputMask
          mask="(99) 99999-9999"
          placeholder="Seu Telefone"
          type="tel"
          value={state.phone}
          onChange={handleTelefoneChange}
          required
        />

        {errors && <span className="error-message">{errors.birth_date}</span>}
        <InputMask
          type="tel"
          mask="99/99/9999"
          placeholder="Sua Data de Nascimento"
          value={state.birth_date}
          onChange={handleIdadeChange}
          onBlur={() => validarIdade(state.birth_date)}
        />

        <div className="form-wrapper">
          {!isMenor && (
            <div className="form-isFalse">
              {errors && <span className="error-message">{errors.email}</span>}
              <input
                placeholder="Seu e-mail"
                type="email"
                value={state.email}
                onChange={handleEmailChange}
              />
              {errors && <span className="error-message">{errors.cpf}</span>}
              <InputMask
                mask="999.999.999-99"
                placeholder="Seu CPF"
                type="text"
                value={state.cpf}
                onChange={handleCpfChange}
                onBlur={handleCheckCpf}
                required
              />
            </div>
          )}
        </div>
        {isMenor && (
          <div className="form-wrapper">
            {errors && (
              <span className="error-message">{errors.resp_name}</span>
            )}
            <input
              placeholder="Nome do responsável"
              type="text"
              value={state.resp_name}
              onChange={handleRespNameChange}
            />
            {errors && <span className="error-message">{errors.resp_cpf}</span>}
            <InputMask
              mask="999.999.999-99"
              placeholder="CPF do responsável"
              type="text"
              value={state.resp_cpf}
              onBlur={handleCheckCpf}
              onChange={handleRespCpfChange}
            />
            {errors && (
              <span className="error-message">{errors.resp_phone}</span>
            )}
            <InputMask
              mask="(99) 99999-9999"
              placeholder="Telefone do responsável"
              type="tel"
              value={state.resp_phone}
              onChange={handleRespPhoneChange}
            />
            {errors && (
              <span className="error-message">{errors.resp_email}</span>
            )}
            <input
              placeholder="E-mail do responsável"
              type="email"
              value={state.resp_email}
              onChange={handleRespEmailChange}
              required
            />
          </div>
        )}
        <div className="buttons-step1">
          <Button
            onClick={handleSubmit}
            label="Avançar"
            disabled={btnDisabled}
          />
        </div>
      </div>
    </div>
  );
};
