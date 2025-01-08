import { useMutationRestoreWellnessTicketById } from "@/entities/wellnessticket/model";
import { useQueryClient } from "@tanstack/react-query";
import { Button, Flex, Modal } from "antd"
import { useState } from "react";

interface IProps {
    centerId: number
    id: number
}

const RestoreWellnessTicket = ({ centerId, id }: IProps) => {
    const queryClient = useQueryClient();
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const restoreMutation = useMutationRestoreWellnessTicketById(() => {
        setIsModalOpen(false)
        queryClient.invalidateQueries({ queryKey: ['getWellnessTicketDetailById', centerId, id] })
        queryClient.invalidateQueries({ queryKey: ['getWellnessTicketList', centerId] })
    });

    const onClickRestoreButton = () => {
        restoreMutation.mutate({ centerId, id });
    }

    return <>
        <Button color="primary" variant="outlined" onClick={() => setIsModalOpen(true)}>수강권 판매 활성화</Button>
        <Modal title="수강권 판매 활성화"
            centered
            open={isModalOpen}
            onOk={() => setIsModalOpen(false)}
            onCancel={() => setIsModalOpen(false)}
            footer={<Flex justify="space-between" gap={16} style={{ marginTop: 20 }}>
                <Button style={{ flex: 1 }} onClick={() => setIsModalOpen(false)}>돌아가기</Button>
                <Button style={{ flex: 1 }} color="primary" variant="solid" onClick={() => onClickRestoreButton()}>판매 활성화하기</Button>
            </Flex>}
        >
            <div className="body-content-standard">
                <div>수강권 판매를 활성화하시겠습니까?</div>
            </div>
        </Modal>
    </>
}

export default RestoreWellnessTicket