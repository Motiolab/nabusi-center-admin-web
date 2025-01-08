import { Button, Flex, Input, Select, Space } from "antd"

interface IProps {
    gender: "여성" | "남성" | "선택 안함"
    setGender: Function
}

const GenderInput = ({ gender, setGender }: IProps) => {

    return (
        <div>
            <div style={{ color: 'var(--Base-Base-Black}', fontSize: 14 }}>성별</div>
            <Flex gap="small" wrap style={{ marginTop: 12 }}>
                <Button
                    type={gender === '여성' ? "primary" : "default"}
                    onClick={() => setGender("여성")}
                    size="large">
                    여성
                </Button>
                <Button
                    type={gender === '남성' ? "primary" : "default"}
                    onClick={() => setGender("남성")}
                    size="large">
                    남성
                </Button>
                <Button
                    type={gender === '선택 안함' ? "primary" : "default"}
                    onClick={() => setGender("선택 안함")}
                    size="large">
                    선택 안함
                </Button>
            </Flex>
        </div>
    )
}

export default GenderInput