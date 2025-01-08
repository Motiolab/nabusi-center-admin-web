
import { Button, Flex, Input, Modal } from "antd"
import { useState } from "react";
import DaumPostcode from 'react-daum-postcode';

interface IProps {
    addressInfo: IAddressInfo
    setAddressInfo: (addressInfo: IAddressInfo) => void
    title?: string;
    style?: React.CSSProperties
}

const SearchAddress = ({ addressInfo, setAddressInfo, title = "센터 위치", style }: IProps) => {
    const [isDaumPostcodeModal, setIsDaumPostcodeModal] = useState(false);

    const handleComplete = (data: any) => {
        let fullAddress = data.address;
        let roadName = data.roadnameEnglish;
        let extraAddress = '';
        if (data.addressType === 'R') {
            if (data.bname !== '') {
                extraAddress += data.bname;
            }
            if (data.buildingName !== '') {
                extraAddress += (extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName);
            }
            fullAddress += (extraAddress !== '' ? ` (${extraAddress})` : '');
        }
        setAddressInfo({ address: fullAddress, roadName: roadName })
        setIsDaumPostcodeModal(false);
    };

    return (<>
        <div style={{ color: 'var(--Base-Base-Black)', fontSize: '14px', ...style }}>{title}</div>
        <Flex justify="space-between" style={{ marginTop: 8 }} gap={10}>
            <div style={{ width: '100%' }}>
                <Input
                    size="large"
                    placeholder="시/도/구"
                    value={addressInfo.address}
                />
            </div>
            <div style={{ width: 54 }}>
                <Button onClick={() => setIsDaumPostcodeModal(true)}>검색</Button>
            </div>
        </Flex>

        <Modal title="우편번호 검색" open={isDaumPostcodeModal} onCancel={() => setIsDaumPostcodeModal(false)} footer={null}>
            <DaumPostcode onComplete={handleComplete} />
        </Modal>

    </>)
}

export default SearchAddress