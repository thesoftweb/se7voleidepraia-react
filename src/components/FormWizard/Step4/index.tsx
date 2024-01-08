import { ChangeEvent, useReducer, useState, useRef } from "react";
import { Button } from "../../Shared/Buttons";
import { Header } from "../../Shared/Header";
import { Logo } from "../../Shared/Logo";
import { FormActions, useForm } from "../../../contexts/Form/FormContext";
import { format } from "date-fns";
import { Link, useNavigate } from "react-router-dom";
import "./styles.css";
import { Contrato } from "../../Shared/Contrato";
import api from "../../../services/api";
import useClipboard from "../../../hooks/useClipboard";

export const Step4 = () => {
  const copyToCliboard = useClipboard();

  const [title, setTitle] = useState("Confirme seus dados de matrícula");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [link, setLink] = useState("");
  const [address, setAddress] = useState("");
  const [value, setValue] = useState("");
  const [linkGroup, setLinkGroup] = useState("");
  const { state, dispatch } = useForm();
  const [errors, setErrors] = useState("");
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleAcceptTerms = () => {
    setShowModal(false);
    setIsChecked(true);
  };

  const formatBirthDate = (birthDate: string): string => {
    const [year, month, day] = birthDate.split("-").map(Number);
    const date = new Date(year, month - 1, day);
    console.log("dataaa", date);
    return format(date, "dd/MM/yyyy");
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
  };

  const handleSubmitEnrollment = async () => {
    console.log("ENVIAR MATRICULA");
    console.log("ENVIAR MATRICULA", state);

    if (!isChecked) {
      setErrors("Aceite é obrigatório");
      return alert("Voce precisa aceitar os termos de uso!");
    }

    setLoading(true);

    let oldDate = state.birth_date.split("/");
    let year = oldDate[2];
    let month = oldDate[1];
    let day = oldDate[0];

    const newDate = `${year}-${month}-${day}`;

    try {
      const data = await api.post("/enrollment", {
        name: state.name,
        email: state.email,
        birth_date: newDate,
        cpf: state.cpf,
        resp_name: state.resp_name,
        resp_phone: state.resp_phone,
        resp_email: state.resp_email,
        resp_cpf: state.resp_cpf,
        course_id: state.course_id,
        plan_id: state.plan_id,
        unit_id: state.unit_id,
        phone: state.phone ? state.phone : state.resp_phone,
        isMenor: state.isMenor,
        isFamilia: state.isFamilia,
        familiaStudents: state.familiaStudents,
      });

      setSuccess(true);
      setLoading(false);
      setLink(data.data.data.link);
      setLinkGroup(data.data.data.whatsapp_link);
      setAddress(data.data.data.address);
      setValue(data.data.data.value);
      setTitle("Efetue o pagamento da matrícula.");
    } catch (error) {
      setErrors("Não foi possível realizar sua matrícula");
      setSuccess(false);
      setLoading(false);
      setTitle("Não foi possível realizar sua matrícula");
    }
  };

  const handleGetAmount = () => {
    let valorString = state.amount;

    // Remover caracteres não numéricos e substituir a vírgula por ponto
    let valorNumerico = parseFloat(
      valorString.replace(/[^\d,]/g, "").replace(",", ".")
    );

    // Verificar se o valor é um número válido
    if (!isNaN(valorNumerico)) {
      // Agora você pode multiplicar o valor
      let multiplicador = state.familiaStudents.length + 1;
      let resultado = valorNumerico * multiplicador;
      return resultado.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      });
    } else {
      return "0.00";
    }
  };

  const handleEnrollmentValue = () => {
    const valorPadraoMatricula = import.meta.env.VITE_ENROLL_VALUE;

    if (state.isFamilia) {
      const quantidadeMatriculas = state.familiaStudents.length + 1; // +1 para o aluno padrão
      const valorTotal = quantidadeMatriculas * valorPadraoMatricula;
      return formatarValorBRL(valorTotal);
    } else {
      return `R$ ${valorPadraoMatricula},00`;
    }
  };

  function formatarValorBRL(valor: number) {
    return valor.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }

  const handleBack = async () => {
    console.log("step4", state);
    // Redefinir todas as informações relevantes no estado
    dispatch({ type: FormActions.setPlan_Id, payload: null });
    dispatch({ type: FormActions.setPlanName, payload: "" });
    dispatch({ type: FormActions.setAmount, payload: "" });
    dispatch({ type: FormActions.setIsFamilia, payload: false });
    dispatch({ type: FormActions.RemoverFamiliaStudent, payload: [] });

    // Navegar de volta ao Step3
    navigate("/matricula-online/step3");
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
              <InfoDetail label={"Data nasc.:"} value={state.birth_date} />
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
              {/* dando erro */}
              <InfoDetail
                label={"Valor da Matrícula:"}
                value={handleEnrollmentValue()}
              />

              <InfoDetail
                label={"Valor da Mensalidade:"}
                value={state.isFamilia ? handleGetAmount() : state.amount}
              />
            </div>

            <div className="terms">
              <input
                type="checkbox"
                className="input-check"
                checked={isChecked}
                onChange={() => setIsChecked(!isChecked)}
              />

              <p onClick={handleOpenModal}>
                Aceito os <u>termos de uso</u>.
              </p>

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
              <Button label="Voltar" color="red" onClick={handleBack} />
              <Button
                label="Confimar Matrícula"
                color=""
                onClick={handleSubmitEnrollment}
                disabled={loading}
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
        <div className="pega">
          <div className="payment-info">
            <span>{`Pague a matricula através da chave PIX copia/cola, no valor de ${value}`}</span>
            <span>
              Prazo de 24h para concluir o pagamento da matrícula, senão a vaga
              na turma não é efetivada.
            </span>

            <span>
              As mensalidades podem ser acessadas no "Portal do Aluno" em nosso
              site
            </span>

            <textarea name="" id="" cols={30} rows={5}>
              {link}
            </textarea>
            <button
              className="copy-button"
              onClick={() => copyToCliboard(link)}
            >
              Copiar Chave Pix
            </button>

            {linkGroup && (
              <Link to={linkGroup} target="_blank">
                Entre no grupo de Alunos do Whatsapp
              </Link>
            )}
          </div>

          <div className="navigation">
            <Link to="https://se7voleidepraia.com.br" className="home-button">
              Voltar pro Início
            </Link>
          </div>
        </div>
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
