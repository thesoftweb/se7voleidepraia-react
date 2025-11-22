import { useForm } from "../contexts/Form/FormContext";
import api from "../services/api";

export const useApi = () => ({
    validateToken: async (token: string) => {
        const response = await api.post('/secret', { token });
        return response.data;
    },
    signin: async (cpf: string, password: string) => {
        const response = await api.post('/auth/login/teachers', { username: cpf, password });
        // console.log('API');
        return response.data;
    },
    logout: async () => {
        return { status: true };
    }
});

export const useFormFunctions = () => { // Renomeie a função para evitar conflitos de nomes
    const { state } = useForm(); // Obtém o contexto usando o hook useForm
    const { course_id } = state; // Obtém o valor de course_id do contexto

    const categoria = async () => {
        try {
            const response = await api.get(`/plans?${course_id}=1`);
            return response.data;
        } catch (error) {
            // Lide com erros, se necessário
            console.error('Erro ao buscar planos:', error);
            throw error;
        }
    };

    return {
        categoria,
    };
};



