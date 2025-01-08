import { useMutationDeleteWellnessTicketById } from "@/entities/wellnessticket/model";
import { useQueryClient } from "@tanstack/react-query";
import { Button, Flex, Modal } from "antd"
import { useState } from "react";

interface IProps {
    centerId: number
    id: number
}

const DeleteWellnessTicket = ({ centerId, id }: IProps) => {
    const queryClient = useQueryClient();
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const deleteMutation = useMutationDeleteWellnessTicketById(() => {
        setIsModalOpen(false)
        queryClient.invalidateQueries({ queryKey: ['getWellnessTicketDetailById', centerId, id] })
        queryClient.invalidateQueries({ queryKey: ['getWellnessTicketList', centerId] })
    });

    const onClickDeleteButton = () => {
        deleteMutation.mutate({ centerId, id });
    }

    return <>
        <Button color="danger" variant="outlined" onClick={() => setIsModalOpen(true)}>수강권 판매정지</Button>
        <Modal title="수강권 판매 정지"
            centered
            open={isModalOpen}
            onOk={() => setIsModalOpen(false)}
            onCancel={() => setIsModalOpen(false)}
            footer={<Flex justify="space-between" gap={16} style={{ marginTop: 20 }}>
                <Button style={{ flex: 1 }} onClick={() => setIsModalOpen(false)}>돌아가기</Button>
                <Button style={{ flex: 1 }} color="danger" variant="solid" onClick={() => onClickDeleteButton()}>판매 정지하기</Button>
            </Flex>}
        >
            <div className="body-content-standard">
                <div>수강권을 보유한 회원이 <span style={{ color: 'var(--Error-Error)' }}>6명</span> 있습니다.</div>
                <div>수강권을 판매 정지하겠습니까?</div>
                <div>판매 정지되어도 회원은 수강권을 만료일까지 사용할 수 있습니다.</div>
            </div>
        </Modal>
    </>
}

export default DeleteWellnessTicket