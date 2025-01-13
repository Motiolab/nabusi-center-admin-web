interface ICreateReservationAdminRequestV1 {
    centerId: number
    memberId: number
    wellnessLectureId: number
    wellnessTicketIssuanceId: number | undefined
}
interface IGetReservationListByWellnessLectureIdAdminResponseV1 {
    reservationId: number
    memberId: number
    memberName: string
    memberMobile: string
    memberMemo: string
    wellnessTicketIssuanceName: string
    wellnessTicketIssuanceBackgroundColor: string
    wellnessTicketIssuanceType: string
    wellnessTicketIssuanceTextColor: string
    reservationStatus: string
    reservationCreatedDate: string
}