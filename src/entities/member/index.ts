import { AxiosResponse } from 'axios';
import api from '@/entities/api'

export const createMember = (params: ICreateAdminMember): Promise<AxiosResponse<any>> => {
    return api.post(`/nabusi-server/member-service/admin/member/v1/create/admin/member`, params);
}

export const registerAdminUser = (params: IRegisterManager): Promise<AxiosResponse<any>> => {
    return api.post(`/nabusi-server/member-service/admin/member/v1/create/user/info`, params);
}

export const isExistUserByMobile = (mobile: string): Promise<AxiosResponse<any>> => {
    return api.get(`/nabusi-server/member-service/admin/member/v1/check/user/mobile/${mobile}`);
}

export const requestPhoneAuthCodeToFindId = (params: IRequestPhoneAuthCodeToFindId): Promise<AxiosResponse<any>> => {
    return api.post(`/nabusi-server/member-service/admin/member/v1/request/code/findId`, params);
}

export const requestPhoneAuthCodeToFindPassword = (params: IRequestPhoneAuthCodeToFindPassword): Promise<AxiosResponse<any>> => {
    return api.post(`/nabusi-server/member-service/admin/member/v1/request/code/findPassword`, params);
}

export const getCenterListByAdminUser = (): Promise<AxiosResponse<Array<IGetMyCenterListByMemberIdResponseV1>>> => {
    return api.get('/v1/admin/center/my-center')
}

export const getAdminMemberListByCenterId = (centerId: number) => {
    return api.get<IAdminMemberByCenter[]>(`/v1/admin/member/admin/${centerId}`)
}

export const getAllMemberRoleCenterIdNotUser = (centerId: number) => {
    return api.get<number[]>(`/v1/admin/member/role/center-id/not-user/${centerId}`)
}

export const getMemberListToAddTeacherByCenterId = (centerId: number) => {
    return api.get<IMemberByCenterToAddTeacher[]>(`/v1/admin/member/list/add/teacher/${centerId}`)
}

export const getAllMemberListByCenterId = (centerId: number) => {
    return api.get<IGetAllMemberListByCenterIdAdminResponseV1[]>(`/v1/admin/member/all/${centerId}`)
}

export const getMemberDetailById = (centerId: number, memberId: number) => {
    return api.get<IGetMemberDetailByIdAdminResponseV1>(`/v1/admin/member/detail/${centerId}?id=${memberId}`)
}

export const createMemberMemo = (centerId: number, createMemberMemoAdminRequestV1: ICreateMemberMemoAdminRequestV1) => {
    return api.post<boolean>(`/v1/admin/member/memo/${centerId}`, createMemberMemoAdminRequestV1)
}