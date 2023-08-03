import { ChangeEvent, useState } from "react";
import { Button } from "../../Shared/Buttons";
import { Header } from "../../Shared/Header";
import { Logo } from "../../Shared/Logo";
import { useForm } from "../../../contexts/Form/FormContext";
import { format } from "date-fns";
import { Link } from "react-router-dom";

import "./styles.css";
import { Contrato } from "../../Shared/Contrato";
import api from "../../../services/api";
import Checkbox from "../../Shared/Checkbox";

export const Step4 = () => {
  const [title, setTitle] = useState("Confirme seus dados de matrícula");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [link, setLink] = useState("");
  const { state, dispatch } = useForm();
  const [errors, setErrors] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleCheckboxClick = () => {
    setShowModal(true);
  };

  const handleAcceptTerms = () => {
    setShowModal(false);
    setIsChecked(true);
  };

  const formatBirthDate = (birthDate: string): string => {
    const [year, month, day] = birthDate.split("-").map(Number);
    const date = new Date(year, month - 1, day);
    console.log('dataaa', date);
    return format(date, "dd/MM/yyyy");
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
  };

  const handleSubmitEnrollment = async () => {
    console.log("ENVIAR MATRICULA");

    if (!isChecked) {
      setErrors("Aceite é obrigatório");
      return alert("Voce precisa aceitar os termos de uso!");
    }
    const data = await api.post("/enrollment", {
      name: state.name,
      email: state.email,
      birth_date: state.birth_date,
      cpf: state.cpf,
      resp_name: state.resp_name,
      resp_phone: state.resp_phone,
      resp_cpf: state.resp_cpf,
      course_id: state.course_id,
      plan_id: state.plan_id,
      unit_id: state.unit_id,
    });

    setSuccess(true);
    setLoading(false);
    setLink(data.data.data.link);
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
              {state.isMenor ? (
                <InfoDetail
                  label={"Email do Responsável:"}
                  value={state.resp_email}
                />
              ) : (
                <InfoDetail label={"Email:"} value={state.email} />
              )}
              <InfoDetail label={"Unidade:"} value={state.unitName} />
              <InfoDetail label={"Turma:"} value={state.className} />
              <InfoDetail label={"Plano:"} value={state.planName} />
              <InfoDetail label={"Valor do plano:"} value={state.amount} />
            </div>

            <div className="terms">
              <Checkbox checked={isChecked} onChange={handleCheckboxClick}>
                Termos de uso
              </Checkbox>
              {showModal && (
                <div className="modal">
                  <div className="modal-content">
                    <h3>Termos de Uso</h3>
                    <hr />
                    <Contrato />
                    <Button label="Aceitar" onClick={handleAcceptTerms} />
                  </div>
                </div>
              )}
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
