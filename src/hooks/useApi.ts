import axios from 'axios';

const api = axios.create({
    baseURL: 'http://app.se7voleidepraia.com.br/apidada'
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
        return {
            user: { id: 3, name: 'José', email: 'jose@gmail.com' },
            token: '123456789'
        };
        const response = await api.post('/auth/teachers', { cpf, password });

        return response.data;
    },
    logout: async () => {
        return { status: true };
        const response = await api.post('/logout');
        return response.data;
    }
});

