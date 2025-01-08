import { AxiosResponse } from 'axios';
import api from '@/entities/api'

export const getCenterDataLinkListForResponseTableById = (id: number | string): Promise<AxiosResponse<IRequestLinkCenterEnum[]>> => {
    return api.get(`/samata-server/company-management-service/v1/admin/center/center/data-link/response/${id}`);
}