import { TableColumnsType } from "antd";
import styles from '../ui/styles.module.css'
import { Link } from "react-router-dom";
import { noticeTypeToReactNodeTag } from "@/entities/notice/model";

const noticeColumns: TableColumnsType<INotice> = [
    { title: "번호", dataIndex: "id", className: styles.tableColumnStyle + " body-content-standard", render: (value, record) => record?.isPinTop ? <div className="body-caption-accent" style={{ color: "var(--Primary-Primary)", border: "1px solid var(--Primary-Primary)", borderRadius: "var(--RadiusRound)", padding: "var(--Spacingxxs) var(--Spacingsm) var(--Spacingxxs) var(--Spacingsm)", width: "25px", textAlign: "center" }}>공지</div> : value },
    { title: "제목", dataIndex: "title", className: styles.tableColumnStyle + " body-content-accent", render: (value, record) => <Link to={{ pathname: `/home/customercenter/noticedetail?id=${record?.id}` }} style={{ textDecorationLine: "none", color: "var(--Base-Base-Black)" }}>{value}</Link> },
    { title: "등록일", dataIndex: "createdAt", className: styles.tableColumnStyle + " body-content-standard", render: value => value?.split("T")[0].replaceAll("-", ".") },
    { title: "작성자", dataIndex: "creatorName", className: styles.tableColumnStyle + " body-content-standard" },
    { title: "조회수", dataIndex: "viewCnt", className: styles.tableColumnStyle + " body-content-standard" },
    { title: "게시 여부", dataIndex: "isShow", className: styles.tableColumnStyle + " body-content-standard", render: value => noticeTypeToReactNodeTag(value) },
]

const sortedNotices = ((notices: INotice[]) => notices.sort((a, b) => {
    if (a.isPinTop && b.isPinTop) {
        return (Number(b.id) ?? 0) - (Number(a.id) ?? 0);
    } else if (a.isPinTop) {
        return -1;
    } else if (b.isPinTop) {
        return 1;
    } else {
        return (Number(b.id) ?? 0) - (Number(a.id) ?? 0);
    }
}));

export { noticeColumns, sortedNotices }