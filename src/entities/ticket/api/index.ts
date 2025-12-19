import { AxiosResponse } from 'axios';
import api from '@/entities/api'

export const getTicketExtendListByTicketProductId = (ticketProductId: number, centerId: number): Promise<AxiosResponse<any>> => {
    return api.get(`/nabusi-server/company-management-service/v1/admin/ticket/extend/${centerId}?ticketProductId=${ticketProductId}`);
}
export const ticketExtendByProductId = (requestBody: ITicketExtend, centerId: number): Promise<AxiosResponse<any>> => {
    return api.post(`/nabusi-server/company-management-service/v1/admin/ticket/extend/${centerId}`, requestBody);
}