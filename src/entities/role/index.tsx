import api from '@/entities/api'

export const getRoleAndUrlPatternByCenterId = (centerId: number) => {
    return api.get<IGetRoleAndUrlPatternResponseV1[]>(`/v1/admin/role/url-pattern/${centerId}`);
};

export const updateRoleUrlPatternActionByCenterId = (centerId: number, params: IUpdateUrlPatternAction) => {
    return api.patch<IGetRoleAndUrlPatternResponseV1[]>(`/v1/admin/role/url-pattern/action/${centerId}`, params);
}

export const updateInitRoleUrlPatternActionByCenterId = (centerId: number) => {
    return api.patch<IGetRoleAndUrlPatternResponseV1[]>(`/v1/admin/role/url-pattern/init-action/${centerId}`);
}

export const createRoleUrlPatternByCenterId = (centerId: number, newRoleName: string) => {
    return api.post<IGetRoleAndUrlPatternResponseV1[]>(`/v1/admin/role/url-pattern/${centerId}`, { roleName: newRoleName });
}

export const deleteRoleUrlPatternByCenterIdAndRoleId = (centerId: number, roleId: number) => {
    return api.delete<IGetRoleAndUrlPatternResponseV1[]>(`/v1/admin/role/url-pattern/${centerId}/${roleId}`);
}

export const getRoleInfoListByCenterId = (centerId: number) => {
    return api.get<IGetRoleInfoByCenterIdResponseV1[]>(`/v1/admin/role/info/${centerId}`);
}