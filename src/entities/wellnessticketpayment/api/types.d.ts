interface ICreateWellnessTicketPaymentUnpaidAdminRequestV1 {
    centerId: number
    totalPayValue: number
    unpaidValue: number
    cardInstallment: number
    cardPayValue: number
    cashPayValue: number
    payerMemberId: number
    note: string
    wellnessTicketIssuanceId: number
}