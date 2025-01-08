import api from '@/entities/api'

export const adminLoginSuccess = () => {
    return api.get(`/v1/admin/login/success`);
}
export const checkUserIdAvailable = (userId: string) => {
    return api.get<any>(`/api/v1/auth/check-userId?userId=${userId}`);
}

export const createAccountSecurityServer = (params: ICreateAccountSecurityServer) => {
    return api.post<IToken>(`/api/v1/auth/signup`, params);
}

export const login = (userId: string, password: string) => {
    return api.post(`/api/v1/auth/login`, { userId, password });
}

export const checkChangePasswordCode = (code: string) => {
    return api.get(`/api/v1/check/change-password-code/${code}`);
}

export const requestChangePassword = (params: IChangePasswordRequest) => {
    return api.post(`/api/v1/change/change-password`, params);
}

export const logout = () => {
    return api.post(`/logout`).then(() => window.location.href = '/login');
}