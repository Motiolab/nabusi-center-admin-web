import { AxiosResponse } from 'axios';
import api from '@/entities/api'

const getNotificationPolicyByCenterId = (async (centerId: number): Promise<AxiosResponse<INotificationPolicy>> => {
    return api.get(`/nabusi-server/company-management-service/v1/admin/policy/notification-policy/center/${centerId}`)
})

const patchOrCreateNotificationPolicy = (async (value: INotificationPolicy, centerId: number): Promise<AxiosResponse<boolean>> => {
    return api.patch(`/nabusi-server/company-management-service/v1/admin/policy/notification-policy/or/create/${centerId}`, value)
})


export { getNotificationPolicyByCenterId, patchOrCreateNotificationPolicy };