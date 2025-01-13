import { useMutation, useQuery } from "@tanstack/react-query";
import { createReservation, getReservationListByWellnessLectureId } from "../api";

export const useMutationCreateReservation = (callback: Function) => {
    const mutation = useMutation({
        mutationFn: createReservation,
        onSuccess: (res) => { res.data && callback(res) }
    })
    return mutation;
}

export const useQueryGetReservationListByWellnessLectureId = (centerId: number, wellnessLectureId: number) => {
    const query = useQuery({
        queryKey: ['getReservationListByWellnessLectureId', centerId, wellnessLectureId],
        queryFn: () => getReservationListByWellnessLectureId(centerId, wellnessLectureId),
        select: (res) => res.data,
        staleTime: 1000 * 60 * 5,
    });
    return query;
}