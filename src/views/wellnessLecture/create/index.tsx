import CreateWellnessLectureList from "@/features/createwellnesslecturelist"
import { Divider, Flex } from "antd"

const WellnessLectureCreate = () => {
    return (
        <div>
            <div style={{ backgroundColor: 'white' }}>
                <Flex style={{ padding: '20px 24px' }}>
                    <div>기본정보</div>
                    <div>※ 모든 정보는 회원 앱에 노출됩니다</div>
                </Flex>
                <Divider style={{ margin: 0 }} />
                <div style={{ padding: '20px 24px' }}>
                    <CreateWellnessLectureList />
                </div>
            </div>
        </div>
    )
}

export default WellnessLectureCreate