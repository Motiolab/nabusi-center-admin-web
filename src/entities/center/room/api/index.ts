import api from '@/entities/api'

export const getRoomListByCenterId = (centerId: number) => {
    return api.get<ICenterRoom[]>(`/v1/admin/center/room/list/${centerId}`)
}

export const createCenterRoomByCenterId = (centerId: number, centerRoomName: string) => {
    return api.post<boolean>(`/v1/admin/center/room/${centerId}`, {
        centerRoomName: centerRoomName,
    });
}