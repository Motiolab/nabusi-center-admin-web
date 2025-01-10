import api from '@/entities/api'

export const createWellnessTicketIssuance = (createWellnessTicketExtensionAdminRequestV1: ICreateWellnessTicketIssuanceAdminRequestV1) => {
    return api.post<boolean>(`/v1/admin/wellness-ticket-issuance/${createWellnessTicketExtensionAdminRequestV1.centerId}`, createWellnessTicketExtensionAdminRequestV1);
}

export const getWellnessTicketIssuanceListByWellnessTicketId = (centerId: number, wellnessTicketId: number) => {
    return api.get<IGetWellnessTicketIssuanceListByWellnessTicketIdAdminResponseV1[]>(`/v1/admin/wellness-ticket-issuance/list/wellness-ticket-id/${centerId}?wellnessTicketId=${wellnessTicketId}`);
}

export const getWellnessTicketIssuanceUpdateDetailById = (centerId: number, id: number) => {
    return api.get<IGetWellnessTicketIssuanceDetailByIdAdminResponseV1>(`/v1/admin/wellness-ticket-issuance/update/detail/${centerId}?id=${id}`);
}

export const updateWellnessTicketIssuance = (updateWellnessTicketIssuanceAdminRequestV1: IUpdateWellnessTicketIssuanceAdminRequestV1) => {
    return api.put<boolean>(`/v1/admin/wellness-ticket-issuance/update/${updateWellnessTicketIssuanceAdminRequestV1.centerId}`, updateWellnessTicketIssuanceAdminRequestV1);
}