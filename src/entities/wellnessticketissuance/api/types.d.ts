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