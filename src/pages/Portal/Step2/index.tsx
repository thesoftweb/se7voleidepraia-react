import { useEffect, useState } from "react";
import api from "../../../services/api";
import { Header } from "../../../components/Shared/Header";
import { Logo } from "../../../components/Shared/Logo";

import "./styles.css";

export const PortalStep2 = () => {
  const cpf = new URLSearchParams(location.search).get("cpf");

  const [bills, setBills] = useState<BillCard[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  async function fechBills() {
    setIsLoading(true);
    const response = await api.get(`customer/bills?cpf=${cpf}`);

    if (!response.data.data.length) {
      setIsLoading(false);
      setError("Nenhuma cobrança informada para o CPF");
      setBills([]);
      return;
    } else {
      setIsLoading(false);
      setError("");
      let originalBills = response.data.data;
      setBills([...originalBills].reverse());
    }
  }

  useEffect(() => {
    fechBills();
  }, []);

  return (
    <div className="container">
      <Logo />
      <Header title="Cobranças" />
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
          Ver Cobrança
        </a>
        <a href={link} target="_blank">
          Boleto
        </a>
      </div>
    </div>
  );
};
