import { Button, Divider, Flex, Input, Radio } from "antd"
import { ChangeEvent, useState } from "react"

interface IProps {
    setIsUpdateCareer: (isUpdateCareer: boolean) => void
}

const { TextArea } = Input;

const UpdateCareer = ({ setIsUpdateCareer }: IProps) => {
    const [career, setCareer] = useState<string>('- 유튜브 채널 운영\n- 삼성전자 요가 교육자\n- 더플로우요가 지도자과정 시니어\n- 잇존어패럴 엠버서더')

    return <>
        <div style={{ marginTop: 40, padding: 24 }}>
            <Flex justify="space-between" align="center">
                <div className="body-highlight-accent">주요 이력 <span className="body-caption-standard" style={{ color: 'var(--Neutrals-Neutrals500)', marginLeft: 12 }}>회원에게 보이는 내용입니다.</span></div>
                <div>
                    <Button onClick={() => setIsUpdateCareer(false)}>취소</Button>
                    <Button style={{ marginLeft: 12 }} type="primary">저장</Button>
                </div>
            </Flex>
        </div>
        <Divider style={{ margin: 0 }} />
        <div style={{ padding: 24 }}>
            <TextArea
                rows={4}
                placeholder=""
                style={{ width: '100%', marginTop: 24 }}
                value={career}
                onChange={(e) => setCareer(e.target.value)}
            />
        </div>
    </>
}

export default UpdateCareer