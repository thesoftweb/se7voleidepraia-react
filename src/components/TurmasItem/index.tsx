import { Link } from "react-router-dom";
import './style.css';

type Props = {
    aulas: string,
    categoria: string;
}

export const TurmasItem = ({ aulas, categoria }: Props) => {
    return (
        <Link to={`/alunos/`} className="turma">
            <div><p><span>{aulas} </span>{categoria}</p></div>
        </Link >
    )
}

