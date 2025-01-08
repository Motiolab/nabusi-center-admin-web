import { AxiosResponse } from 'axios';
import api from '@/entities/api'

export const getTicketExtendListByTicketProductId = (ticketProductId: number, centerId: number): Promise<AxiosResponse<any>> => {
    return api.get(`/samata-server/company-management-service/v1/admin/ticket/extend/${centerId}?ticketProductId=${ticketProductId}`);
}
export const ticketExtendByProductId = (requestBody: ITicketExtend, centerId: number): Promise<AxiosResponse<any>> => {
    return api.post(`/samata-server/company-management-service/v1/admin/ticket/extend/${centerId}`, requestBody);
}