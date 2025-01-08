import { useQuery } from "@tanstack/react-query";
import { getWellnessTicketManagementNameListByCenterId } from "../api";

export const useQueryGetWellnessTicketManagementNameListByCenterId = (centerId: number) => {
    const query = useQuery({
        queryKey: ['getWellnessTicketManagementNameListByCenterId', centerId],
        queryFn: () => getWellnessTicketManagementNameListByCenterId(centerId),
        select: (res) => res.data,
        staleTime: 1000 * 60 * 5,
    });
    return query;
};
