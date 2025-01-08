import { Button, Flex, Modal } from "antd";
import { useState } from "react";

interface IProps {
    disabled: boolean
    clickTransferButton: Function
    isOpenModal: boolean
    setIsOpenModal: Function
}

const TransferOwnerCenter = ({ disabled, clickTransferButton, isOpenModal, setIsOpenModal }: IProps) => {
    return <>
        <Button type="primary" disabled={disabled} block onClick={() => setIsOpenModal(true)}>Owner 변경하기</Button>
        <Modal
            title="Owner 변경"
            open={isOpenModal}
            onCancel={() => setIsOpenModal(false)}
            centered
            width={436}
            closeIcon={null}
            footer={<Flex gap={16}>
                <Button
                    style={{ width: '50%' }}
                    onClick={() => setIsOpenModal(false)}
                >취소</Button>
                <Button
                    type="primary"
                    size="large"
                    onClick={() => {
                        clickTransferButton()
                            .then((res: any) => res.data.body >= 1 && setIsOpenModal(false))
                            .catch((error: any) => console.error('error', error))
                    }}
                    style={{ width: '50%' }}>
                    변경
                </Button>
            </Flex >
            }>
            <div style={{ color: 'var(--Neutrals-Neutrals700)', marginTop: 24 }}>
                <div className="body-content-standard">
                    <div>선택한 사용자로 Owner를 변경하시겠습니까?</div>
                    <div>현재 Owner는 매니저로 역할이 변경됩니다.</div>
                </div>
            </div>
        </Modal>
    </>
}
export default TransferOwnerCenter;