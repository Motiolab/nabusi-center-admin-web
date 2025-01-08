import { AxiosResponse } from 'axios';
import api from '@/entities/api'

export const registerTicketProduct = (requestBody: any, centerId: number): Promise<AxiosResponse<any>> => {
    return api.post(`/samata-server/company-management-service/v1/admin/ticket/${centerId}`, requestBody);
}
export const getTicketProductListByCenterId = (centerId: number): Promise<AxiosResponse<any>> => {
    return api.get(`/samata-server/company-management-service/v1/admin/all_ticket_list_view/${centerId}?centerId=${centerId}`);
}
export const getTicketProductById = (id: string, centerId: number): Promise<AxiosResponse<any>> => {
    return api.get(`/samata-server/company-management-service/v1/admin/ticket_detail_view/edit/${centerId}?id=${id}`);
}
export const editTicketProduct = (requestBody: any, centerId: number): Promise<AxiosResponse<any>> => {
    return api.patch(`/samata-server/company-management-service/v1/admin/ticket/${centerId}`, requestBody);
}
export const getTicketProductForDetailById = (id: string, centerId: number): Promise<AxiosResponse<ITicketAndMemberForDetail>> => {
    return api.get(`/samata-server/company-management-service/v1/admin/ticket_detail_view/detail/${centerId}?id=${id}`);
}
export const editIsSalesTicketProduct = (requestBody: any, centerId: number): Promise<AxiosResponse<any>> => {
    return api.patch(`/samata-server/company-management-service/v1/admin/ticket/sales/${centerId}`, requestBody);
}