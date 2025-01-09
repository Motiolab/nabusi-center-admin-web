interface ICreateWellnessTicketIssuanceAdminRequestV1 {
    centerId: number
    startDate: string
    expireDate: string
    limitType: string
    limitCnt: number
    totalUsableCnt: number
    memberId: number
    wellnessTicketId: number
    paymentMethod: string
    discountRate: number
    totalPayValue: number
    unpaidValue: number
    cardInstallment: number
    cardPayValue: number
    cashPayValue: number
    payerMemberId: number
    note: string
}

interface IGetWellnessTicketIssuanceListByWellnessTicketIdAdminResponseV1 {
    id: number
    wellnessTicketIssuanceName: string
    memberName: string
    mobile: string
    remainingCnt: number
    remainingDate: number
    totalUsableCnt: number
    startDate: string
    expireDate: string
    isDelete: boolean
}