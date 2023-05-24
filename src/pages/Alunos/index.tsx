import { useContext } from "react";
import { AuthContext } from "../../contexts/Auth/AuthContext";
import { useState, useEffect } from "react";

import { AlunoFake } from "../../fake/AlunoFake";


import { Container, Header, H1, Lista, H2 } from "./styled";
import { Aluno } from "../../types/Aluno";
import { AlunosItem } from "../../components/AlunosItem";



export const Alunos = () => {
    const [loading, setLoading] = useState(false);
    const [list, setList] = useState<Aluno[]>([]);

    useEffect(() => {
        loadAluno();
    }, []);

    const loadAluno = async () => {
        setLoading(true);
        const album = await AlunoFake;
        setList(album);
        setLoading(false);
    }

    return (
        <Container>
            <Header>
                <H1>Nome da Turma</H1>
                <h2></h2>
            </Header>
            <Lista>
                <H2>Alunos:</H2>
                {loading && "Carregando.."}

                {list.map((item, index) => (
                    <AlunosItem
                        key={index}
                        img={item.img}
                        nome={item.nome}
                    />
                ))}
            </Lista>
        </Container>
    );
}
