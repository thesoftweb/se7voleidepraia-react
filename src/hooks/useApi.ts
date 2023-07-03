import axios from 'axios';

const api = axios.create({
    baseURL: 'https://app.se7voleidepraia.com.br/api'
});

export const useApi = () => ({
    validateToken: async (token: string) => {

        const response = await api.post('/secret', { token });
        return response.data;
    },
    signin: async (cpf: string, password: string) => {
        const response = await api.post('/auth/login/teachers', { username: cpf, password });
        return response.data;
    },
    logout: async () => {
        return { status: true };
    }
});

export const useForm = () => ({
    categoria: async () => {
        const response = await api.get('/courses');
        return response.data;

    }

})

