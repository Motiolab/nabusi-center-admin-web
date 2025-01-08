import { TableColumnsType } from "antd";
import styles from '../ui/styles.module.css';
import { ReactComponent as MinusCircle } from '@/assets/icon/MinusCircle.svg';
import { Fragment } from "react";

const sendMemberSelectColumns: TableColumnsType<IMemberForNotificationSend> = [
    {
        title: '이름',
        dataIndex: 'memberName',
        width: '100px',
        className: styles.tableColumnStyle + " body-caption-accent",
        render: value => <div className="body-content-accent">{value}</div>,
    },
    {
        title: '전화번호',
        dataIndex: 'mobile',
        width: '150px',
        className: styles.tableColumnStyle + " body-caption-accent",
        render: value => <div className="body-caption-standard">+{value}</div>,
    },
    {
        title: '보유 수강권',
        dataIndex: 'ticketListForNotificationSend',
        className: styles.tableColumnStyle + " body-caption-accent",
        render: value => <div style={{ display: "flex", gap: "8px" }}>
            {value.map((ticket: ITicketForNotificationSend, idx: number) =>
                idx < 2 && <Fragment key={idx}>
                    <div className="body-caption-standardp" style={{ borderRadius: "var(--Radiuss)", backgroundColor: "var(--Neutrals-Neutrals100)", color: "var(--Neutrals-Neutrals700)", padding: "var(--Spacingxxs) var(--Spacings) var(--Spacingxxs) var(--Spacings)" }}>{ticket.name}</div>
                    <div className="body-caption-standardp" style={{ borderRadius: "var(--Radiuss)", backgroundColor: "var(--Neutrals-Neutrals100)", color: "var(--Neutrals-Neutrals700)", padding: "var(--Spacingxxs) var(--Spacings) var(--Spacingxxs) var(--Spacings)" }}>{ticket.remainingDate}일 남음</div>
                    {ticket.usableCnt && ticket.totalCnt && <div className="body-caption-standardp" style={{ borderRadius: "var(--Radiuss)", backgroundColor: "var(--Neutrals-Neutrals100)", color: "var(--Neutrals-Neutrals700)", padding: "var(--Spacingxxs) var(--Spacings) var(--Spacingxxs) var(--Spacings)" }}>{ticket.usableCnt}회/{ticket.totalCnt}회</div>}
                    <div></div>
                </Fragment>)}
        </div>,

    },
]
const pushAlaramMemberSendColumn = (onFilterClick: Function): TableColumnsType<any> => [
    {
        title: "no.",
        dataIndex: "id",
        width: '60px',
        className: styles.tableColumnStyle + " body-content-standard"
    },
    {
        title: "이름",
        dataIndex: "memberName",
        width: '100px',
        className: styles.tableColumnStyle + " body-content-standard"
    },
    {
        title: "전화번호",
        dataIndex: "mobile",
        width: '228px',
        className: styles.tableColumnStyle + " body-content-standard",
        render: (value, record) => <div style={{ display: 'flex', gap: 'var(--Spacings)', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>+{value}</div>
            <MinusCircle width={16} height={16} fill={'var(--NeutralsNeutrals500)'} style={{ marginRight: '12px', cursor: 'pointer' }} onClick={() => onFilterClick(record?.id)} />
        </div>,
    },
]
export { sendMemberSelectColumns, pushAlaramMemberSendColumn }