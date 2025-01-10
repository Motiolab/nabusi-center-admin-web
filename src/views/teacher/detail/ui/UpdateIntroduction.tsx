import { Button, Divider, Flex, Input, Radio } from "antd"
import { ChangeEvent, useState } from "react"

interface IProps {
    setIsUpdateIntroduction: (isUpdateIntroduction: boolean) => void
    initNickName: string
    initIntroduction: string
}

const { TextArea } = Input;

const UpdateIntroduction = ({ setIsUpdateIntroduction, initNickName, initIntroduction }: IProps) => {
    const [isUseNickName, setIsUseNickName] = useState<boolean>(false)
    const [nickName, setNickName] = useState<string>(initNickName)
    const [introduction, setIntroduction] = useState<string>(initIntroduction)

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