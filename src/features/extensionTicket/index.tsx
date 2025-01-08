import { Button, DatePicker, Flex, Input, Modal, Table } from "antd"
import { Dayjs } from "dayjs"
import { ChangeEvent, useState } from "react"
import styles from './styles.module.css'

const { TextArea } = Input;

const ExtensionTicket = () => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [startDateTime, setStartDateTime] = useState<Dayjs | undefined>(undefined)
    const [extendDate, setExtendDate] = useState<number | undefined>(1);
    const [reason, setReason] = useState<string>('');
    const emptyText = <div className="body-content-standard" style={{ textAlign: "left", color: "var(--Base-Base-Black)" }}>수강권 일괄 연장 이력이 없습니다.</div>;

    return <>
        <Button type="primary" onClick={() => setIsModalOpen(true)}>수강권 일괄 연장</Button>
        <Modal title="수강권 일괄 연장"
            open={isModalOpen}
            onOk={() => setIsModalOpen(false)}
            onCancel={() => setIsModalOpen(false)}
            width={620}
            footer={null}
            centered
        >
            <div className="body-content-standard">연장 기준일에 이용중인 수강권만 일괄 연장됩니다.</div>
            <div className="body-content-accent">인원 : <span style={{ color: 'var(--Primary-Primary)' }}>48명</span></div>
            <Flex gap={12} style={{ marginTop: 20 }} align="center">
                <div className="body-content-bold" style={{ width: 100 }}>연장 기준일</div>
                <DatePicker
                    placeholder="시작일"
                    onChange={(e) => setStartDateTime(e.startOf('date'))}
                    size="large"
                    style={{ width: 160 }}
                />
            </Flex>
            <Flex gap={12} style={{ marginTop: 16 }} align="center">
                <div className="body-content-bold" style={{ width: 100 }}>연장일</div>
                <Input
                    type="number"
                    placeholder="숫자 입력"
                    style={{ width: "160px", height: 44 }}
                    value={extendDate}
                    onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        setExtendDate(event.target.value ? Number(event.target.value) : undefined)
                    }
                />
                <div className="body-content-standard">일</div>
            </Flex>
            <Flex gap={12} style={{ marginTop: 16 }} align="center">
                <div className="body-content-bold" style={{ width: 120 }}>연장 사유</div>
                <div style={{ width: '100%' }}>
                    <TextArea
                        rows={4}
                        placeholder="연장 사유를 입력해 주세요."
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        style={{ width: '100%' }}
                    />
                </div>
            </Flex>

            <Table
                style={{ marginTop: 20 }}
                columns={[
                    {
                        title: "이름", dataIndex: "memberName", className: styles.tableColumnStyle + " body-content-standard", render: (value: string, record: IGetWellnessLectureAdminResponseV1) => {
                            return <>{value}</>
                        }
                    },
                    {
                        title: "연장 기준일", dataIndex: "date", className: styles.tableColumnStyle + " body-content-accent"
                    },
                    {
                        title: "연장일", dataIndex: "extendDate", className: styles.tableColumnStyle + " body-content-accent"
                    },
                    {
                        title: "연장 사유", dataIndex: "reason", className: styles.tableColumnStyle + " body-content-accent"
                    },
                    {
                        title: "연장 일시", dataIndex: "createDate", className: styles.tableColumnStyle + " body-content-accent"
                    },
                ]}
                // dataSource={wellnessLectureList.filter((i) => i.name.includes(searchText) || i.teacherName.includes(searchText)).map((e, idx) => ({ ...e, key: idx }))}
                locale={{ emptyText }}
                pagination={{
                    position: ["bottomCenter"],
                    className: styles.tablePagenation
                }}
            />
            <div style={{ textAlign: 'right', marginTop: 20 }}>
                <Button type="primary" onClick={() => { }}>일괄 연장하기</Button>
            </div>
        </Modal>
    </>
}
export default ExtensionTicket