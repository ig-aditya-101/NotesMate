import axios from "axios";

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

axiosInstance.interceptors.request.use(
    (req) => {
        const token = localStorage.getItem('NOTESMATE_TOKEN') || null;
        if (token) {
            req.headers.Authorization = `Bearer ${token}`
        }
        return req;
    }
)

axiosInstance.interceptors.response.use(
    (res) => {
        return res;
    },
    (error) => {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem('NOTESMATE_TOKEN')
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
)
export default axiosInstance;