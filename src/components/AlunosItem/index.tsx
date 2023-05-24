import './style.css';

type Props = {
    img: string,
    nome: string;
}

export const AlunosItem = ({ img, nome }: Props) => {
    return (
        <div className="profile-card">
            <div className="profile-content">
                <img className="foto" src={img} alt="" />
                <label className='nome'>{nome}</label>
            </div>
            <div className="checkbox-wrapper">
                <input type="checkbox" id="checkbox1" />
            </div>
        </div>
    )
}