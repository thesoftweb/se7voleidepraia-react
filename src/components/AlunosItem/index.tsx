import './style.css';

type Props = {
    img: string,
    nome: string;
}

export const AlunosItem = ({ img, nome }: Props) => {
    return (
        <div className="lista">
            <div className="perfil">
                <img className="foto" src={img} alt="" />
                <label className="nome">{nome}</label>
                <input type="checkbox" />
            </div>
        </div>
    )
}