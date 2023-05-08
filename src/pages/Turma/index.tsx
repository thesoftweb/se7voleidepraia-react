import './styles.css';
import { useState, useEffect } from 'react';
import { TurmasItem } from "../../components/TurmasItem";
import { TurmaFake } from '../../fake/TurmaFake';
import { Album } from '../../types/Album';


export const Turma = () => {
    const [loading, setLoading] = useState(false);
    const [list, setList] = useState<Album[]>([]);

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

    return (
        <div className='main'>
            {loading && "Carregando.."}

            {list.map((item, index) => (
                <TurmasItem
                    key={index}
                    aulas={item.aula}
                    categoria={item.categoria}
                />
            ))}
        </div>

    );
}