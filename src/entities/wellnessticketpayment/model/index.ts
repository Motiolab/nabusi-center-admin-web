import { useMutation } from "@tanstack/react-query";
import { createWellnessTicketPaymentUnpaid } from "../api";

export const useMutationCreateWellnessTicketPaymentUnpaid = (callback: Function) => {
    const mutation = useMutation({
        mutationFn: createWellnessTicketPaymentUnpaid,
        onSuccess: (res) => { res.data && callback(res) }
    })
    return mutation;
}
