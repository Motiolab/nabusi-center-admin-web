import api from '@/entities/api'

export const createReservation = (createReservation: ICreateReservationAdminRequestV1) => {
    return api.post<boolean>(`/v1/admin/reservation/create/${createReservation.centerId}`, createReservation);
}

export const getReservationListByWellnessLectureId = (centerId: number, wellnessLectureId: number) => {
    return api.get<IGetReservationListByWellnessLectureIdAdminResponseV1[]>(`/v1/admin/reservation/list/${centerId}?wellnessLectureId=${wellnessLectureId}`)
}