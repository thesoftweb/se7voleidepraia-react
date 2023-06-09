import { Content } from "./styled";

type Props = {
    title: string;
    text: string;
    src?: string;
}

export const FormTheme = ({ title, text, src }: Props) => {

    return (
        <Content>
            <div className="formLeft">
                <div>
                    <img src={src} alt="" />
                    <h1>{title}</h1>
                    <p>{text}</p>
                </div>
                {/* <div className="teste">
                        <div className="teste1">
                            <img className="fundo" src="./src/assets/DESIGNSET.png" alt="" />
                        </div>
                    </div> */}
            </div>
        </Content>

    )


}