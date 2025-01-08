import api from '@/entities/api'

export const addTeacherByCenterId = (centerId: number, memberId: number) => {
    return api.post<boolean>(`/v1/admin/teacher/add/${centerId}?memberId=${memberId}`)
}

export const teacherNameListByCenterId = (centerId: number) => {
    return api.get<IGetTeacherNameListAdminResponseV1[]>(`/v1/admin/teacher/name/list/${centerId}`)
}