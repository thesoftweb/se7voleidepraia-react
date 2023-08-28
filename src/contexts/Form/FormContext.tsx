import { ReactNode, createContext, useContext, useReducer } from "react";

type State = {
  currentStep: number;

  name: string;
  email: string;
  birth_date: string;
  cpf: string;
  phone: string;

  isMenor: boolean;

  isFamilia: boolean;
  familiaStudents: {
    nome: string;
    birthdate: string;
    course_id: number;
    course: string;
  }[];
  familyUnit: number;
  familyCategory: string;

  resp_name: string;
  resp_phone: string;
  resp_cpf: string;
  resp_email: string;

  category: string;

  course_id: number;

  plan_id: number;
  unit_id: number;

  unitName: string;
  className: string;
  planName: string;
  amount: string;

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
  isFamilia: false,
  familiaStudents: [],
  familyUnit: 0,
  familyCategory: "",

  resp_name: "",
  resp_phone: "",
  resp_cpf: "",
  resp_email: "",

  category: "",
  course_id: 0,

  plan_id: 0,
  unit_id: 0,

  unitName: "",
  className: "",
  planName: "",
  amount: "",

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
  setPhone,

  setIsMenor,
  setIsFamilia,
  addFamiliaStudent,
  RemoverFamiliaStudent,
  setFamilyUnit,
  setFamilyCategory,

  setResp_Name,
  setResp_Telefone,
  setResp_cpf,
  setResp_Email,

  setCategory,
  setCourse_Id,
  setCourse,

  setUnit_Id,
  setUnitName,

  setPlan_Id,

  setPlanName,
  setAmount,
  setClassName,

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

    case FormActions.setPhone:
      return { ...state, phone: action.payload };

    case FormActions.setIsMenor:
      return { ...state, isMenor: action.payload };

    case FormActions.setIsFamilia:
      return { ...state, isFamilia: action.payload };

    case FormActions.addFamiliaStudent:
      return {
        ...state,
        familiaStudents: [...state.familiaStudents, action.payload],
      };

    case FormActions.RemoverFamiliaStudent:
      return { ...state, familiaStudents: action.payload };

    case FormActions.setFamilyUnit:
      return { ...state, familyUnit: action.payload };

    case FormActions.setFamilyCategory:
      return { ...state, familyCategory: action.payload };

    case FormActions.setResp_Name:
      return { ...state, resp_name: action.payload };

    case FormActions.setResp_cpf:
      return { ...state, resp_cpf: action.payload };

    case FormActions.setResp_Telefone:
      return { ...state, resp_phone: action.payload };

    case FormActions.setResp_Email:
      return { ...state, resp_email: action.payload };

    case FormActions.setCategory:
      return { ...state, category: action.payload };

    case FormActions.setCourse_Id:
      return { ...state, course_id: action.payload };

    case FormActions.setPlan_Id:
      return { ...state, plan_id: action.payload };

    case FormActions.setUnit_Id:
      return { ...state, unit_id: action.payload };

    case FormActions.setUnitName:
      return { ...state, unitName: action.payload };

    case FormActions.setPlanName:
      return { ...state, planName: action.payload };

    case FormActions.setClassName:
      return { ...state, className: action.payload };

    case FormActions.setAmount:
      return { ...state, amount: action.payload };

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
