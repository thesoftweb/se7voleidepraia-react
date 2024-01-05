import React, { useEffect, useState } from "react";
import api from "../../../services/api";
import { Header } from "../../../components/Shared/Header";
import { Logo } from "../../../components/Shared/Logo";
import "./styles.css";
import { Button } from "../../../components/Shared/Buttons";
import { useNavigate } from "react-router-dom";
import { Contrato } from "../../../components/Shared/Contrato";

export const PortalStep2 = () => {
  const cpf = new URLSearchParams(location.search).get("cpf");

  const [tabActive, setTabActive] = useState("bills");
  const [bills, setBills] = useState<BillCard[]>([]);
  const [enrollments, setEnrollments] = useState<EnrollmentCard[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const navigate = useNavigate();

  async function fetchBills() {
    setIsLoading(true);
    const response = await api.get(`customer/bills?cpf=${cpf}`);

    if (!response.data.bills.length) {
      setIsLoading(false);
      setError("Nenhuma cobrança informada para o CPF");
      setBills([]);
      return;
    } else {
      setIsLoading(false);
      setError("");
      let originalBills = response.data.bills;
      setBills([...originalBills].reverse());
      setEnrollments(response.data.enrollments);
    }
  }

  const handleTabChange = (tab: string) => {
    setTabActive(tab);
  };

  const handleUploadFoto = (student_id: string) => {
    console.log(student_id);
    navigate(`/portal/aluno/upload-foto?student=${student_id}`);
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };
  const handleAcceptTerms = () => {
    setTermsAccepted(true);
    setShowModal(false);
  };

  useEffect(() => {
    console.log(tabActive);
    fetchBills();
  }, []);

  return (
    <div className="container">
      <Logo />
      <Header title="Painel do Aluno" />

      <div className="tabs">
        <div className={tabActive === "bills" ? "tab-active" : ""}>
          <Button onClick={() => handleTabChange("bills")} label="Cobranças" />
        </div>
        <div className={tabActive === "enroll" ? "tab-active" : ""}>
          <Button onClick={() => handleTabChange("enroll")} label="Perfil" />
        </div>
      </div>

      {tabActive === "bills" ? (
        <div className="billWrapper">
          {error ? <p>{error}</p> : null}
          {isLoading ? <p>Carregando...</p> : null}
          {bills &&
            bills.map((bill: BillCard) => (
              <BillCard
                id={bill.id}
                url={bill.url}
                dueDate={bill.dueDate}
                description={bill.description}
                value={bill.value}
                link={bill.link}
                pdf={bill.pdf}
              />
            ))}
        </div>
      ) : (
        <div className="billWrapper">
          <a
            href="https://se7voleidepraia.com.br/wp-content/uploads/2024/01/calendario-SE7-2024.pdf"
            className="btn-link"
          >
            Calendário 2024
          </a>
          {enrollments.map((enroll: EnrollmentCard) => (
            <EnrollmentCard
              key={enroll.student_id}
              student_id={enroll.student_id}
              course={enroll.course}
              student={enroll.student}
              photo={enroll.photo}
              onPress={() => handleUploadFoto(enroll.student_id)}
              handleOpenModal={handleOpenModal}
            />
          ))}
        </div>
      )}
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
  );
};

type BillCard = {
  id: string;
  url: string;
  dueDate: string;
  description: string;
  pdf: string;
  link: string;
  value: string;
};

type EnrollmentCard = {
  student: string;
  student_id: string;
  course: string;
  photo: string;
  onPress: () => void;
  handleOpenModal?: () => void;
  setShowModal?: ((show: boolean) => void) | undefined;
};

const BillCard = ({ id, dueDate, description, pdf, link, value }: BillCard) => {
  return (
    <div className="billCard" key={id}>
      <div className="infos">
        <div className="info">Valor: {value}</div>
        <div className="info">Descrição: {description}</div>
        <div className="info">Vencimento: {dueDate}</div>
      </div>
      <div className="actions">
        <a href={pdf} target="_blank">
          Cobrança
        </a>
        <a href={link} target="_blank">
          Boleto
        </a>
      </div>
    </div>
  );
};

const EnrollmentCard = ({
  student,
  student_id,
  course,
  onPress,
  photo,
  setShowModal,
  handleOpenModal,
}: EnrollmentCard) => {
  return (
    <div className="enrollCard" key={student_id}>
      {photo && (
        <div className="photo">
          <img src={photo} alt="" className="foto" />
        </div>
      )}
      <div className="infos">
        <div className="info">Aluno: {student}</div>
        <div className="info">Curso: {course}</div>
        <Button onClick={onPress} label="Enviar Foto" />
        {handleOpenModal && (
          <Button label="Ver Contrato" onClick={handleOpenModal} />
        )}
      </div>
    </div>
  );
};
