import { AxiosResponse } from 'axios';
import api from '@/entities/api'

export const createCenter = (params: ICreateCenter): Promise<AxiosResponse<boolean>> => {
    return api.post(`/v1/admin/center/my-center`, params);
}

export const updateRoleFunction = (centerId: number, params: Array<IUpdateRoleFunctionRequest>): Promise<AxiosResponse<any>> => {
    return api.patch(`/samata-server/company-management-service/v1/admin/role_function/${centerId}`, params);
}
