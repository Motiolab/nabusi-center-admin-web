import { useQueryGetWellnessLectureDetailById } from "@/entities/wellnesslecture/model";
import UpdateWellnessLecture from "@/features/updatewellnesslecture";
import { RootState } from "@/store";
import { Divider, Flex } from "antd";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const WellnessLectureUpdate = () => {
    const { id } = useParams();
    const numericId = id ? parseInt(id, 10) : undefined;

    return (
        <div>
            <div style={{ backgroundColor: 'white' }}>
                <Flex style={{ padding: '20px 24px' }}>
                    <div>기본정보</div>
                </Flex>
                <Divider style={{ margin: 0 }} />
                <div style={{ padding: '20px 24px' }}>
                    {numericId && <UpdateWellnessLecture id={numericId} />}
                </div>
            </div>
        </div>
    )

}

export default WellnessLectureUpdate