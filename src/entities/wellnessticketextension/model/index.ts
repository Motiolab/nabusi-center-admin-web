import { useMutation, useQuery } from "@tanstack/react-query";
import { createWellnessTicketExtension, getWellnessTicketExtensionListByWellnessTicketId } from "../api";

export const useMutationCreateWellnessTicketExtension = (callback: Function) => {
    const mutation = useMutation({
        mutationFn: createWellnessTicketExtension,
        onSuccess: (res) => { res.data && callback(res) }
    })
    return mutation;
}

export const useQueryGetWellnessTicketExtensionListByWellnessTicketId = (centerId: number, wellnessTicketIdList: number) => {
    const query = useQuery({
        queryKey: ['getWellnessTicketExtensionListByWellnessTicketId', centerId, wellnessTicketIdList],
        queryFn: () => getWellnessTicketExtensionListByWellnessTicketId(centerId, wellnessTicketIdList),
        select: (res) => res.data,
        staleTime: 1000 * 60 * 5,
    });
    return query;
}; 