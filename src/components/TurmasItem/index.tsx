import { Link } from "react-router-dom";
import "./style.css";

type Props = {
  nome: string;
  aulas?: string;
  categoria?: string;
  unit?: string;
  schedules?: [];
  onClick: () => void;
};

export const TurmasItem = ({
  nome,
  aulas,
  categoria,
  unit,
  onClick,
}: Props) => {
  return (
    <div className="turma" onClick={onClick}>
      <span className="turma-info">{nome}</span>
      <span className="turma-info">{categoria}</span>
      <span className="turma-info">{unit}</span>
      <span className="turma-info"> {aulas} </span>
    </div>
  );
};
