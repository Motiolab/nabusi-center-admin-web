import { Flex, Modal } from "antd"
import { ReactComponent as ArrowRight } from '@/assets/icon/ArrowRight.svg';
import { useState } from "react";
import CreateWellnessClassModal from "./ui/CreateWellnessClassModal";

const CreateWellnessClass = () => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    return <>
        <Flex align="center" style={{ marginLeft: 12, padding: '8px 16px', cursor: 'pointer' }} onClick={() => setIsModalOpen(true)}>
            <div className="body-content-accent" style={{ color: "var(--Neutrals-Neutrals500)" }}>그룹 수업 추가</div>
            <ArrowRight style={{ width: 16, height: 16 }} />
        </Flex>
        <Modal title="그룹 수업 추가"
            open={isModalOpen}
            onOk={() => setIsModalOpen(false)}
            onCancel={() => setIsModalOpen(false)}
            footer={false}
        >
            <CreateWellnessClassModal />
        </Modal>
    </>
}
export default CreateWellnessClass