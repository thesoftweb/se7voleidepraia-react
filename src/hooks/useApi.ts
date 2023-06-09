import axios from 'axios';

const api = axios.create({
    baseURL: 'http://app.se7voleidepraia.com.br/api'
});

export const useApi = () => ({
    validateToken: async (token: string) => {
        return {
            user: { id: 3, name: 'José', email: 'jose@gmail.com' }
        };
        const response = await api.post('/validate', { token });
        return response.data;
    },
    signin: async (cpf: string, password: string) => {

        const response = await api.post('/auth/teachers', { cpf, password });

        return response.data;
        return {
            user: { id: 3, name: 'José', email: 'jose@gmail.com' },
            token: '123456789'
        };
    },
    logout: async () => {
        return { status: true };
        const response = await api.post('/logout');
        return response.data;
    }
});

