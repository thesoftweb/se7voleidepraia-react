import axios from "axios";

const request2 = axios.create({
    baseURL: "https://emilyfumo.com"
})

export const TurmaFake = [
    { aula: 'Seg-Qua-Sext', categoria: '15 As 17' },
    { aula: 'Ter-Qui-Sab', categoria: '15 As 17' },
    { aula: 'noite', categoria: 's15 As 17' },
    { aula: 'noite', categoria: 's15 As 17' },
    { aula: 'noite', categoria: 's15 As 17' },




];

export const TurmaApi = () => ({
    validateTurma: async () => {
        return {
            user: { aula: 'manhã', categoria: 'sub18' },
            user2: { aula: 'tarde', categoria: 'sub18' },
            user3: { aula: 'noite', categoria: 'sub18' }
        };
        const response = await request2.post('/validate', {});
        return response.data;
    }
});


