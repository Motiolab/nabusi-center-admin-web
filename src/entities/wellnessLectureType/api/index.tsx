import api from '@/entities/api'

export const getWellnessLectureTypeNameListByCenterId = (centerId: number) => {
    return api.get<IGetWellnessLectureTypeNameListByCenterIdAdminResponseV1[]>(`/v1/admin/wellness-lecture-type/name/${centerId}`);
}

export const createWellnessLectureTypeByCenterId = (centerId: number, name: string, description: string) => {
    return api.post<boolean>(`/v1/admin/wellness-lecture-type/${centerId}`, { name, description });
}