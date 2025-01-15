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

export const updateTeacherIntroduceAndNickNameById = (updateTeacherIntroduceAndNickNameByIdAdminRequestV1: IUpdateTeacherIntroduceAndNickNameByIdAdminRequestV1) => {
    return api.patch<boolean>(`/v1/admin/teacher/update/introduce/${updateTeacherIntroduceAndNickNameByIdAdminRequestV1.centerId}`, updateTeacherIntroduceAndNickNameByIdAdminRequestV1)
}

export const updateTeacherCareerById = (updateTeacherIntroduceAndNickNameByIdAdminRequestV1: IUpdateTeacherCareerByIdAdminRequestV1) => {
    return api.patch<boolean>(`/v1/admin/teacher/update/career/${updateTeacherIntroduceAndNickNameByIdAdminRequestV1.centerId}`, updateTeacherIntroduceAndNickNameByIdAdminRequestV1)
}

export const deleteTeacherById = (centerId: number, id: number) => {
    return api.delete<boolean>(`/v1/admin/teacher/delete/${centerId}?id=${id}`)
}

export const restoreTeacherById = (centerId: number, id: number) => {
    return api.patch<boolean>(`/v1/admin/teacher/restore/${centerId}?id=${id}`)
}

export const updateTeacherImageUrlById = (updateTeacherImageUrlByIdAdminRequestV1: IUpdateTeacherImageUrlByIdAdminRequestV1) => {
    return api.patch<boolean>(`/v1/admin/teacher/update/image/${updateTeacherImageUrlByIdAdminRequestV1.centerId}`, updateTeacherImageUrlByIdAdminRequestV1)
}
