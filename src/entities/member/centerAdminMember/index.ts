
import api from '@/entities/api'

export const deleteAdminRoleByMemberIdList = (centerId: number, memberIdList: Array<number>) => {
    return api.delete<boolean>(`/v1/admin/member/role/${centerId}`, { headers: { 'Content-Type': 'application/json' }, data: memberIdList });
}