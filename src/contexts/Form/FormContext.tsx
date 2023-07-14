import { ReactNode, createContext, useContext, useReducer } from "react";

type State = {
  currentStep: number;
  name: string;
  email: string;
  birth_date: string;
  cpf: string;
  phone: string;
  isMenor: boolean;

  resp_name: string;
  resp_email: string;
  resp_phone: string;
  resp_cpf: string;

  category: string;
  course_id: number;
  plan_id: number;
  unit_id: number;

  postal_code: string;
  street_name: string;
  city_name: string;
  neighbourhood_name: string;
  state_name: string;
};
type Action = {
  type: FormActions;
  payload: any;
};

type ContextType = {
  state: State;
  dispatch: (action: Action) => void;
};
type FormProviderProps = {
  children: ReactNode;
};

const initialData: State = {
  currentStep: 0,
  name: "",
  email: "",
  birth_date: "",
  cpf: "",
  phone: "",
  isMenor: false,
  category: "",
  course_id: 0,
  plan_id: 0,
  unit_id: 0,

  resp_name: "",
  resp_email: "",
  resp_phone: "",
  resp_cpf: "",

  postal_code: "",
  street_name: "",
  city_name: "",
  neighbourhood_name: "",
  state_name: "",
};
// Context
const FormContext = createContext<ContextType | undefined>(undefined);

// Reducer
export enum FormActions {
  setCurrentStep,
  setName,
  setEmail,
  setBirth_date,
  setCpf,
  setTelefone,
  setIsMenor,
  setCategory,
  setUnit_Id,
  setCourse_Id,
  setPlan_Id,
  setCourse,

  setResp_Name,
  setResp_Email,
  setResp_Telefone,
  setResp_cpf,

  setUnit,
  setPlan,
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
    case FormActions.setCpf:
      return { ...state, cpf: action.payload };
    case FormActions.setTelefone:
      return { ...state, telefone: action.payload };
    case FormActions.setIsMenor:
      return { ...state, isMenor: action.payload };
    case FormActions.setResp_Name:
      return { ...state, resp_name: action.payload };
    case FormActions.setResp_Email:
      return { ...state, resp_email: action.payload };
    case FormActions.setResp_cpf:
      return { ...state, resp_cpf: action.payload };
    case FormActions.setCategory:
      return { ...state, category: action.payload };
    case FormActions.setCourse_Id:
      return { ...state, course_id: action.payload };
    case FormActions.setPlan_Id:
      return { ...state, plan_id: action.payload };
    case FormActions.setUnit_Id:
      return { ...state, unit_id: action.payload };
    case FormActions.setCourse:
      return { ...state, course_id: action.payload };
    default:
      return state;
  }
};

// Provider
export const FormProvider = ({ children }: FormProviderProps) => {
  const [state, dispatch] = useReducer(formReducer, initialData);
  const value = { state, dispatch };
  return <FormContext.Provider value={value}>{children}</FormContext.Provider>;
};

// Context Hook
export const useForm = () => {
  const context = useContext(FormContext);
  if (context === undefined) {
    throw new Error("useForm precisa ser usado dentro do FormProvider");
  }
  return context;
};
