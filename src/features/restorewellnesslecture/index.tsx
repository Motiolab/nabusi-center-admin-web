import { useMutationRestoreWellnessLectureById } from "@/entities/wellnesslecture/model";
import { useQueryClient } from "@tanstack/react-query";
import { Button, Flex, Modal } from "antd";
import { useState } from "react";

interface IProps {
    centerId: number
    id: number

}
const RestoreWellnessLecture = ({ centerId, id }: IProps) => {
    const queryClient = useQueryClient();
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const restoreMutation = useMutationRestoreWellnessLectureById(() => {
        setIsModalOpen(false)
        queryClient.invalidateQueries({ queryKey: ['getWellnessLectureDetailById', centerId, id] })
    });

    const onClickRestoreButton = () => {
        restoreMutation.mutate({ centerId, id });
    }

    return <>
        <Button color="primary" variant="outlined" onClick={() => setIsModalOpen(true)}>수업 복구</Button>
        <Modal title="수업 복구하기"
            centered
            open={isModalOpen}
            onOk={() => setIsModalOpen(false)}
            onCancel={() => setIsModalOpen(false)}
            footer={<Flex justify="space-between" gap={16} style={{ marginTop: 20 }}>
                <Button style={{ flex: 1 }} onClick={() => setIsModalOpen(false)}>돌아가기</Button>
                <Button style={{ flex: 1 }} color="primary" variant="solid" onClick={() => onClickRestoreButton()}>수업 복구하기</Button>
            </Flex>}
        >
            <div className="body-content-standard">
                <div>수업 복구하시겠습니까?</div>
            </div>
        </Modal>
    </>
}

export default RestoreWellnessLecture