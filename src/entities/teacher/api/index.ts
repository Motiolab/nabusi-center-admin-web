import api from '@/entities/api'

export const addTeacherByCenterId = (centerId: number, memberId: number) => {
    return api.post<boolean>(`/v1/admin/teacher/add/${centerId}?memberId=${memberId}`)
}

export const teacherNameListByCenterId = (centerId: number) => {
    return api.get<IGetTeacherNameListAdminResponseV1[]>(`/v1/admin/teacher/name/list/${centerId}`)
}

export const getTeacherListByCenterId = (centerId: number) => {
    return api.get<IGetTeacherListByCenterIdAdminResponseV1[]>(`/v1/admin/teacher/list/${centerId}`);
}

export const getTeacherDetailById = (centerId: number, id: number) => {
    return api.get<IGetTeacherDetailById>(`/v1/admin/teacher/detail/${centerId}?id=${id}`);
}

