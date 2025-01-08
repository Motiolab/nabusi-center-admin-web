interface IGetWellnessClassNameByCenterIdAdminResponseV1 {
    id: number
    name: string
    teacherName: string
}

interface IGetWellnessClassDetailAdminResponseV1 {
    id: number
    name: string
    description: string
    centerId: number
    maxReservationCnt: number
    registerId: number
    room: string
    classImageUrl: string
    teacherId: number
    wellnessClassProgramId: number
    wellnessTicketManagementIdList: number[]
}