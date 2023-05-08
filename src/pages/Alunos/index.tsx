import { useContext } from "react";
import { AuthContext } from "../../contexts/Auth/AuthContext";


import { AlunosItem } from "../../components/AlunosItem";

export const Alunos = () => {
    const auth = useContext(AuthContext);

    return (
        <div>
            <AlunosItem />
        </div>
    );
}