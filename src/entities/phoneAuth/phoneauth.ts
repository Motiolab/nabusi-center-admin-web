import { AxiosResponse } from 'axios';
import api from '@/entities/api'
import { MobileAuthRequestCodeRequestV1, MobileAuthVerifyCodeRequestV1 } from './types';

export const requestMobileAuthCode = (requestV1: MobileAuthRequestCodeRequestV1): Promise<AxiosResponse<any>> => {
    return api.post(`/samata-server/notification-service/notification/v1/mobile/auth-request-code`, requestV1);
}

export const verifyMobileAuthCode = (requestV1: MobileAuthVerifyCodeRequestV1): Promise<AxiosResponse<any>> => {
    return api.patch(`/samata-server/notification-service/notification/v1/mobile/auth-verify-code`, requestV1);
}

export const getUserIdAfterVerifyMobileAuthCode = (requestV1: MobileAuthVerifyCodeRequestV1): Promise<AxiosResponse<any>> => {
    return api.patch(`/samata-server/notification-service/notification/v1/mobile/auth-verify-code/find-account`, requestV1);
}


export const getChangePasswordIdAfterVerifyMobileAuthCode = (requestV1: MobileAuthVerifyCodeRequestV1): Promise<AxiosResponse<any>> => {
    return api.patch(`/samata-server/notification-service/notification/v1/mobile/auth-verify-code/find-password`, requestV1);
}
