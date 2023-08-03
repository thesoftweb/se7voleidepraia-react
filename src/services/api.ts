import axios from "axios";

const api = axios.create({
    baseURL:import.meta.env.VITE_APP_API_URL
})

api.defaults.headers.common['X-APP-AUTHORIZATION']=import.meta.env.VITE_AUTHORIZATION
export default api;