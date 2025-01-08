interface IOpenInfo {
    id?: number;
    closeTime: string;
    day: number;
    isDayOff: any;
    openTime: string;
}

interface ICenterRoom {
    id: number;
    name: string;
    capacity: number | null;
}

interface IContactNumber {
    id?: number;
    contactType: "LANDLINE" | "MOBILE";
    number: string;
}

interface ICenterInfoJoinAll {
    id: number;
    address: string;
    code: string;
    detailAddress: string;
    roadName: string;
    name: string;
    openInfoList: IOpenInfo[];
    roomList: ICenterRoom[];
    contactNumberList: IContactNumber[];
}