import { ConfigProvider, Table } from "antd";
import { useEffect, useState } from "react";
import styles from './styles.module.css'
import { pushAlarmReservationListColumns } from "../model";

const PushAlaramReservationList = () => {
    const mockData = [{ id: 1, sendReservationDate: '2024-08-12T18:22:00', title: '8월 14일 홍길동 강사님 수업 대강 안내 드립니다.', sendMemberNameList: ['윤정준', '권준학', '권준학', '권준학', '권준학', '권준학', '권준학', '권준학', '권준학', '권준학', '권준학', '권준학', '권준학', '권준학', '권준학', '권준학', '권준학', '권준학', '권준학', '권준학', '권준학', '권준학', '권준학', '윤정준', '윤정준', '윤정준', '윤정준', '윤정준', '윤정준', '윤정준', '윤정준', '윤정준', '윤정준', '윤정준', '윤정준', '윤정준', '윤정준', '윤정준', '윤정준', '윤정준', '윤정준', '윤정준', '윤정준', '윤정준', '윤정준', '윤정준', '윤정준', '윤정준', '윤정준'], sender: '홍길동' }, { id: 2, sendReservationDate: '2024-04-12T18:22:00', title: '4월 15일 윤정준 강사님 수업 대강 안내 드립니다.', sendMemberNameList: ['권준학', '권준학', '권준학', '권준학', '권준학', '권준학', '권준학', '권준학', '권준학', '권준학', '권준학'], sender: '윤정준' }]
    const [originalDataSource, setOriginalDataSource] = useState<IPushSendReservationAlaramData[]>([]);
    const emptyText = <div className="body-content-standard" style={{ textAlign: "left", color: "var(--Base-Base-Black)" }}>발송 예정 알림 내역이 없습니다.</div>;
    useEffect(() => {
        setOriginalDataSource(mockData)
    }, [])
    return <>
        <div style={{ padding: '24px 24px 0 24px', backgroundColor: "var(--Base-Base-White)", height: "calc(100% - 64px)" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "var(--Spacingm)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "var(--Spacingbase)" }}>
                    <div className="body-content-accent">
                        예약 알림 ({originalDataSource.length})
                    </div>
                </div>
            </div>
            <div style={{ paddingBlock: "var(--Spacingml) 60px" }}>
                <ConfigProvider
                    theme={{
                        components: {
                            Table: {
                                cellPaddingInline: 14,
                                cellPaddingBlock: 16,
                            },
                        },
                    }}>
                    <Table className={styles.pushAlaramTable} columns={pushAlarmReservationListColumns} dataSource={originalDataSource?.map((e, idx) => ({ ...e, key: idx }))} locale={{ emptyText }} pagination={{ position: ["bottomCenter"], className: styles.tablePagenation }} />
                </ConfigProvider>
            </div>
        </div>
    </>
}


export { PushAlaramReservationList }