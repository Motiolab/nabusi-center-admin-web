interface ICreateCenterNoticeByCenterIdAdminRequestV1 {
    centerId: number
    title: string
    content: string
    isPopup: boolean
    isDelete: boolean
}
interface IGetCenterNoticeListByCenterIdAdminResponseV1 {
    id: number
    title: string
    content: string
    isPopup: boolean
    createdDate: string
    registerId: number
    registerName: string
    isDelete: boolean
}
interface IGetCenterNoticeDetailByIdAdminResponseV1 {
    id: number
    title: string
    content: string
    isPopup: boolean
    createdDate: string
    isDelete: boolean
}
interface IUpdateCenterNoticeByIdAdminRequestV1 {
    id: number
    centerId: number
    title: string
    content: string
    isPopup: boolean
    isDelete: boolean
}