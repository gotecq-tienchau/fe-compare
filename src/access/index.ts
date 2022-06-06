import axios from 'axios';
import { API_BASE_URL } from '../constant';

const axiosClient = axios.create({
    baseURL: API_BASE_URL,
    timeout: 1000 * 60 * 3,
});
axiosClient.interceptors.response.use(
    (res) => {
        return res.data;
    },
    (err) => {
        return Promise.reject(err);
    }
);

export { axiosClient };
