import { ReactNode, createContext, useContext, useReducer } from "react";

type State = {
    currentStep: number;
    name: string;
    email: string;
    birth_date: string;
    cpf: string;

    resp_name: string;
    resp_email: string;
    resp_telefone: string;

    course_id: number;
    plan_id: number;
    unit_id: number;

    postal_code: string;
    street_name: string;
    city_name: string;
    neighbourhood_name: string;
    state_name: string;

    unidade: string;
    categoria: string;
    turma: string;

}
type Action = {
    type: FormActions;
    payload: any;
}
// { type: setName; payload: string }
// | { type: 'SET_EMAIL'; payload: string }
// | { type: 'SET_IDADE'; payload: number }
// | { type: 'SET_TELEFONE'; payload: string }
// | { type: 'SET_CATEGORIA'; payload: string }
// | { type: 'SET_UNIDADE'; payload: string }
// | { type: 'SET_TURMA'; payload: string };

type ContextType = {
    state: State;
    dispatch: (action: Action) => void;
}
type FormProviderProps = {
    children: ReactNode
};

const initialData: State = {
    currentStep: 0,
    name: '',
    email: '',
    birth_date: '',

    resp_name: '',
    resp_email: '',
    resp_telefone: '',

    cpf: '',

    course_id: 2,
    plan_id: 1,
    unit_id: 1,

    postal_code: '',
    street_name: '',
    city_name: '',
    neighbourhood_name: '',
    state_name: '',

    unidade: '',
    categoria: '',
    turma: '',
}
// Context
const FormContext = createContext<ContextType | undefined>(undefined);

// Reducer
export enum FormActions {
    setCurrentStep,
    setName,
    setEmail,
    setBirth_date,
    setTelefone,

    setResp_Name,
    setResp_Email,
    setResp_Telefone,



    setResponsavelFinanceiro,

    setUnidade,
    setCategoria,
    setTurma,
}
const formReducer = (state: State, action: Action) => {
    switch (action.type) {
        case FormActions.setCurrentStep:
            return { ...state, currentStep: action.payload };
        case FormActions.setName:
            return { ...state, name: action.payload };
        case FormActions.setEmail:
            return { ...state, email: action.payload };
        case FormActions.setBirth_date:
            return { ...state, birth_date: action.payload };
        case FormActions.setTelefone:
            return { ...state, telefone: action.payload };

        case FormActions.setResp_Name:
            return { ...state, resp_name: action.payload };

        case FormActions.setResp_Email:
            return { ...state, resp_email: action.payload };






        case FormActions.setCategoria:
            return { ...state, categoria: action.payload };
        case FormActions.setUnidade:
            return { ...state, unidade: action.payload };
        // case 'SET_TURMA':
        //     return { ...state, turma: action.payload };
        default:
            return state;
    }
}

// Provider
export const FormProvider = ({ children }: FormProviderProps) => {
    const [state, dispatch] = useReducer(formReducer, initialData);
    const value = { state, dispatch };
    return (
        <FormContext.Provider value={value}>
            {children}
        </FormContext.Provider>
    );
}

// Context Hook
export const useForm = () => {
    const context = useContext(FormContext);
    if (context === undefined) {
        throw new Error('useForm precisa ser usado dentro do FormProvider');
    }
    return context;
}