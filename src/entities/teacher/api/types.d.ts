interface IGetTeacherNameListAdminResponseV1 {
    id: number
    name: string
}

interface IGetTeacherListByCenterIdAdminResponseV1 {
    id: number
    name: string
    nickName: string
    mobile: string
    lectureCnt: number
    createdDate: string
}
interface IGetTeacherDetailById {
    id: number
    name: string
    nickName: string
    mobile: string
    email: string
    introduce: string
    career: string
    createdDate: string
}