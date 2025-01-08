import { AxiosResponse } from 'axios';
import api from '@/entities/api'

export const requestCenterDataLink = (requestBody: IRequestCenterDataLink, centerId: number): Promise<AxiosResponse<any>> => {
    return api.post(`/samata-server/company-management-service/v1/admin/center/center-data-link/request/${centerId}`, requestBody);
}