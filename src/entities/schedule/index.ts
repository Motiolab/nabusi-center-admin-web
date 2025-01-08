import { AxiosResponse } from 'axios';
import api from '@/entities/api'

export const getScheduleByCenterId = (centerId: number): Promise<AxiosResponse<boolean>> => {
    return api.get(`/v1/admin/schedule/${centerId}`);
}