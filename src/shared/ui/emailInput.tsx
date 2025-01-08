

import { Input, Select, Space } from "antd"
import { useState } from "react";

interface IProps {
    email: { id: string, domain: string | undefined }
    setEmail: Function
}

const EmailInput = ({ email, setEmail }: IProps) => {
    const [isTyping, setIsTyping] = useState<boolean>(false);

    return (
        <div>
            <div style={{ color: 'var(--Base-Base-Black}', fontSize: 14 }}>이메일</div>
            <Space direction="horizontal" style={{ marginTop: 8 }}>
                <Input
                    placeholder="아이디"
                    size="large"
                    style={{ width: 168 }}
                    value={email.id}
                    onChange={(e) => setEmail({ ...email, id: e.target.value })}
                />
                {isTyping ? <Input
                    placeholder="직접 입력"
                    size="large"
                    style={{ width: 168 }}
                    value={email.domain}
                    prefix={<div style={{ color: 'var(--Neutrals-Neutrals500)' }}>@</div>}
                    onChange={(e) => setEmail({ ...email, domain: e.target.value })}
                /> :
                    <Select
                        placeholder="메일 선택"
                        size="large"
                        style={{ width: 168 }}
                        value={email.domain}
                        onChange={(e) => {
                            if (e === "@직접입력") {
                                setIsTyping(true)
                                setEmail({ ...email, domain: '' })
                            } else {
                                setEmail({ ...email, domain: e })
                            }
                        }}
                        optionRender={(item) => <div style={{ color: 'var(--Neutrals-Neutrals500)' }}>{item.label}</div>}
                        options={[
                            { value: '@naver.com', label: '@naver.com' },
                            { value: '@daum.net', label: '@daum.net' },
                            { value: '@hanmail.net', label: '@hanmail.net' },
                            { value: '@kakao.com', label: '@kakao.com' },
                            { value: '@google.com', label: '@google.com' },
                            { value: '@직접입력', label: '직접입력' },
                        ]}
                    />
                }
            </Space>
            <div style={{ marginTop: 8, fontSize: 14, lineHeight: '24px' }}>비밀번호를 재설정 할 때 사용합니다. 정확한 메일 주소를 입력해 주세요.</div>
        </div>
    )
}

export default EmailInput