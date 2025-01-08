
import { CheckOutlined, RightOutlined } from '@ant-design/icons';
import { Checkbox, Divider, Flex } from 'antd';

interface IProps {
    agreePolicyList: IAgreePolicy;
    setAgreePolicyList: Function;
}

const AgreePolicyForm = ({ agreePolicyList, setAgreePolicyList }: IProps) => {
    return (
        <div>
            <div
                onClick={() => setAgreePolicyList({
                    isUseTerms: true,
                    isPersonalInformation: true,
                    isSms: true,
                    isEmail: true,
                    isAppPush: true
                })}
                style={{ cursor: 'pointer' }}>
                <CheckOutlined style={{ width: 32, height: 32, cursor: 'pointer' }} /> 아래 약관에 모두 동의합니다</div>
            <Divider style={{ borderBlockStartColor: 'var(--Neutrals-Neutrals200)', margin: '8px 0' }} />
            <Flex justify='space-between' align="center" style={{ marginTop: 8 }}>
                <div>
                    <Checkbox
                        style={{ fontSize: 14, color: 'var(--Base-Base Black)' }}
                        checked={agreePolicyList.isUseTerms}
                        onChange={() => setAgreePolicyList({ ...agreePolicyList, isUseTerms: !agreePolicyList.isUseTerms })}>
                        [필수] 이용 약관 동의
                    </Checkbox>
                </div>
                <div><RightOutlined style={{ width: 32, height: 32, color: 'var(--Neutrals-Neutrals500)' }} /></div>
            </Flex>
            <Flex justify='space-between' align="center" style={{ marginTop: 8 }}>
                <div><Checkbox
                    style={{ fontSize: 14, color: 'var(--Base-Base Black)' }}
                    checked={agreePolicyList.isPersonalInformation}
                    onChange={() => setAgreePolicyList({ ...agreePolicyList, isPersonalInformation: !agreePolicyList.isPersonalInformation })}>
                    [필수] 개인정보 수집 및 이용 동의
                </Checkbox>
                </div>
                <div><RightOutlined style={{ width: 32, height: 32, color: 'var(--Neutrals-Neutrals500)' }} /></div>
            </Flex>
            <Flex justify='space-between' align="center" style={{ marginTop: 8 }}>
                <div><Checkbox
                    style={{ fontSize: 14, color: 'var(--Base-Base Black)' }}
                    checked={agreePolicyList.isSms || agreePolicyList.isEmail || agreePolicyList.isAppPush}
                    onChange={() => {
                        if (agreePolicyList.isSms || agreePolicyList.isEmail || agreePolicyList.isAppPush) {
                            setAgreePolicyList({ ...agreePolicyList, isSms: false, isEmail: false, isAppPush: false })
                        } else {
                            setAgreePolicyList({ ...agreePolicyList, isSms: true, isEmail: true, isAppPush: true })
                        }
                    }}>
                    [선택] 광고 및 마케팅 수신 동의
                </Checkbox>
                </div>
                <div><RightOutlined style={{ width: 32, height: 32, color: 'var(--Neutrals-Neutrals500)' }} /></div>
            </Flex>
            <Flex justify='space-evenly' align="center" style={{ marginTop: 16, fontSize: 14 }}>
                <div style={{ cursor: 'pointer' }} onClick={() => setAgreePolicyList({ ...agreePolicyList, isSms: !agreePolicyList.isSms })}>
                    <CheckOutlined style={{ width: 16, height: 16, color: agreePolicyList.isSms ? 'var(--Primary-Primary)' : 'var(--Neutrals-Neutrals500)' }} /> 문자 메시지
                </div>
                <div style={{ cursor: 'pointer' }} onClick={() => setAgreePolicyList({ ...agreePolicyList, isEmail: !agreePolicyList.isEmail })}>
                    <CheckOutlined style={{ width: 16, height: 16, color: agreePolicyList.isEmail ? 'var(--Primary-Primary)' : 'var(--Neutrals-Neutrals500)' }} />이메일
                </div>
                <div style={{ cursor: 'pointer' }} onClick={() => setAgreePolicyList({ ...agreePolicyList, isAppPush: !agreePolicyList.isAppPush })}
                ><CheckOutlined style={{ width: 16, height: 16, color: agreePolicyList.isAppPush ? 'var(--Primary-Primary)' : 'var(--Neutrals-Neutrals500)' }} />앱 푸시 알림
                </div>
            </Flex>
        </div>
    )
}

export default AgreePolicyForm;