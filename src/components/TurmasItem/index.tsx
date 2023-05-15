import { Link } from "react-router-dom";
import './style.css';

type Props = {
    aulas: string,
    categoria: string;
}

export const TurmasItem = ({ aulas, categoria }: Props) => {
    return (
        <div className="teste">
            <Link to={`/alunos/`} className="turma">
                <div className="text">
                    <p>Nome da turma <br />
                        <span>{aulas} | {categoria}</span>
                    </p>
                </div>
            </Link >
        </div>
    )
}

