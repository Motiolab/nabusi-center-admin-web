import api from '@/entities/api'

export const createWellnessTicketExtension = (createWellnessTicketExtensionAdminRequestV1: ICreateWellnessTicketExtensionAdminRequestV1) => {
    return api.post<boolean>(`/v1/admin/wellness-ticket-extension/${createWellnessTicketExtensionAdminRequestV1.centerId}`, createWellnessTicketExtensionAdminRequestV1);
}

export const getWellnessTicketExtensionListByWellnessTicketId = (centerId: number, wellnessTicketId: number) => {
    return api.get<IGetWellnessTicketExtensionListByWellnessTicketIdAdminResponseV1[]>(`/v1/admin/wellness-ticket-extension/${centerId}?wellnessTicketId=${wellnessTicketId}`);
}
