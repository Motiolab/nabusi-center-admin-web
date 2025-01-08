import { Flex, Space } from "antd";
import { RightOutlined } from '@ant-design/icons';
const CenterCodeGuide = () => {
    return (
        <div style={{ backgroundColor: 'var(--Neutrals-Neutrals50)', padding: '20px 24px' }}>
            <div style={{ lineHeight: '28px' }}>센터코드 사용방법</div>
            <div style={{ fontSize: 14, lineHeight: '24px' }}>센터 회원이 SAMATA APP에서 직접 센터를 추가할 때 사용해요</div>
            <Space style={{ alignItems: 'center', marginTop: 24 }}>
                <div>
                    <img src="https://img.positivehotel.io/2024/6/14/step1.png" alt="step1" width='200' />
                </div>
                <div>
                    <RightOutlined />
                </div>
                <div>
                    <img src="https://img.positivehotel.io/2024/6/14/step2.png" alt="step2" width='200' />
                </div>
                <div>
                    <RightOutlined />
                </div>
                <div><img src="https://img.positivehotel.io/2024/6/14/step3.png" alt="step3" width='200' /></div>
            </Space>
        </div>
    )
}

export default CenterCodeGuide;