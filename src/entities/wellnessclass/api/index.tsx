import api from '@/entities/api'

export const getWellnessClassNameListByCenterId = (centerId: number) => {
    return api.get<IGetWellnessClassNameByCenterIdAdminResponseV1[]>(`/v1/admin/wellness-class/name/${centerId}`);
}

export const createWellnessClassByCenterId = (centerId: number, newClassName: string) => {
    return api.post<boolean>(`/v1/admin/wellness-class/${centerId}`, {
        wellnessClassName: newClassName,
    });
}

export const getWellnessClassDetailByCenterId = (centerId: number, id: number) => {
    return api.get<IGetWellnessClassDetailAdminResponseV1>(`/v1/admin/wellness-class/detail/${centerId}?id=${id}`);
}