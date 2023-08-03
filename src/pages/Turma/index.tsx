import { useState, useEffect } from "react";
import { TurmasItem } from "../../components/TurmasItem";
import { Container, Content, Header, H1, H2 } from "./styled";
import { useNavigate } from "react-router-dom";
import { Turmas } from "../../types/Turmas";
import api from "../../services/api";

export const Turma = () => {
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
    console.log("navegar turma" + item);
    navigate(`/alunos?course=${item.id}`);
  };

  return (
    <Container>
      <Header />
      <Content>
        <H2>Selecione uma turma:</H2>
        {loading && "Carregando.."}
        {turmas.map((item, index) => (
          <TurmasItem
            key={index}
            nome={item.name}
            categoria={item.category}
            unit={item.unit}
            onClick={() => handleClick(item)}
          />
        ))}
      </Content>
    </Container>
  );
};
