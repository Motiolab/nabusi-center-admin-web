import { Button, Divider, Flex, Input, Radio } from "antd"
import { ChangeEvent, useState } from "react"

interface IProps {
    setIsUpdateIntroduction: (isUpdateIntroduction: boolean) => void
}

const { TextArea } = Input;

const UpdateIntroduction = ({ setIsUpdateIntroduction }: IProps) => {
    const [isUseNickName, setIsUseNickName] = useState<boolean>(false)
    const [nickName, setNickName] = useState<string>('줄리아')
    const [introduction, setIntroduction] = useState<string>('요가란 매트 위에서 도전과 용기를 통해 자신을 단련시키는 것입니다.\n\n 수업에서는 하나의 동작을 달성하기 위한 관절과 근육을 워밍업 하여 코어를 강화 시킨 후,\n 몸의 유연성을 향상시켜  피크 포즈에 도전합니다.')

    return <>
        <div style={{ padding: 24 }}>
            <Flex justify="space-between" align="center">
                <div className="body-highlight-accent">자기소개 <span className="body-caption-standard" style={{ color: 'var(--Neutrals-Neutrals500)', marginLeft: 12 }}>회원에게 보이는 내용입니다.</span></div>
                <div>
                    <Button onClick={() => setIsUpdateIntroduction(false)}>취소</Button>
                    <Button style={{ marginLeft: 12 }} type="primary">저장</Button>
                </div>
            </Flex>
        </div>
        <Divider style={{ margin: 0 }} />
        <div style={{ padding: 24 }}>
            <Flex align="center">
                <div className="body-content-bold" style={{ color: 'var(--Neutrals-Neutrals700)', width: 100 }}>닉네임</div>
                <Radio.Group onChange={(e) => setIsUseNickName(e.target.value)} value={isUseNickName}>
                    <Radio value={false}>사용 안함</Radio>
                    <Radio value={true}>사용함</Radio>
                </Radio.Group>
                <Input
                    placeholder="닉네임을 입력해 주세요"
                    style={{ width: "335px", height: 44 }}
                    value={nickName}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => setNickName(event.target.value)}
                />
            </Flex>
            <TextArea
                rows={4}
                placeholder=""
                style={{ width: '100%', marginTop: 24 }}
                value={introduction}
                onChange={(e) => setIntroduction(e.target.value)}
            />
        </div>
    </>
}

export default UpdateIntroduction