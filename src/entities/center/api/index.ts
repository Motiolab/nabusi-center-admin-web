import { AxiosResponse } from 'axios';
import api from '@/entities/api'

export const getCenterByCode = (code: string, centerId: number): Promise<AxiosResponse<ICheckLinkCenter>> => {
    return api.get(`/nabusi-server/company-management-service/v1/admin/center/center/info/code/${centerId}?code=${code}`);
}

