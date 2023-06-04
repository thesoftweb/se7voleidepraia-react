import { ReactNode } from "react";
import { useForm } from "../../contexts/Auth/FormContext";
import { Container } from "./styled";
import { Content } from "./styled";

type Props = {
    children: ReactNode;
}

export const FormTheme = ({ children }: Props) => {
    const { state } = useForm();

    return (
        <Container>
            <Content>

            </Content>
        </Container>
    )


}