import { LOCAL_STORAGE_KEY } from "@/entities/selectedCenterId/model/reducer";

const LOCAL_STORAGE_ACCESS_TOKEN_KEY = 'X-Nabusi-Admin-Or-App-Member-Json-String';

export const setLocalAccessToken = (accessToken: string) => {
    localStorage.setItem(LOCAL_STORAGE_ACCESS_TOKEN_KEY, accessToken);
};

export const removeLocalAccessToken = () => {
    localStorage.removeItem(LOCAL_STORAGE_ACCESS_TOKEN_KEY);
};

export const getLocalAccessToken = () => {
    const accessToken = localStorage.getItem(LOCAL_STORAGE_ACCESS_TOKEN_KEY);
    if (accessToken === 'undefined' || !accessToken) return null;
    return accessToken;
};

export const updateLocalAccessToken = (newAccessToken: string) => {
    (!newAccessToken || newAccessToken === '') && localStorage.setItem(LOCAL_STORAGE_KEY, "0")
    const accessToken = localStorage.getItem(LOCAL_STORAGE_ACCESS_TOKEN_KEY);
    if (accessToken === 'undefined' || !accessToken) return setLocalAccessToken(newAccessToken);
    localStorage.setItem(LOCAL_STORAGE_ACCESS_TOKEN_KEY, newAccessToken);

};

export { LOCAL_STORAGE_ACCESS_TOKEN_KEY }