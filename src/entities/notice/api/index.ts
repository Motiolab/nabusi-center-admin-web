import { AxiosResponse } from 'axios';
import api from '@/entities/api'

export const registerNotice = (requestBody: INotice, centerId: number): Promise<AxiosResponse<any>> => {
    return api.post(`/samata-server/company-management-service/v1/admin/notice/${centerId}`, requestBody);
}
export const editNotice = (requestBody: INotice, centerId: number): Promise<AxiosResponse<any>> => {
    return api.patch(`/samata-server/company-management-service/v1/admin/notice/${centerId}`, requestBody);
}
export const getNotice = (id: string, centerId: number): Promise<AxiosResponse<INotice>> => {
    return api.get(`/samata-server/company-management-service/v1/admin/notice/${centerId}?id=${id}`);
}
export const deleteNotice = (id: string, centerId: number): Promise<AxiosResponse<any>> => {
    return api.delete(`/samata-server/company-management-service/v1/admin/notice/${centerId}?id=${id}`,);
}
export const getNoticeList = (centerId: number): Promise<AxiosResponse<INotice[]>> => {
    return api.get(`/samata-server/company-management-service/v1/admin/notice_list/${centerId}`);
}