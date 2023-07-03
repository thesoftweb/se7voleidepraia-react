import { Content } from "./styled";

type Props = {
    title: string;
    text: string;
    src?: string;
}

export const FormLeft = ({ title, text, src }: Props) => {

    return (
        <Content>
            <div className="formLeft">
                <div>
                    <img src={src} alt="" />
                    <h1>{title}</h1>
                    <p>{text}</p>
                </div>
            </div>
        </Content>

    )
}