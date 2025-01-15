import { useMutation, useQuery } from "@tanstack/react-query";
import { createCenterNoticeByCenterId, getCenterNoticeDetailById, getCenterNoticeListByCenterId, updateCenterNoticeById } from "../api";

export const useMutationCreateCenterNoticeByCenterId = (callback: Function) => {
    const mutation = useMutation({
        mutationFn: createCenterNoticeByCenterId,
        onSuccess: (res) => { res.data && callback(res) }
    })
    return mutation;
}

export const useQueryGetCenterNoticeListByCenterId = (centerId: number) => {
    const query = useQuery({
        queryKey: ['getCenterNoticeListByCenterId', centerId],
        queryFn: () => getCenterNoticeListByCenterId(centerId),
        select: (res) => res.data,
        staleTime: 1000 * 60 * 5,
    });
    return query;
};

export const useQueryGetCenterNoticeDetailById = (centerId: number, centerNoticeId: number) => {
    const query = useQuery({
        queryKey: ['getCenterNoticeDetailById', centerId, centerNoticeId],
        queryFn: () => getCenterNoticeDetailById(centerId, centerNoticeId),
        select: (res) => res.data,
        staleTime: 1000,
    });
    return query;
};

export const useMutationUpdateCenterNoticeById = (callback: Function) => {
    const mutation = useMutation({
        mutationFn: updateCenterNoticeById,
        onSuccess: (res) => { res.data && callback(res) }
    })
    return mutation;
}
