import { useQuery } from "@tanstack/react-query";
import { getWellnessClassDetailByCenterId, getWellnessClassNameListByCenterId } from "../api";


export const useQueryGetWellnessClassNameListByCenterId = (centerId: number) => {
    const query = useQuery({
        queryKey: ['getWellnessClassNameListByCenterId', centerId],
        queryFn: () => getWellnessClassNameListByCenterId(centerId),
        select: (res) => res.data,
        staleTime: 1000 * 60 * 5,
    });
    return query;
};

export const useQueryGetWellnessClassDetailByCenterId = (centerId: number, classId: number | undefined) => {
    const query = useQuery({
        queryKey: ['getWellnessClassDetailByCenterId', centerId, classId],
        queryFn: async () => {
            if (!classId) {
                throw new Error('selectedClassId is undefined');
            }
            return await getWellnessClassDetailByCenterId(centerId, classId);
        },
        enabled: !!classId,
        staleTime: 1000 * 60 * 5,
        select: (res) => res.data,
    });
    return query;
};