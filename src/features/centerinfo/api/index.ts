import { AxiosResponse } from 'axios';
import api from '@/entities/api'

const getCenterInfo = (centerId: number): Promise<AxiosResponse<ICenterInfoJoinAll>> => {
    return api.get(`/v1/admin/center/info/${centerId}`)
}

const updateCenterInfo = (centerId: number, request: ICenterInfoJoinAll): Promise<AxiosResponse<boolean>> => {
    return api.put(`/v1/admin/center/info/${centerId}`, request)
}
export { getCenterInfo, updateCenterInfo };