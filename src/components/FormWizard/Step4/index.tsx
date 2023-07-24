import { ChangeEvent, useState } from "react";
import { Button } from "../../Shared/Buttons";
import { Header } from "../../Shared/Header";
import { Logo } from "../../Shared/Logo";
import { useForm } from "../../../contexts/Form/FormContext";
import { format } from "date-fns";
import { Link } from "react-router-dom";

import "./styles.css";
import { Turmas } from "../../../types/Turmas";
import { error } from "console";

export const Step4 = () => {
  const [title, setTitle] = useState("Confirme seus dados de matrícula");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [link, setLink] = useState("");
  const { state, dispatch } = useForm();
  const [turmas, setTurmas] = useState<Turmas[]>([]);
  const [errors, setErrors] = useState("");

  const formatBirthDate = (birthDate: string): string => {
    const date = new Date(birthDate);
    return format(date, "dd/MM/yyyy");
  };

  const handleChange = (event: ht) => {
    setIsChecked(event.target.checked);
  };

  const handleSubmitEnrollment = async () => {
    console.log("ENVIAR MATRICULA");

    if (!isChecked) {
      setErrors("Aceite é obrigatório");
      return alert("Voce precisa aceitar os termos de uso!");
    }
    const request = await fetch(
      "https://app.se7voleidepraia.com.br/api/enrollment",
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          name: state.name,
          email: state.email,
          birth_date: state.birth_date,
          cpf: state.cpf,
          course_id: state.course_id,
          plan_id: state.plan_id,
          unit_id: state.unit_id,
          postal_code: "000.000.000-99",
          street_name: "nome da rua",
          city_name: "cidade",
          neighborhood_name: "bairro",
          state_name: "estado",
        }),
      }
    );

    const { data } = await request.json();
    console.log(data);

    setSuccess(true);
    setLoading(false);
    setLink(data.link);
    setTitle("Efetue o pagamento da matrícula.");
  };

  return (
    <div className="container">
      <Logo />
      <Header title="Quase lá" subtitle={title} />
      {!loading && !success && (
        <>
          <div className="infos">
            <div className="stpe4">
              <InfoDetail label={"Nome:"} value={state.name} />
              <InfoDetail
                label={"Data nasc.:"}
                value={formatBirthDate(state.birth_date)}
              />
              <InfoDetail label={"Telefone:"} value={state.phone} />
              <InfoDetail label={"Email:"} value={state.email} />
              <InfoDetail label={"Unidade:"} value={state.unitName} />
              <InfoDetail label={"Turma:"} value={state.className} />
              <InfoDetail label={"Plano:"} value={state.planName} />
              <InfoDetail label={"Valor do plano:"} value={state.amount} />
            </div>
            <div className="terms">
              <Checkbox checked={isChecked} onChange={handleChange}>
                Aceito os termos de uso
              </Checkbox>
              {errors && <span className="error-message">{errors}</span>}
            </div>
            <div className="buttons">
              <Button
                label="Confimar Matrícula"
                color=""
                onClick={handleSubmitEnrollment}
              />
            </div>
          </div>
        </>
      )}

      {loading && (
        <>
          <h2>Enviando dados aguarde...</h2>
        </>
      )}

      {success && !loading && (
        <>
          <div className="pega">
            <div className="pegamais">
              <Link to={link} target="_blank">
                Clique aqui para pagar
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

type InfoDetailProps = {
  label: string;
  value: string;
};

export const InfoDetail = ({ label, value }: InfoDetailProps) => {
  return (
    <div className="info-detail">
      <span className="label-info">{label}</span>
      <span className="value-info">{value}</span>
    </div>
  );
};

type CheckboxProps = {
  checked: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  children: React.ReactNode;
};

const Checkbox: React.FC<CheckboxProps> = ({ checked, onChange, children }) => {
  return (
    <label className="checkbox-container">
      <input type="checkbox" checked={checked} onChange={onChange} />
      <span className="checkbox-style"></span>
      {children}
    </label>
  );
};
