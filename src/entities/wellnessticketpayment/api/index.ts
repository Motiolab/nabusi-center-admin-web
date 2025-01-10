import api from '@/entities/api'

export const createWellnessTicketPaymentUnpaid = (createWellnessTicketPaymentUnpaidAdminRequestV1: ICreateWellnessTicketPaymentUnpaidAdminRequestV1) => {
    return api.post<boolean>(`/v1/admin/wellness-ticket-payment/unpaid/${createWellnessTicketPaymentUnpaidAdminRequestV1.centerId}`, createWellnessTicketPaymentUnpaidAdminRequestV1);
}