import { ReactComponent as PlusCircle } from "@/assets/icon/PlusCircle.svg"
import CenterNameInput from "@/shared/ui/centerNameInput";
import { Button, Input, Modal, Space } from "antd";
import { useState } from "react";
import SearchAddress from "../searchAddress";
import { createCenter } from "@/entities/companyManagement";
import { AxiosResponse } from "axios";

interface IProps {
    onSuccess?: Function
}
const RegisterCenter = ({ onSuccess }: IProps) => {
    const [isOpenRegisterCenterModal, setIsOpenRegisterCenterModal] = useState<boolean>(false)
    const [centerName, setCenterName] = useState<string>('');
    const [addressInfo, setAddressInfo] = useState<IAddressInfo>({ address: '', roadName: '' });
    const [addressDetail, setAddressDetail] = useState<string>('');

    const clickRegisterButton = () => {
        const request: ICreateCenter = {
            name: centerName,
            address: addressInfo.address,
            detailAddress: addressDetail,
            roadName: addressInfo.roadName
        }
        createCenter(request)
            .then((res: AxiosResponse<boolean>) => {
                if (res.data === true) {
                    onSuccess?.()
                    setIsOpenRegisterCenterModal(false)
                }
            })
            .catch((e: Error) => {
                console.error('error', e)
            })
    }

    return (<>
        <div style={{ border: '1px solid var(--Neutrals-Neutrals100)', padding: 20, textAlign: 'center' }}>
            <div className="body-caption-standard" style={{ color: 'var(--Neutrals-Neutrals500)' }}>센터를 운영중이신가요?</div>
            <Space style={{ cursor: 'pointer' }} onClick={() => setIsOpenRegisterCenterModal(true)}>
                <div className="body-content-accent" style={{ color: 'var(--Primary-Primary)', marginTop: 4 }}>새로운 센터 등록하기</div>
                <div style={{ marginTop: 5 }}><PlusCircle width={16} height={16} fill="#369AFF" /></div>
            </Space>
        </div>

        <Modal
            title="새로운 센터 등록하기"
            open={isOpenRegisterCenterModal}
            onCancel={() => setIsOpenRegisterCenterModal(false)}
            centered
            width={436}
            footer={
                <Button type="primary" size="large" onClick={() => clickRegisterButton()}>
                    등록하기
                </Button>
            }>
            <div style={{ color: 'var(--Neutrals-Neutrals700)' }}>
                <div className="desktop-body-content-regular">센터 등록 시 자동으로 Owner로 설정됩니다.</div>
                <div style={{ marginTop: 24 }}>
                    <CenterNameInput centerName={centerName} setCenterName={setCenterName} />
                </div>
                <div style={{ marginTop: 24 }}>
                    <SearchAddress addressInfo={addressInfo} setAddressInfo={setAddressInfo} />
                    <Input
                        size="large"
                        placeholder="상세 주소를 입력해 주세요"
                        value={addressDetail}
                        onChange={(e) => setAddressDetail(e.target.value)}
                        style={{ marginTop: 8 }}
                    />
                </div>
            </div>
        </Modal>
    </>)
}
export default RegisterCenter;