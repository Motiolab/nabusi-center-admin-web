import { ticketTypeToReactNodeTag } from '@/entities'
import styles from '../ui/styles.module.css'
import { TableColumnsType } from "antd"
import dayjs from 'dayjs'

const ticketMemberColumns: TableColumnsType<IMemberForTicketDetail> = [
    {
        title: 'no.',
        dataIndex: 'ticketId',
        className: styles.tableColumnStyle + " body-caption-accent",
    },
    {
        title: '이름',
        dataIndex: 'name',
        className: styles.tableColumnStyle + " body-caption-accent",
        render: value => <div className="body-content-accent">{value}</div>,
    },
    {
        title: '전화번호',
        dataIndex: 'mobile',
        className: styles.tableColumnStyle + " body-caption-accent",
        render: value => <div className="body-content-standard">+{value}</div>,
    },
    {
        title: '수강권 정보',
        dataIndex: 'endDate',
        className: styles.tableColumnStyle + " body-caption-accent",
        render: (value, record) => <div style={{ display: "flex", gap: "8px" }}>
            <div className="body-caption-standardp" style={{ borderRadius: "var(--Radiuss)", backgroundColor: "var(--Neutrals-Neutrals100)", color: "var(--Neutrals-Neutrals700)", padding: "var(--Spacingxxs) var(--Spacings) var(--Spacingxxs) var(--Spacings)" }}>{dayjs(value).diff(dayjs(), "day")}일 남음</div>
            <div className="body-caption-standardp" style={{ borderRadius: "var(--Radiuss)", backgroundColor: "var(--Neutrals-Neutrals100)", color: "var(--Neutrals-Neutrals700)", padding: "var(--Spacingxxs) var(--Spacings) var(--Spacingxxs) var(--Spacings)" }}>{record.usableCnt}회/{record.totalCnt}회</div>
        </div>,

    },
    {
        title: '사용 기간',
        dataIndex: 'startDate',
        className: styles.tableColumnStyle + " body-caption-accent",
        render: (value, record) => <div className="body-content-standard">{value.replaceAll("-", ".")} - {record.endDate.replaceAll("-", ".")}</div>,
    },
    {
        title: '상태',
        dataIndex: 'status',
        className: styles.tableColumnStyle + " body-caption-accent",
        render: value => ticketTypeToReactNodeTag(value)
    },
]
const formatDate = (dateString: string) => {
    const [datePart, timePart] = dateString.split('T');
    const [year, month, day] = datePart.split('-');
    const [hour, minute] = timePart.split(':');
    const hourNumber = parseInt(hour, 10);
    const ampm = hourNumber >= 12 ? '오후' : '오전';
    const formattedHour = hourNumber % 12 || 12;
    return `${year}.${month}.${day} ${ampm} ${String(formattedHour).padStart(2, '0')}:${minute}`;
}

const ticketExtendMemberColumns: TableColumnsType<any> = [
    { title: "이름", dataIndex: "memberName", className: "body-caption-accent", render: value => <div className="body-content-accent">{value}</div>, width: "80px" },
    { title: "연장 기준일", dataIndex: "targetDate", className: "body-caption-accent", render: value => <div className="body-caption-standard">{value.replaceAll("-", ".")}</div>, width: "121px" },
    { title: "연장일", dataIndex: "day", className: "body-caption-accent", render: value => <div className="body-caption-standard">{value}일</div>, width: "70px" },
    { title: "연장 사유", dataIndex: "memo", className: "body-caption-accent", render: value => <div className="body-caption-standard">{value}</div>, width: "121px" },
    { title: "연장 일시", dataIndex: "createdAt", className: "body-caption-accent", render: value => <div className="body-caption-standard">{formatDate(value)}</div>, width: "180px" }
]

export { ticketMemberColumns, ticketExtendMemberColumns }