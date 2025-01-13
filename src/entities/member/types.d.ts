interface ICreateAdminMember {
    userId: string;
    countryCode: string;
    mobile: String;
    isUseTerms: boolean;
    isPersonalInformation: boolean;
    isSms: boolean;
    isEmail: boolean;
    isAppPush: boolean;
}

interface IRegisterManager {
    adminName: string;
    birthDay: string;
    gender: "F" | "M" | "UNSELECTED" | "UNKNOWN";
    email: string;
    roleName: string;
}

interface IRequestPhoneAuthCodeToFindId {
    name: string;
    mobile: string
}

interface IRequestPhoneAuthCodeToFindPassword {
    userId: string;
    mobile: string
}

interface IGetMyCenterListByMemberIdResponseV1 {
    id: number
    address: string
    detailAddress: String
    name: string
    roleName: string
}

interface IAdminMemberByCenter {
    memberId: number
    name: string
    mobile: string
    email: string
    roleName: string
    roleId: number
}

interface IMemberByCenterToAddTeacher {
    memberId: number
    name: string
    mobile: string
    roleName: string
}

interface IGetAllMemberListByCenterIdAdminResponseV1 {
    id: number
    name: string
    mobile: string
    roleName: string
    wellnessTicketIssuanceList: IWellnessTicketIssuance[]
    memberMemoList: IMemberMemo[]
    createdDate: string
    socialName: string
}


interface IMemberMemo {
    id: number
    content: string
}

interface IGetMemberDetailByIdAdminResponseV1 {
    id: number
    name: string
    mobile: string
    birthDay: string
    age: string
    gender: string
    email: string
    roleName: string
    wellnessTicketIssuanceList: IWellnessTicketIssuance[]
    memberMemoList: IMemberMemo[]
    createdDate: string
}

interface IWellnessTicketIssuance {
    id: number
    name: string
    type: string
    backgroundColor: string
    textColor: string
    limitType: string
    limitCnt: number
    isDelete: boolean
    remainingCnt: number
    remainingDate: number
    totalUsableCnt: number
    startDate: string
    expireDate: string
    unpaidValue: number
}

interface IMemberMemo {
    id: number
    content: string
    registerName: string
    createdDate: string
}

interface ICreateMemberMemoAdminRequestV1 {
    content: string
    memberId: number
}