import { FormEvent } from "react"

import { GrFormPrevious, GrFormNext } from "react-icons/gr"
import { Etapa1 } from "../../components/FormWizard/Etapa1"
import { Etapa2 } from "../../components/FormWizard/Etapa2"
import { useForm } from "../../hooks/useForm";
import { Action, Container, FormGeral } from "./styled";
import { FormProvider } from "../../contexts/Auth/FormContext";
import { MainRoutes } from "../../routes/MainRoutes";

export const Matricula = () => {

    const { step, isFirstStep, isLastStep, back, next } = useForm([
        <Etapa1 />,
        <Etapa2 />
    ]);

    const onSubmit = (e: FormEvent) => {
        e.preventDefault();
        next();
    }

    return (
        <FormProvider>
            <MainRoutes />
            {/* <Container>
                <FormGeral onSubmit={onSubmit}>
                    <div>{step}</div>
                    <Action>
                        {!isFirstStep && <button onClick={back} type="button">
                            <span>Voltar</span>
                            <GrFormPrevious />
                        </button>}

                        <button type="submit">
                            {isLastStep ? "Cadastrar" : "Proximo"}
                            <GrFormNext />
                        </button>
                    </Action>
                </FormGeral>
            </Container> */}
        </FormProvider>
    )
}