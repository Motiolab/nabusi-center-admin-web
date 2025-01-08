import { TableColumnsType } from "antd"
import styles from '../styles.module.css'
import { Link } from "react-router-dom"

const wellnessTicketTableColumn: TableColumnsType<any> = [
    { title: "no.", dataIndex: "", className: styles.tableColumnStyle + " body-content-standard", render: (_: number, __: any, index: number) => index + 1 },
    { title: "유형", dataIndex: "type", className: styles.tableColumnStyle + " body-content-standard", render: (value: string) => ticketValueEnToKr(value) },
    {
        title: "수강권명", dataIndex: "name", className: styles.tableColumnStyle + " body-content-accent", render: (value: string, record) => <Link
            to={`/wellness-ticket/${record.id}`}
            style={{ textDecorationLine: "none", color: "var(--Base-Base-Black)" }}>
            {value}
        </Link>
    },
    { title: "판매 가격", dataIndex: "salesPrice", className: styles.tableColumnStyle + " body-content-standard", render: (value: number) => value.toLocaleString() + " 원" },
    { title: "이용 제한", dataIndex: "limitCnt", className: styles.tableColumnStyle + " body-content-standard", render: (value: string) => value === "제한 없음" ? value : value + "회" },
    { title: "사용 기한", dataIndex: "usableDate", className: styles.tableColumnStyle + " body-content-standard", render: (value: number) => value + "일" },
    { title: "등록일", dataIndex: "createdDate", className: styles.tableColumnStyle + " body-content-standard", render: (value: string) => value.split("T")[0].replaceAll("-", ".") },
    { title: "상태", dataIndex: "isDelete", className: styles.tableColumnStyle + " body-content-standard", render: (value: boolean) => !value ? <div className='body-caption-accent' style={{ color: "var(--Primary-Primary)", backgroundColor: "var(--Primary-Primary50)", border: "1px solid var(--Primary-Primary)", borderRadius: "var(--Radiuss)", padding: 'var(--Spacingxxs) var(--Spacings) var(--Spacingxxs) var(--Spacings)', width: "37px" }}>판매중</div> : <div className='body-caption-accent' style={{ color: "var(--Error-Error)", backgroundColor: "var(--Error-Error50)", border: "1px solid var(--Error-Error)", borderRadius: "var(--Radiuss)", padding: 'var(--Spacingxxs) var(--Spacings) var(--Spacingxxs) var(--Spacings)', width: "49px" }}>판매정지</div> }
]

const ticketValueEnToKr = (value: string) => {
    switch (value) {
        case "COUNT": return "횟수권";
        case "PERIOD": return "기간권";
        case "USABLE": return "이용중";
        case "PAUSED": return "정지중";
        case "UNAVAILABLE": return "사용 정지";
        case "REFUND": return "환불";
        case "COUNT_EXPIRED": return "횟수 만료";
        case "PERIOD_EXPIRED": return "기간 만료";
        case "NONE": return "-";
        case "MONTH": return "월간";
        case "WEEK": return "주간";
        default: return value;
    }
}

export default wellnessTicketTableColumn