import { AxiosResponse } from 'axios';
import api from '@/entities/api'

export const deleteCenterDataLink = (id: number | string): Promise<AxiosResponse<boolean>> => {
    return api.delete(`/samata-server/company-management-service/v1/admin/center/center-data-link/${id}`);
}