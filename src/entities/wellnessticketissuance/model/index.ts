import { useMutation } from "@tanstack/react-query";
import { createWellnessTicketIssuance } from "../api";

export const useMutationCreateWellnessTicketIssuance = (callback: Function) => {
    const mutation = useMutation({
        mutationFn: createWellnessTicketIssuance,
        onSuccess: (res) => { res.data && callback(res) }
    })
    return mutation;
}