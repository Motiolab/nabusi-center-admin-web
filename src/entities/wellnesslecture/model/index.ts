import { useMutation, useQuery } from "@tanstack/react-query";
import { createWellnessLectureListWithWellnessClass, deleteWellnessLectureById, getWellnessLectureDetailById, getWellnessLectureListByStartDate, restoreWellnessLectureById, updateWellnessLecture } from "../api";

export const useMutationCreateWellnessLectureListWithWellnessClass = (callback: Function) => {
    const mutation = useMutation({
        mutationFn: createWellnessLectureListWithWellnessClass,
        onSuccess: (res) => { res.data && callback(res) }
    })
    return mutation;
}

export const useQueryGetWellnessLectureListByStartDate = (centerId: number, startDate: string) => {
    const query = useQuery({
        queryKey: ['getWellnessLectureListByStartDate', centerId, startDate],
        queryFn: () => getWellnessLectureListByStartDate(centerId, startDate),
        select: (res) => res.data,
        staleTime: 1000 * 60 * 5,
    });
    return query;
}

export const useQueryGetWellnessLectureDetailById = (centerId: number, id: number) => {
    const query = useQuery({
        queryKey: ['getWellnessLectureDetailById', centerId, id],
        queryFn: () => getWellnessLectureDetailById(centerId, id),
        select: (res) => res.data,
        staleTime: 1000 * 60 * 5,
    });
    return query;
}

export const useMutationDeleteWellnessLectureById = (callback: Function) => {
    const mutation = useMutation({
        mutationFn: ({ centerId, id, isSendNoti }: { centerId: number, id: number, isSendNoti: boolean }) => deleteWellnessLectureById(centerId, id, isSendNoti),
        onSuccess: (res) => res.data && callback(res),
        onError: (error: any) => {
            alert("삭제를 실패했습니다." + error.response.data)
        }
    })
    return mutation;
}

export const useMutationRestoreWellnessLectureById = (callback: Function) => {
    const mutation = useMutation({
        mutationFn: ({ centerId, id }: { centerId: number, id: number }) => restoreWellnessLectureById(centerId, id),
        onSuccess: (res) => res.data && callback(res),
        onError: (error: any) => {
            alert("복구를 실패했습니다." + error.response.data)
        }
    })
    return mutation;
}

export const useMutationUpdateWellnessLecture = (callback: Function) => {
    const mutation = useMutation({
        mutationFn: updateWellnessLecture,
        onSuccess: (res) => { res.data && callback(res) }
    })
    return mutation;
}
