import { Flex, Modal } from "antd"
import { ReactComponent as ArrowRight } from '@/assets/icon/ArrowRight.svg';
import { useState } from "react";
import CreateWellnessLectureTypeModal from "./ui/CreateWellnessLectureTypeModal";

const CreateWellnessLectureType = () => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    return <>
        <Flex align="center" style={{ marginLeft: 12, padding: '8px 16px', cursor: 'pointer' }} onClick={() => setIsModalOpen(true)}>
            <div className="body-content-accent" style={{ color: "var(--Neutrals-Neutrals500)" }}>수업 종류 추가</div>
            <ArrowRight style={{ width: 16, height: 16 }} />
        </Flex>
        <Modal title="수업 종류 추가"
            open={isModalOpen}
            onOk={() => setIsModalOpen(false)}
            onCancel={() => setIsModalOpen(false)}
            footer={false}
            width={700}
        >
            <CreateWellnessLectureTypeModal />
        </Modal>
    </>
}
export default CreateWellnessLectureType