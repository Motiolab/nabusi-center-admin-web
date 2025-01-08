import api from '@/entities/api'

export const createWellnessLectureListWithWellnessClass = (createWellnessLectureListWithWellnessClassAdminRequest: ICreateWellnessLectureListWithWellnessClassAdminRequestV1) => {
    return api.post<boolean>(`/v1/admin/wellness-lecture/list/${createWellnessLectureListWithWellnessClassAdminRequest.centerId}`, createWellnessLectureListWithWellnessClassAdminRequest);
}

export const getWellnessLectureListByStartDate = (centerId: number, startDate: string) => {
    return api.get<IGetWellnessLectureAdminResponseV1[]>(`/v1/admin/wellness-lecture/list/${centerId}?startDate=${encodeURIComponent(startDate)}`)
}

export const getWellnessLectureDetailById = (centerId: number, id: number) => {
    return api.get<IGetWellnessLectureDetailAdminResponseV1>(`/v1/admin/wellness-lecture/detail/${centerId}?id=${id}`)
}

export const deleteWellnessLectureById = (centerId: number, id: number, isSendNoti: boolean) => {
    return api.delete<boolean>(`/v1/admin/wellness-lecture/${centerId}?id=${id}&isSendNoti=${isSendNoti}`);
}

export const restoreWellnessLectureById = (centerId: number, id: number) => {
    return api.patch<boolean>(`/v1/admin/wellness-lecture/restore/${centerId}?id=${id}`);
}

export const updateWellnessLecture = (updateWellnessLectureAdminRequestV1: IUpdateWellnessLectureAdminRequestV1) => {
    return api.put<boolean>(`/v1/admin/wellness-lecture/${updateWellnessLectureAdminRequestV1.centerId}`, updateWellnessLectureAdminRequestV1);
}
