interface ICreateWellnessTicketAdminRequestV1 {
    centerId: number
    type: string
    name: string
    backgroundColor: string
    textColor: string
    price: number
    limitType: string
    limitCnt: number
    totalUsableCnt: number
    usableDate: number
    discountValue: number
    salesPrice: number
    wellnessClassIdList: number[]
}

interface IGetWellnessTicketAdminResponseV1 {
    id: number
    type: string
    name: string
    backgroundColor: string
    textColor: string
    limitType: string
    limitCnt: number
    totalUsableCnt: number
    usableDate: number
    salesPrice: number
    price: number
    isDelete: boolean
    createdDate: string
    discountValue: number
}

interface IGetWellnessTicketDetailAdminResponseV1 {
    id: number
    type: string
    name: string
    backgroundColor: string
    textColor: string
    price: number
    discountValue: number
    limitType: string
    limitCnt: number
    totalUsableCnt: number
    usableDate: number
    salesPrice: number
    isDelete: boolean
    createdDate: string
    wellnessClassNameList: IGetWellnessClassIdAndName[]
}

interface IGetWellnessClassIdAndName {
    id: number
    name: string
}

interface IUpdateWellnessTicketAdminRequestV1 {
    id: number
    centerId: number
    type: string
    name: string
    backgroundColor: string
    textColor: string
    price: number
    limitType: string
    limitCnt: number
    totalUsableCnt: number
    usableDate: number
    discountValue: number
    salesPrice: number
    wellnessClassIdList: number[]
}