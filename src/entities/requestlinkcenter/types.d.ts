interface IRequestLinkCenter {
    id?: number;
    centerName: string;
    ownerName: string;
    userId: string;
    status: TRequestLinkCenterStatusKr
}
interface IRequestLinkCenterEnum {
    centerName: string;
    ownerName: string;
    userId: string;
    status: TRequestLinkCenterStatusEnum
}

type TRequestLinkCenterStatusEnum = "REQUESTING" | "COMPLETE" | "INTERRUPTED" | "REJECT";

type TRequestLinkCenterStatusKr = "수락" | "거절" | "미정";