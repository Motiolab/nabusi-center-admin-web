import { AxiosResponse } from 'axios';
import api from '@/entities/api'

export const passOwnerRole = (centerId: number, targetMemberId: number): Promise<AxiosResponse<any>> => {
    return api.patch(`/v1/admin/member/role/owner/pass/${centerId}`, targetMemberId);
}

export const updateMemberRole = (centerId: number, roleId: number, memberId: number) => {
    return api.patch<boolean>(`/v1/admin/member/role/${centerId}`, { memberId: memberId, roleId: roleId });
}