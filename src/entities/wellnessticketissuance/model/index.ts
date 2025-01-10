import { useMutation, useQuery } from "@tanstack/react-query";
import { createWellnessTicketIssuance, getWellnessTicketIssuanceListByWellnessTicketId, getWellnessTicketIssuanceUpdateDetailById, updateWellnessTicketIssuance } from "../api";

export const useMutationCreateWellnessTicketIssuance = (callback: Function) => {
    const mutation = useMutation({
        mutationFn: createWellnessTicketIssuance,
        onSuccess: (res) => { res.data && callback(res) }
    })
    return mutation;
}

export const useQueryGetWellnessTicketIssuanceListByWellnessTicketId = (centerId: number, wellnessTicketId: number) => {
    const query = useQuery({
        queryKey: ['getWellnessTicketIssuanceListByWellnessTicketId', centerId, wellnessTicketId],
        queryFn: () => getWellnessTicketIssuanceListByWellnessTicketId(centerId, wellnessTicketId),
        select: (res) => res.data,
        staleTime: 1000 * 60 * 5,
    });
    return query;
};

export const useQueryGetWellnessTicketIssuanceUpdateDetailById = (centerId: number, wellnessTicketIssuanceId: number) => {
    const query = useQuery({
        queryKey: ['getWellnessTicketIssuanceUpdateDetailById', centerId, wellnessTicketIssuanceId],
        queryFn: () => getWellnessTicketIssuanceUpdateDetailById(centerId, wellnessTicketIssuanceId),
        select: (res) => res.data,
        staleTime: 1000 * 60 * 5,
    });
    return query;
};

export const useMutationUpdateWellnessTicketIssuance = (callback: Function) => {
    const mutation = useMutation({
        mutationFn: updateWellnessTicketIssuance,
        onSuccess: (res) => { res.data && callback(res) }
    })
    return mutation;
}
