import { useMutationDeleteWellnessLectureById } from "@/entities/wellnesslecture/model";
import { useQueryClient } from "@tanstack/react-query";
import { Button, Checkbox, Flex, Modal } from "antd";
import { useState } from "react";

interface IProps {
    centerId: number;
    id: number;
}

const DeleteWellnessLecture = ({ centerId, id }: IProps) => {
    const queryClient = useQueryClient();
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [isSendNoti, setIsSendNoti] = useState<boolean>(true);

    const deleteMutation = useMutationDeleteWellnessLectureById(() => {
        setIsModalOpen(false)
        queryClient.invalidateQueries({ queryKey: ['getWellnessLectureDetailById', centerId, id] })
    });

    const onClickDeleteButton = () => {
        deleteMutation.mutate({ centerId, id, isSendNoti });
    }

    return <>
        <Button color="danger" variant="outlined" onClick={() => setIsModalOpen(true)}>폐강</Button>
        <Modal title="수업 폐강"
            centered
            open={isModalOpen}
            onOk={() => setIsModalOpen(false)}
            onCancel={() => setIsModalOpen(false)}
            footer={<Flex justify="space-between" gap={16} style={{ marginTop: 20 }}>
                <Button style={{ flex: 1 }} onClick={() => setIsModalOpen(false)}>돌아가기</Button>
                <Button style={{ flex: 1 }} color="danger" variant="solid" onClick={() => onClickDeleteButton()}>수업 폐강하기</Button>
            </Flex>}
        >
            <div className="body-content-standard">
                <div>해당 수업 예약 <span style={{ color: 'var(--Error-Error)' }}>6건</span> 있습니다.</div>
                <div>해당 수업 예약 정보가 삭제되며 사용된 정기권 1회 추가됩니다.</div>
                <div>수업을 폐강하시겠습니까?</div>
                <br />
                <Checkbox style={{ fontSize: 16 }} checked={isSendNoti} onChange={() => setIsSendNoti(!isSendNoti)}>예약 유저에게 수업 취소 알림 보내기</Checkbox>
            </div>
        </Modal>
    </>
}

export default DeleteWellnessLecture;