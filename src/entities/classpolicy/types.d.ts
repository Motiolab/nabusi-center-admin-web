interface IGetPolicyClassByCenterIdAdminResponseV1 {
    id: number
    centerId: number
    reservationStart: number
    reservationEnd: number
    reservationCancelLimit: number
    autoReserveBeforeClassTime: number
    autoAbsentLimit: number
    isActiveAutoReservation: boolean
}