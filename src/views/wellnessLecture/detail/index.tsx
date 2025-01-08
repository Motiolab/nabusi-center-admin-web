import { useQueryGetWellnessLectureDetailById } from "@/entities/wellnesslecture/model";
import { RootState } from "@/store";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import WellnessLectureDetailInfo from "../ui/WellnessLectureDetailInfo";

const WellnessLectureDetail = () => {
    const { id } = useParams();
    const selectedCenterId = useSelector((state: RootState) => state.selectedCenterId)
    const numericId = id ? parseInt(id, 10) : undefined;
    const { data: wellnessLectureDetail, isError, error } = useQueryGetWellnessLectureDetailById(selectedCenterId, numericId as number);

    return <>
        {wellnessLectureDetail && <WellnessLectureDetailInfo wellnessLectureDetail={wellnessLectureDetail} />}

    </>
}
export default WellnessLectureDetail;