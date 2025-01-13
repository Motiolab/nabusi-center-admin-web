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
    isDelete: boolean
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
    useNickName: boolean
    isDelete: boolean
}
interface IUpdateTeacherIntroduceAndNickNameByIdAdminRequestV1 {
    id: number
    useNickName: boolean
    nickName: string
    introduce: string
    centerId: number
}

interface IUpdateTeacherCareerByIdAdminRequestV1 {
    id: number
    career: string
    centerId: number
}