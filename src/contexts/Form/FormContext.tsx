import { ReactNode, createContext, useContext, useReducer } from "react";

type State = {

    currentStep: number;
    name: string;
    email: string;
    idade: number;
    telefone: string;

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
    idade: 0,
    telefone: '',

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
    setIdade,
    setTelefone,

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
        case FormActions.setIdade:
            return { ...state, idade: action.payload };
        case FormActions.setTelefone:
            return { ...state, telefone: action.payload };

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