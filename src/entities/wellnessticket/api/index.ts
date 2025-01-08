import { AxiosResponse } from 'axios';
import api from '@/entities/api'

export const createWellnessTicket = (createWellnessTicketAdminRequestV1: ICreateWellnessTicketAdminRequestV1) => {
    return api.post<boolean>(`/v1/admin/wellness-ticket/${createWellnessTicketAdminRequestV1.centerId}`, createWellnessTicketAdminRequestV1);
}

export const getWellnessTicketList = (centerId: number) => {
    return api.get<IGetWellnessTicketAdminResponseV1[]>(`/v1/admin/wellness-ticket/${centerId}`);
}

export const getWellnessTicketDetailById = (centerId: number, id: number) => {
    return api.get<IGetWellnessTicketDetailAdminResponseV1>(`/v1/admin/wellness-ticket/detail/${centerId}?id=${id}`);
}

export const deleteWellnessTicketById = (centerId: number, id: number) => {
    return api.delete<boolean>(`/v1/admin/wellness-ticket/${centerId}?id=${id}`);
}

export const restoreWellnessTicketById = (centerId: number, id: number) => {
    return api.patch<boolean>(`/v1/admin/wellness-ticket/restore/${centerId}?id=${id}`);
}

export const updateWellnessTicket = (updateWellnessTicketAdminRequestV1: IUpdateWellnessTicketAdminRequestV1) => {
    return api.put<boolean>(`/v1/admin/wellness-ticket/${updateWellnessTicketAdminRequestV1.centerId}`, updateWellnessTicketAdminRequestV1);
}
