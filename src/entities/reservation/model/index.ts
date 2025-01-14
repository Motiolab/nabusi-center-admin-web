import { useMutation, useQuery } from "@tanstack/react-query";
import { createReservation, getReservationListByWellnessLectureId } from "../api";

export const useMutationCreateReservation = (callback: Function) => {
    const mutation = useMutation({
        mutationFn: createReservation,
        onSuccess: (res) => { res.data && callback(res) },
        onError: (error: any) => {
            if (error.response?.data?.message) {
                window.alert(`예약 실패: ${error.response.data.message}`);
            } else {
                window.alert("예약 중 알 수 없는 오류가 발생했습니다.");
            }
        }
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