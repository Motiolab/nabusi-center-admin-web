interface ICreateWellnessLectureListWithWellnessClassAdminRequestV1 {
    wellnessClassId: number
    name: string
    description: string
    centerId: number
    maxReservationCnt: number
    centerRoomId: number
    classImageUrlList: string[]
    price: number
    teacherId: number
    wellnessLectureTypeId: number
    startDateTime: Dayjs
    endDateTime: Dayjs
    timeRangeWithDays: Array<ITimeRangeWithDays>
    wellnessTicketManagementIdList: Array<number>
}

interface ITimeRangeWithDays {
    startTime: string, endTime: string, dayOfWeek: string
}

interface IGetWellnessLectureAdminResponseV1 {
    id: number
    name: string
    maxReservationCnt: number
    room: string
    teacherId: number
    teacherName: string
    wellnessLectureTypeId: number
    wellnessLectureTypeName: string
    wellnessLectureTypeDescription: string
    startDateTime: string
    endDateTime: string
    isDelete: boolean
}

interface IGetWellnessLectureDetailAdminResponseV1 {
    id: number
    name: string
    description: string
    centerId: number
    maxReservationCnt: number
    room: string
    lectureImageUrlList: string[]
    price:number
    teacherId: number
    teacherName: string
    wellnessLectureTypeId: number
    wellnessLectureTypeName: string
    wellnessLectureTypeDescription: string
    startDateTime: string
    endDateTime: string
    isDelete: boolean
    wellnessTicketAvailableList: IWellnessTicketAvailable[];
}

interface IWellnessTicketAvailable {
    wellnessTicketManagementId: number
    wellnessTicketIssuanceName: string
    wellnessTicketId: number
    type: string
    backgroundColor: string
    textColor: string
    isDelete: boolean
}

interface IUpdateWellnessLectureAdminRequestV1 {
    id: number
    name: string
    description: string
    centerId: number
    maxReservationCnt: number
    room: string
    lectureImageUrlList: string[];
    teacherId: number
    wellnessLectureTypeId: number
    startDateTime: Dayjs
    endDateTime: Dayjs
    wellnessTicketManagementIdList: Array<number>
    price: number
}