interface ICreateWellnessTicketExtensionAdminRequestV1 {
    centerId: number
    extendDate: number
    isApplyAfter: boolean
    reason: string
    targetDate: string
    wellnessTicketId: number
}

interface IGetWellnessTicketExtensionListByWellnessTicketIdAdminResponseV1 {
    registerName: string
    targetDate: string
    extendDate: number
    reason: string
    createDateTime: string
}