import { AxiosResponse } from 'axios';
import api from '@/entities/api'


const getPolicyClassByCenterId = (centerId: number) => {
    return api.get<IGetPolicyClassByCenterIdAdminResponseV1>(`/v1/admin/policy/class/${centerId}`)
}

const updatePolicyClassByCenterId = (centerId: number, value: IGetPolicyClassByCenterIdAdminResponseV1) => {
    return api.put<IGetPolicyClassByCenterIdAdminResponseV1>(`/v1/admin/policy/class/${centerId}`, value)
}

export { getPolicyClassByCenterId, updatePolicyClassByCenterId };