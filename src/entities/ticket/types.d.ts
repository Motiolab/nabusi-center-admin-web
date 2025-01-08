interface ITicketAndMemberForDetail {
    id: number;
    memberAndTicket: IMemberForTicketDetail[];
}
interface IMemberForTicketDetail {
    memberId: number;
    mobile: string;
    name: string;
    ticketId: number;
    startDate: string;
    endDate: string;
    status: 'USABLE' | 'PAUSED' | 'UNAVAILABLE' | 'REFUND' | 'COUNT_EXPIRED' | 'PERIOD_EXPIRED';
    usableCnt: number | null;
    totalCnt: number | null;
}
interface ITicketExtend {
    ticketProductId: string;
    targetDate: string;
    day: number;
    memo: string;
}