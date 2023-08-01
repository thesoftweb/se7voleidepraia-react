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

    }, []);


    const [nomes, setNomes] = useState<Aluno[]>([
        { id: 1, nome: 'Matheus', selecionado: false, img: 'https://media.licdn.com/dms/image/D4D03AQH4DmK_z9k6CA/profile-displayphoto-shrink_800_800/0/1665597842820?e=1695859200&v=beta&t=Qhsbj0NVH3hdObTIHOTp9VGxH6S5itp6mWZO0I2EOi4' },
        { id: 2, nome: 'Matheus', selecionado: false, img: 'https://media.licdn.com/dms/image/D4D03AQH4DmK_z9k6CA/profile-displayphoto-shrink_800_800/0/1665597842820?e=1695859200&v=beta&t=Qhsbj0NVH3hdObTIHOTp9VGxH6S5itp6mWZO0I2EOi4' }
        ,
        { id: 3, nome: 'Matheus', selecionado: false, img: 'https://media.licdn.com/dms/image/D4D03AQH4DmK_z9k6CA/profile-displayphoto-shrink_800_800/0/1665597842820?e=1695859200&v=beta&t=Qhsbj0NVH3hdObTIHOTp9VGxH6S5itp6mWZO0I2EOi4' }
        ,



    ]);
    const marcarNome = (id: number, selecionado: boolean) => {
        const novosNomes = nomes.map((nome) =>
            nome.id === id ? { ...nome, selecionado } : nome
        );
        setNomes(novosNomes);
    };

    const marcarTodos = (selecionado: boolean) => {
        const novosNomes = nomes.map((nome) => ({
            ...nome,
            selecionado,
        }));
        setNomes(novosNomes);
    };

    return (
        <Container>
            <Header>
                <H1>Nome da Turma</H1>
            </Header>
            <Lista>
                <div className="marca">
                    <H2>Alunos:</H2>
                    <h2 className="label"> marca todos
                        <input type="checkbox" checked={nomes.every((nome) => nome.selecionado)}
                            onChange={(e) => marcarTodos(e.target.checked)} />
                    </h2>
                </div>
                <div className="cardItem">
                    {nomes.map((nome) => (
                        <div className="profile-card" key={nome.id}>
                            <div className="profile-content">
                                <img className="foto" src={nome.img} alt="" />
                                {nome.nome}

                                <div className="checkbox-wrapper">
                                    <input
                                        id="checkbox1"
                                        type="checkbox"
                                        checked={nome.selecionado}
                                        onChange={(e) => marcarNome(nome.id, e.target.checked)}
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </Lista>
        </Container>
    );
}
