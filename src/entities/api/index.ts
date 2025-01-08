import axios from "axios";
import { getLocalAccessToken, setLocalAccessToken } from "../../shared/utils/token";
import { message } from "antd";

const instance = axios.create({
    baseURL: process.env.REACT_APP_DOMAIN_URL,
    headers: {
        "Content-Type": "application/json"
    },
    withCredentials: true
});

instance.interceptors.request.use(
    config => {
        const token = getLocalAccessToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    error => Promise.reject(error));

instance.interceptors.response.use(
    (res) => {
        const accessToken = res.headers.authorization;
        if (accessToken) {
            setLocalAccessToken(accessToken)
        }
        return res;
    },
    (err) => {
        if (!err.response) {
            console.error("response is not found.  err: ", err);
            return Promise.reject(err);
        }
        if (err.response?.status === 403) {
            const accessToken = err.response.headers.authorization;
            if (accessToken) {
                setLocalAccessToken(accessToken)
            }
            message.error(err.message)
        } else if (err.response?.status === 401) {
            window.location.href = "/login";
            message.error(err.message)
        }
        return Promise.reject(err);
    }
);
export default instance;