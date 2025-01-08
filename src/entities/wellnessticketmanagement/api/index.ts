import api from '@/entities/api'

export const getWellnessTicketManagementNameListByCenterId = (centerId: number) => {
    return api.get<IGetWellnessTicketManagementNameByCenterIdAdminResponseV1[]>(`/v1/admin/wellness-ticket-management/name/${centerId}`)
}