import { AxiosResponse } from 'axios';
import api from '@/entities/api'

export const inviteAdminMemberByCenterId = (centerId: number, params: IInviteAdminMemberRequestV1) => {
    return api.post<boolean>(`/v1/admin/invite/admin-member/${centerId}`, params);
}
