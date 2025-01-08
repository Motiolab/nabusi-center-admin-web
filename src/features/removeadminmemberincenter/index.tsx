import { Button, Flex, Modal } from "antd";
import { useState } from "react";

interface IProps {
    disabled: boolean
    clickDeleteButton: Function
    isOpenModal: boolean,
    setIsOpenModal: Function
}

const RemoveAdminMemberInCenter = ({ disabled, clickDeleteButton, isOpenModal, setIsOpenModal }: IProps) => {
    return <>
        <Button danger disabled={disabled} block onClick={() => setIsOpenModal(true)}>선택 삭제</Button>
        <Modal
            title="관리자 삭제"
            open={isOpenModal}
            onCancel={() => setIsOpenModal(false)}
            centered
            width={436}
            closeIcon={null}
            footer={<Flex gap={16}>
                <Button
                    style={{ width: '50%' }}
                    onClick={() => setIsOpenModal(false)}
                >돌아가기</Button>
                <Button
                    danger
                    type="primary"
                    size="large"
                    onClick={() => {
                        clickDeleteButton()
                            .then((res: any) => res.data.body >= 1 && setIsOpenModal(false))
                            .catch((error: any) => console.error('error', error))
                    }}
                    style={{ width: '50%' }}>
                    삭제
                </Button>
            </Flex >
            }>
            <div style={{ color: 'var(--Neutrals-Neutrals700)', marginTop: 24 }}>
                <div className="body-content-standard">
                    <div>선택한 관리자를 삭제하시겠습니까?</div>
                    <div>삭제 후 복구는 불가합니다.</div>
                </div>
            </div>
        </Modal>
    </>
}
export default RemoveAdminMemberInCenter;