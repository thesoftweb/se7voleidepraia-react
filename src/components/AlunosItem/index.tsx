import './style.css';

type Props = {
    id: number;
    img: string;
    nome: string;
    selecionado: boolean;
}

export const AlunosItem = ({ img, nome }: Props) => {
    return (
        <div className="profile-card">
            <div className="profile-content">
                <img className="foto" src={img} alt="" />
                <label className='nome'>{nome}</label>
            </div>
            <div className="checkbox-wrapper">
                <input type="checkbox" id={"checkbox1"} />
            </div>
        </div>
    )
}
