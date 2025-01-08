interface IBasicTicketProduct {
    type: "COUNT" | "PERIOD";
    name: string;
    price: number;
    usableDate: number;
    classTypeIdList: string[];
    classTypeNameList?: string[];
}

interface IGetTicketProduct extends IBasicTicketProduct {
    id: number;
    createdAt: string;
    isSales: "판매중" | "판매정지";
    limitTypeCntPeriodOrUsableCnt: string;
}
interface IRegisterAndUpdateTicketProduct extends IBasicTicketProduct {
    id?: number;
    discountPercent: number;
    usableCnt?: number;
    limitTypePeriod: string;
    limitCntPeriod: number;
}

interface ITicketProductForDetail {
    id: number;
    type: TTicketTicketProductInfoType;
    name: string;
    price: number;
    discountPercent: number;
    limitTypePeriod: TTicketTicketProductInfoLimitTypePeriod;
    usableCnt: number;
    usableDate: number;
    classTypeIdList: number[];
    isSales: boolean;
    member: IMember;
}

interface IMember {
    id: number;
    name: string;
    mobile: string;
    ticket: ITicket;
}

interface ITicket {
    id: number;
    usableCnt: number;
    ticketTicketProductInfo: TicketTicketProductInfo;
    startDate: string;
    endDate: string;
    status: TTicketStatus;
}

interface TicketTicketProductInfo {
    id: number;
    limitTypePeriod: TTicketTicketProductInfoLimitTypePeriod;
    usableCnt: number;
}

type TTicketTicketProductInfoType = "COUNT" | "PERIOD";
type TTicketTicketProductInfoLimitTypePeriod = 'WEEKLY' | 'MONTHLY' | 'UNLIMITED';
type TTicketStatus = 'USABLE' | 'PAUSED' | 'UNAVAILABLE' | 'REFUND' | 'COUNT_EXPIRED' | 'PERIOD_EXPIRED'; 
