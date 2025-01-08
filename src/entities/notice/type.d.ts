interface INotice {
    id?: number | string;
    title: string;
    htmlContents?: string;
    createdAt?: string;
    creatorName?: string;
    viewCnt?: number;
    isShow: boolean;
    isPinTop: boolean;
}