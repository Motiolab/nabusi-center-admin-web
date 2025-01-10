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
    type: string
    unpaidValue: number
    limitType: string
    limitCnt: number
}

interface IGetWellnessTicketIssuanceDetailByIdAdminResponseV1 {
    id: number
    memberId: number
    memberName: string
    mobile: string
    ticketName: string
    startDate: string
    expireDate: string
    type: string
    backgroundColor: string
    remainingCnt: number
    totalUsableCnt: number
    limitType: string
    limitCnt: number
    unpaidValue: number
    isDelete: boolean
    wellnessTicketId: number
}

interface IUpdateWellnessTicketIssuanceAdminRequestV1 {
    id: number
    centerId: number
    name: string
    backgroundColor: string
    textColor: string
    type: string
    startDate: string
    expireDate: string
    remainingCnt: number
    limitType: string
    limitCnt: number
    isDelete: boolean
}