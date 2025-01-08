import { useMutation, useQuery } from "@tanstack/react-query";
import { createWellnessTicket, deleteWellnessTicketById, getWellnessTicketDetailById, getWellnessTicketList, restoreWellnessTicketById, updateWellnessTicket } from "../api";
import { useNavigate } from "react-router-dom";

export const useQueryGetWellnessTicketList = (centerId: number) => {
    const query = useQuery({
        queryKey: ['getWellnessTicketList', centerId],
        queryFn: () => getWellnessTicketList(centerId),
        select: (res) => res.data,
        staleTime: 1000 * 60 * 5,
    });
    return query;
};

export const useMutationCreateWellnessTicket = () => {
    const navigate = useNavigate();
    const mutation = useMutation({
        mutationFn: createWellnessTicket,
        onSuccess: (res) => { res.data && navigate(-1) }
    })
    return mutation;
}

export const useQueryGetWellnessTicketDetailById = (centerId: number, id: number) => {
    const query = useQuery({
        queryKey: ['getWellnessTicketDetailById', centerId, id],
        queryFn: () => getWellnessTicketDetailById(centerId, id),
        select: (res) => res.data,
        staleTime: 1000 * 60 * 5,
    });
    return query;
};

export const useMutationDeleteWellnessTicketById = (callback: Function) => {
    const mutation = useMutation({
        mutationFn: ({ centerId, id }: { centerId: number, id: number }) => deleteWellnessTicketById(centerId, id),
        onSuccess: (res) => res.data && callback(res),
        onError: (error: any) => {
            alert("삭제를 실패했습니다." + error.response.data)
        }
    })
    return mutation;
}

export const useMutationRestoreWellnessTicketById = (callback: Function) => {
    const mutation = useMutation({
        mutationFn: ({ centerId, id }: { centerId: number, id: number }) => restoreWellnessTicketById(centerId, id),
        onSuccess: (res) => res.data && callback(res),
        onError: (error: any) => {
            alert("복구를 실패했습니다." + error.response.data)
        }
    })
    return mutation;
}

export const useMutationUpdateWellnessTicket = (callback: Function) => {
    const navigate = useNavigate();
    const mutation = useMutation({
        mutationFn: updateWellnessTicket,
        onSuccess: (res) => res.data && callback(res),
        onError: (error: any) => {
            alert("수정을 실패했습니다." + error.response.data)
        }
    })
    return mutation;
}