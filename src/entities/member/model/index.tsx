import { useMutation, useQuery } from "@tanstack/react-query";
import { createMemberMemo, getAllMemberListByCenterId, getMemberDetailById } from "..";

export const useQueryGetAllMemberListByCenterId = (centerId: number) => {
    const query = useQuery({
        queryKey: ['getAllMemberListByCenterId', centerId],
        queryFn: () => getAllMemberListByCenterId(centerId),
        select: (res) => res.data,
        staleTime: 1000 * 60 * 5,
    });
    return query;
}

export const useQueryGetMemberDetailById = (centerId: number, memberId: number) => {
    const query = useQuery({
        queryKey: ['getMemberDetailById', centerId, memberId],
        queryFn: () => getMemberDetailById(centerId, memberId),
        select: (res) => res.data,
        staleTime: 1000 * 60 * 5,
    });
    return query;
}

export const useMutationCreateMemberMemo = (callback: Function) => {
    const mutation = useMutation({
        mutationFn: ({ centerId, createMemberMemoAdminRequestV1 }: { centerId: number, createMemberMemoAdminRequestV1: ICreateMemberMemoAdminRequestV1 }) => createMemberMemo(centerId, createMemberMemoAdminRequestV1),
        onSuccess: (res) => res.data && callback(res),
        onError: (error: any) => {
            alert("메모 생성을 실패했습니다." + error.response.data)
        }
    })
    return mutation;
}