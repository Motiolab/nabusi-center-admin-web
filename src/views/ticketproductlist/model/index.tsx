import { invertedObject } from '@/shared/model/enToKr'
import styles from '../ui/styles.module.css'
import { TableColumnsType } from 'antd'
import { Link } from 'react-router-dom'
import { ticketValueEnToKr } from '@/entities/ticket/model'

const ticketProductColumns: TableColumnsType<any> = [
    { title: "no.", dataIndex: "id", className: styles.tableColumnStyle + " body-content-standard" },
    { title: "유형", dataIndex: "type", className: styles.tableColumnStyle + " body-content-standard", render: (value: string) => ticketValueEnToKr(value) },
    {
        title: "수강권명", dataIndex: "name", className: styles.tableColumnStyle + " body-content-accent", render: (value: string, record) => <Link
            to={`/home/ticketproductdetail?id=${record.id}&isSales=${record.isSales}`}
            style={{ textDecorationLine: "none", color: "var(--Base-Base-Black)" }}>
            {value}
        </Link>
    },
    { title: "판매 가격", dataIndex: "price", className: styles.tableColumnStyle + " body-content-standard", render: (value: number) => value.toLocaleString() + " 원" },
    { title: "이용 제한", dataIndex: "limitTypeCntPeriodOrUsableCnt", className: styles.tableColumnStyle + " body-content-standard", render: (value: string) => value === "제한 없음" ? value : value + "회" },
    { title: "사용 기한", dataIndex: "usableDate", className: styles.tableColumnStyle + " body-content-standard", render: (value: number) => value + "일" },
    { title: "등록일", dataIndex: "createdAt", className: styles.tableColumnStyle + " body-content-standard", render: (value: string) => value.split("T")[0].replaceAll("-", ".") },
    { title: "상태", dataIndex: "isSales", className: styles.tableColumnStyle + " body-content-standard", render: (value: boolean) => value ? <div className='body-caption-accent' style={{ color: "var(--Primary-Primary)", backgroundColor: "var(--Primary-Primary50)", border: "1px solid var(--Primary-Primary)", borderRadius: "var(--Radiuss)", padding: 'var(--Spacingxxs) var(--Spacings) var(--Spacingxxs) var(--Spacings)', width: "37px" }}>판매중</div> : <div className='body-caption-accent' style={{ color: "var(--Error-Error)", backgroundColor: "var(--Error-Error50)", border: "1px solid var(--Error-Error)", borderRadius: "var(--Radiuss)", padding: 'var(--Spacingxxs) var(--Spacings) var(--Spacingxxs) var(--Spacings)', width: "49px" }}>판매정지</div> }
]

const categoryKr: Record<CategoryKey, string> = {
    "id": "no.",
    "type": "유형",
    "name": "수강권명",
    "price": "판매 가격",
    "limitTypeCntPeriodOrUsableCnt": "이용 제한",
    "usableDate": "사용 기한",
    "createdAt": "등록일",
    "isSales": "상태",
    "classType": "수업 종류",
    'USABLE': "이용중",
    'PAUSED': "정지중",
    'UNAVAILABLE': "시용정지",
    'REFUND': "환불",
    'COUNT_EXPIRED': "횟수만료",
    'PERIOD_EXPIRED': "기간만료",
    'status': "상태",
}
const categoryKrToEn = (kr: string) => invertedObject(categoryKr)[kr]
const categoryEnToKr = (en: string | CategoryKey): string => {
    if (categoryKr.hasOwnProperty(en)) {
        return categoryKr[en as CategoryKey];
    } else {
        return "알 수 없는 카테고리";
    }
};


export { ticketProductColumns, categoryKrToEn, categoryEnToKr };