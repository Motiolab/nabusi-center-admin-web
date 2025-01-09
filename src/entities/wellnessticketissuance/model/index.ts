import { useMutation, useQuery } from "@tanstack/react-query";
import { createWellnessTicketIssuance, getWellnessTicketIssuanceListByWellnessTicketId } from "../api";

export const useMutationCreateWellnessTicketIssuance = (callback: Function) => {
    const mutation = useMutation({
        mutationFn: createWellnessTicketIssuance,
        onSuccess: (res) => { res.data && callback(res) }
    })
    return mutation;
}

export const useQueryGetWellnessTicketIssuanceListByWellnessTicketId = (centerId: number, wellnessTicketIdList: number) => {
    const query = useQuery({
        queryKey: ['getWellnessTicketIssuanceListByWellnessTicketId', centerId, wellnessTicketIdList],
        queryFn: () => getWellnessTicketIssuanceListByWellnessTicketId(centerId, wellnessTicketIdList),
        select: (res) => res.data,
        staleTime: 1000 * 60 * 5,
    });
    return query;
}; 