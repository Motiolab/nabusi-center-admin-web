import { Button, Checkbox, DatePicker, Flex, Input, Modal, Table, message } from "antd"
import dayjs, { Dayjs } from "dayjs"
import { ChangeEvent, useState } from "react"
import styles from './styles.module.css'
import { useMutationCreateWellnessTicketExtension, useQueryGetWellnessTicketExtensionListByWellnessTicketId } from "@/entities/wellnessticketextension/model";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

const { TextArea } = Input;

interface IProps {
    wellnessTicketId: number;
    wellnessTicketName: string;
}

const ExtensionTicket = ({ wellnessTicketId, wellnessTicketName }: IProps) => {
    const selectedCenterId = useSelector((state: RootState) => state.selectedCenterId)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [targetDate, setTargetDate] = useState<Dayjs | undefined>(undefined)
    const [extendDate, setExtendDate] = useState<number | undefined>(1);
    const [reason, setReason] = useState<string>('');
    const [isApplyAfter, setIsApplyAfter] = useState<boolean>(true);
    const emptyText = <div className="body-content-standard" style={{ textAlign: "left", color: "var(--Base-Base-Black)" }}>수강권 일괄 연장 이력이 없습니다.</div>;

    const { data: wellnessTicketExtensionList } = useQueryGetWellnessTicketExtensionListByWellnessTicketId(selectedCenterId, wellnessTicketId);
    const createMutation = useMutationCreateWellnessTicketExtension((res: any) => {
        if (res.data) {
            message.success('수강권 일괄 연장 성공하였습니다.');
            setIsModalOpen(false);
        }
    });

    const onClickCreateWellnessTicketExtension = () => {
        if (!targetDate) return message.error("연장 기준일을 선택해주세요.")
        if (!extendDate) return message.error('연장일을 입력해주세요.')

        const request: ICreateWellnessTicketExtensionAdminRequestV1 = {
            centerId: selectedCenterId,
            extendDate: extendDate,
            isApplyAfter: isApplyAfter,
            reason: reason,
            targetDate: targetDate.format("YYYY-MM-DDTHH:mm:00Z"),
            wellnessTicketId: wellnessTicketId
        }
        createMutation.mutate(request)
    }

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
                    onChange={(e) => setTargetDate(e.startOf('date'))}
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
                        maxLength={30}
                    />
                </div>
            </Flex>
            <Flex gap={12} style={{ marginTop: 16 }} align="center">
                <div className="body-content-bold" style={{ width: 100 }}></div>
                <Checkbox checked={isApplyAfter} onChange={(e) => setIsApplyAfter(e.target.checked)} className="body-content-standard">향후 {wellnessTicketName} 정기권 발급 시 적용</Checkbox>
            </Flex>
            {wellnessTicketExtensionList && <Table
                style={{ marginTop: 20 }}
                columns={[
                    {
                        title: "관리자", dataIndex: "registerName", className: "body-content-standard", render: (value: string) => value
                    },
                    {
                        title: "연장 기준일", dataIndex: "targetDate", className: "body-content-standard", render: (value: string) => dayjs(value).format('YYYY-MM-DD')
                    },
                    {
                        title: "연장일", dataIndex: "extendDate", className: "body-content-standard", render: (value: string) => value + '일'
                    },
                    {
                        title: "연장 사유", dataIndex: "reason", className: "body-content-standard", width: 175
                    },
                    {
                        title: "연장 일시", dataIndex: "createDateTime", className: "body-content-standard", render: (value: string) => dayjs(value).format('YYYY-MM-DD')
                    },
                ]}
                dataSource={wellnessTicketExtensionList.map((e, idx) => ({ ...e, key: idx }))}
                locale={{ emptyText }}
                pagination={{
                    position: ["bottomCenter"],
                    className: styles.tablePagenation
                }}
            />
            }
            <div style={{ textAlign: 'right', marginTop: 20 }}>
                <Button type="primary" onClick={() => onClickCreateWellnessTicketExtension()}>일괄 연장하기</Button>
            </div>
        </Modal>
    </>
}
export default ExtensionTicket