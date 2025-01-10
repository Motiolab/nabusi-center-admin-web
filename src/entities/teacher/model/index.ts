import { useQuery } from "@tanstack/react-query";
import { getTeacherDetailById, getTeacherListByCenterId } from "../api";

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

