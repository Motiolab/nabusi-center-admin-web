import { useMutationDeleteTeacherById } from "@/entities/teacher/model"
import { RootState } from "@/store"
import { useQueryClient } from "@tanstack/react-query"
import { Button, Modal, message } from "antd"
import { useState } from "react"
import { useSelector } from "react-redux"

interface IProps {
    centerId: number
    id: number
}

const DeleteTeacher = ({ centerId, id }: IProps) => {
    const queryClient = useQueryClient();
    const selectedCenterId = useSelector((state: RootState) => state.selectedCenterId)
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

    const deleteMutation = useMutationDeleteTeacherById((res: any) => {
        if (res.data) {
            message.success("강사가 삭제되었습니다.")
            setIsModalOpen(false)
            queryClient.invalidateQueries({ queryKey: ['getTeacherDetailById', selectedCenterId, id] })
        }
    })

    const onClickDeleteButton = () => {
        deleteMutation.mutate({ centerId, id })
    }

    return <>
        <Button color="danger" type="default" variant="outlined" onClick={() => setIsModalOpen(true)}>강사 삭제</Button>
        <Modal centered styles={{ content: { padding: "var(--Spacingml) var(--Spacingbase) var(--Spacingml) var(--Spacingbase)" } }} open={isModalOpen} footer={false} closeIcon={false} width={436} onCancel={() => setIsModalOpen(false)}>
            <div className="body-highlight-accent" style={{ color: "var(--Base-Base-Black)" }}>
                강사 삭제
            </div>
            <div className="body-content-standard" style={{ color: "var(--Neutrals-Neutrals700)", marginBlock: "20px" }}>
                강사를 삭제하시겠습니까?<br />
            </div>
            <div style={{ display: "flex", gap: "var(--Spacingbase)" }}>
                <Button className="body-content-accent" style={{ height: "52px", width: "50%" }} onClick={() => setIsModalOpen(false)}>돌아가기</Button>
                <Button className="body-content-accent" style={{ height: "52px", width: "50%", border: "1px solid var(--Error-Error)", color: "var(--Base-Base-White)", }} onClick={() => onClickDeleteButton()} type="primary" danger>삭제하기</Button>
            </div>
        </Modal>
    </>

}

export default DeleteTeacher