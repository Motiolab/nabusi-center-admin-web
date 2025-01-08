interface ILinkCenter {
    id?: number;
    centerName: string;
    ownerName: string;
    userId: string;
    status: TLinkCenterStatusKr;
}
interface ILinkCenterEnum {
    centerName: string;
    ownerName: string;
    userId: string;
    status: TLinkCenterStatusEnum;
}
type TLinkCenterStatusEnum = "REQUESTING" | "COMPLETE" | "INTERRUPTED" | "REJECT";

type TLinkCenterStatusKr = "요청 중" | "연동 완료" | "연동 중단" | "요청 거부";

interface ICheckLinkCenter {
    id: number;
    centerName: string;
    ownerName: string;
    userId: string;
}
interface IRequestCenterDataLink {
    requestCenterId: number;
    responseCenterId: number;
    status: TLinkCenterStatusEnum;
}
interface IPatchLinkCenter {
    id: number;
    status: TLinkCenterStatusEnum;
}