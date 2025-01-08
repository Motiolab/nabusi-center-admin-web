import { AxiosResponse } from 'axios';
import api from '@/entities/api'

export const getInviteAdminMemberToMe = (code: string) => {
    return api.get<IGetInvitationAdminByCodeResponseV1>(`/v1/admin/invite/admin-member/to-me/${code}`);
}

export const acceptInviteAdminMember = (invitationAdminMemberId: number) => {
    return api.patch<Boolean>(`/v1/admin/invite/admin-member/accept/${invitationAdminMemberId}`);
}

