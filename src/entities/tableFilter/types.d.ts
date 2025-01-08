interface ITableFilterItem {
    category: CategoryKey;
    valueList: string[];
    gird?: boolean;
}
interface ITicketProductTableFilterItem extends ITableFilterItem {
    // category: "id" | "type" | "name" | "price" | "limitTypeCntPeriodOrUsableCnt" | "usableDate" | "createdAt" | "isSales" | "classType";
}
interface ITicketAndMemberTableFilterItem extends ITableFilterItem {
    // category: "status";
}
type CategoryKey = "id" | "type" | "name" | "price" | "limitTypeCntPeriodOrUsableCnt" | "usableDate" | "createdAt" | "isSales" | "classType" | "status" | 'USABLE' | 'PAUSED' | 'UNAVAILABLE' | 'REFUND' | 'COUNT_EXPIRED' | 'PERIOD_EXPIRED';