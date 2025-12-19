import { AxiosResponse } from 'axios';
import api from '@/entities/api'

export const getCenterDataLinkListForRequestTableById = (id: number): Promise<AxiosResponse<ILinkCenterEnum[]>> => {
    return api.get(`/nabusi-server/company-management-service/v1/admin/center/center/data-link/request/${id}`);
}
export const patchCenterDataLink = (data: IPatchLinkCenter, centerId: number): Promise<AxiosResponse<boolean>> => {
    return api.patch(`/nabusi-server/company-management-service/v1/admin/center/center-data-link/request${centerId}`, data);
}