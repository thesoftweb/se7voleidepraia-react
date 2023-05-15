import { useState, useEffect } from 'react';
import { TurmasItem } from "../../components/TurmasItem";
import { TurmaFake } from '../../fake/TurmaFake';
import { Album } from '../../types/Album';

import { useContext } from 'react';

import { AuthContext } from '../../contexts/Auth/AuthContext';

import { Button, Container, Content, Header, H1, H2 } from './styled';

export const Turma = () => {
    const [loading, setLoading] = useState(false);
    const [list, setList] = useState<Album[]>([]);

    const auth = useContext(AuthContext);

    const teste = TurmaFake;

    useEffect(() => {
        loadTurma();
    }, []);

    const loadTurma = async () => {
        setLoading(true);
        const album = await TurmaFake;
        setList(album);
        setLoading(false);
    }
    const handleLogout = async () => {
        await auth.signout();
        window.location.href = window.location.href;
    }

    return (
        <Container>
            <Header>
                <H1>Nome do Professor</H1>
                {auth.user && <Button onClick={handleLogout}>Sair</Button>}
            </Header>
            <Content>
                <H2>Turmas:</H2>
                {loading && "Carregando.."}

                {list.map((item, index) => (
                    <TurmasItem
                        key={index}
                        aulas={item.aula}
                        categoria={item.categoria}
                    />
                ))}
            </Content>
        </Container>

    );
}