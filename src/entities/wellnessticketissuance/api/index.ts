import api from '@/entities/api'

export const createWellnessTicketIssuance = (createWellnessTicketExtensionAdminRequestV1: ICreateWellnessTicketIssuanceAdminRequestV1) => {
    return api.post<boolean>(`/v1/admin/wellness-ticket-issuance/${createWellnessTicketExtensionAdminRequestV1.centerId}`, createWellnessTicketExtensionAdminRequestV1);
}
