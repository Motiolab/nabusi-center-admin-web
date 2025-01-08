interface ITicketForNotificationSend {
    id: number;
    name: string;
    remainingDate: string;
    usableCnt: number | null;
    totalCnt: number | null;
}
interface IMemberForNotificationSend {
    id: number;
    memberName: string;
    mobile: string;
    ticketListForNotificationSend: ITicketForNotificationSend[]
}
interface IPushSendAlaramData {
    id: number;
    sendDate: string;
    title: string;
    sendMemberNameList: string[];
    sender: string;
}

interface IPushSendReservationAlaramData {
    id: number;
    sendReservationDate: string;
    title: string;
    sendMemberNameList: string[];
    sender: string;
}