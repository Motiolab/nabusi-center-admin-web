import { useMutation, useQuery } from "@tanstack/react-query";
import { deleteTeacherById, getTeacherDetailById, getTeacherListByCenterId, restoreTeacherById, updateTeacherCareerById, updateTeacherIntroduceAndNickNameById } from "../api";

export const useQueryGetTeacherListByCenterId = (centerId: number) => {
    const query = useQuery({
        queryKey: ['getTeacherListByCenterId', centerId],
        queryFn: () => getTeacherListByCenterId(centerId),
        select: (res) => res.data,
        staleTime: 1000 * 60 * 5,
    });
    return query;
};


export const useQueryGetTeacherDetailById = (centerId: number, teacherId: number) => {
    const query = useQuery({
        queryKey: ['getTeacherDetailById', centerId, teacherId],
        queryFn: () => getTeacherDetailById(centerId, teacherId),
        select: (res) => res.data,
        staleTime: 1000 * 60 * 5,
    });
    return query;
};

export const useMutationUpdateTeacherIntroduceAndNickNameById = (callback: Function) => {
    const mutation = useMutation({
        mutationFn: updateTeacherIntroduceAndNickNameById,
        onSuccess: (res) => { res.data && callback(res) }
    })
    return mutation;
}

export const useMutationUpdateTeacherCareerById = (callback: Function) => {
    const mutation = useMutation({
        mutationFn: updateTeacherCareerById,
        onSuccess: (res) => { res.data && callback(res) }
    })
    return mutation;
}

export const useMutationDeleteTeacherById = (callback: Function) => {
    const mutation = useMutation({
        mutationFn: ({ centerId, id }: { centerId: number, id: number }) => deleteTeacherById(centerId, id),
        onSuccess: (res) => res.data && callback(res),
        onError: (error: any) => {
            alert("삭제를 실패했습니다." + error.response.data)
        }
    })
    return mutation;
}

export const useMutationRestoreTeacherById = (callback: Function) => {
    const mutation = useMutation({
        mutationFn: ({ centerId, id }: { centerId: number, id: number }) => restoreTeacherById(centerId, id),
        onSuccess: (res) => res.data && callback(res),
        onError: (error: any) => {
            alert("복구를 실패했습니다." + error.response.data)
        }
    })
    return mutation;
}

