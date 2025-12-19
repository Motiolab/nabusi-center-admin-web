import { AxiosResponse } from 'axios';
import api from '@/entities/api'


export const createCenterNoticeByCenterId = (createCenterNoticeByCenterIdAdminRequestV1: ICreateCenterNoticeByCenterIdAdminRequestV1) => {
    return api.post<boolean>(`/v1/admin/center/notice/${createCenterNoticeByCenterIdAdminRequestV1.centerId}`, createCenterNoticeByCenterIdAdminRequestV1)
}

export const getCenterNoticeListByCenterId = (centerId: number) => {
    return api.get<IGetCenterNoticeListByCenterIdAdminResponseV1[]>(`/v1/admin/center/notice/list/${centerId}`)
}

export const getCenterNoticeDetailById = (centerId: number, id: number) => {
    return api.get<IGetCenterNoticeDetailByIdAdminResponseV1>(`/v1/admin/center/notice/detail/${centerId}?id=${id}`)
}

export const updateCenterNoticeById = (updateCenterNoticeByIdAdminRequestV1: IUpdateCenterNoticeByIdAdminRequestV1) => {
    return api.put<boolean>(`/v1/admin/center/notice/update/${updateCenterNoticeByIdAdminRequestV1.centerId}`, updateCenterNoticeByIdAdminRequestV1)
}




export const registerNotice = (requestBody: INotice, centerId: number): Promise<AxiosResponse<any>> => {
    return api.post(`/nabusi-server/company-management-service/v1/admin/notice/${centerId}`, requestBody);
}
export const editNotice = (requestBody: INotice, centerId: number): Promise<AxiosResponse<any>> => {
    return api.patch(`/nabusi-server/company-management-service/v1/admin/notice/${centerId}`, requestBody);
}
export const getNotice = (id: string, centerId: number): Promise<AxiosResponse<INotice>> => {
    return api.get(`/nabusi-server/company-management-service/v1/admin/notice/${centerId}?id=${id}`);
}
export const deleteNotice = (id: string, centerId: number): Promise<AxiosResponse<any>> => {
    return api.delete(`/nabusi-server/company-management-service/v1/admin/notice/${centerId}?id=${id}`,);
}
export const getNoticeList = (centerId: number): Promise<AxiosResponse<INotice[]>> => {
    return api.get(`/nabusi-server/company-management-service/v1/admin/notice_list/${centerId}`);
}