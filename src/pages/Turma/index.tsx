import { useState, useEffect, useContext } from "react";
import { TurmasItem } from "../../components/TurmasItem";
import { useNavigate } from "react-router-dom";
import { Turmas } from "../../types/Turmas";
import api from "../../services/api";
import { Header } from "../../components/Shared/Header";
import { AuthContext } from "../../contexts/Auth/AuthContext";

import "./styles.css";

export const Turma = () => {
  const auth = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [turmas, setTurmas] = useState<Turmas[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadTurmas();
  }, []);

  const loadTurmas = async () => {
    setLoading(true);

    const data = await api.get("/courses");
    setTurmas(data.data.data);
    setLoading(false);
  };

  const handleClick = (item: Turmas) => {
    navigate(`/alunos?course=${item.id}`);
  };

  return (
    <div className="container">
      <Header
        title={`Professor(a) ${auth.user}`}
        subtitle="Selecione uma turma para fazer a frequencia."
      />
      {loading && "Carregando.."}
      <div className="turmas-wrapper">
        {turmas.map((item, index) => (
          <TurmasItem
            key={index}
            nome={item.name}
            categoria={item.category}
            unit={item.unit}
            onClick={() => handleClick(item)}
          />
        ))}
      </div>
    </div>
  );
};
