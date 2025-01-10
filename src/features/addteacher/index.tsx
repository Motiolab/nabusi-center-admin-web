import { Button, Flex, Modal } from "antd"
import { ReactComponent as ArrowRight } from '@/assets/icon/ArrowRight.svg';
import { useState } from "react";
import AddTeacherModal from "./ui/AddTeacherModal";

interface IProps {
    isButton?: boolean
}

const AddTeacher = ({ isButton }: IProps) => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    return <>
        {isButton ? <><Button type="primary" onClick={() => setIsModalOpen(true)}>코치 등록</Button>
        </> :
            <Flex align="center" style={{ marginLeft: 12, padding: '8px 16px', cursor: 'pointer' }} onClick={() => setIsModalOpen(true)}>
                <div className="body-content-accent" style={{ color: "var(--Neutrals-Neutrals500)" }}>코치 등록</div>
                <ArrowRight style={{ width: 16, height: 16 }} />
            </Flex>
        }
        <Modal title="코치 등록"
            open={isModalOpen}
            onOk={() => setIsModalOpen(false)}
            onCancel={() => setIsModalOpen(false)}
            footer={false}
        >
            <AddTeacherModal closeModal={() => setIsModalOpen(false)} />
        </Modal>
    </>
}
export default AddTeacher