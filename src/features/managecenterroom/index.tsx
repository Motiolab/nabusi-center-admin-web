import { Flex, Modal } from "antd";
import { useState } from "react";
import { ReactComponent as ArrowRight } from '@/assets/icon/ArrowRight.svg';
import ManageCenterRoomModal from "./ui/ManageCenterRoomModal";

const ManageCenterRoom = () => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    return <>
        <Flex align="center" style={{ marginLeft: 12, padding: '8px 16px', cursor: 'pointer' }} onClick={() => setIsModalOpen(true)}>
            <div className="body-content-accent" style={{ color: "var(--Neutrals-Neutrals500)" }}>수업 장소 추가</div>
            <ArrowRight style={{ width: 16, height: 16 }} />
        </Flex>
        <Modal title="수업 장소 추가"
            open={isModalOpen}
            onOk={() => setIsModalOpen(false)}
            onCancel={() => setIsModalOpen(false)}
            footer={false}
        >
            <ManageCenterRoomModal />
        </Modal>
    </>
}

export default ManageCenterRoom