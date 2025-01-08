import { Select } from "antd";

import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { getWellnessLectureTypeNameListByCenterId } from "../api";


interface IProps {
    value: number | undefined;
    setValue: (value: number | undefined) => void;
    disabled: boolean
}

const SelectWellnessLectureType = ({ value, setValue, disabled }: IProps) => {
    const selectedCenterId = useSelector((state: RootState) => state.selectedCenterId)

    const { data: lectureTypeList } = useQuery({
        queryKey: ['lectureTypeList', selectedCenterId],
        queryFn: () => getWellnessLectureTypeNameListByCenterId(selectedCenterId),
        staleTime: 1000 * 60 * 5,
        select: (res) => res.data
    });

    return (
        <div>
            <Select
                className={`body-content-standard`}
                style={{ width: "160px", height: "44px" }}
                placeholder="종류 선택"
                value={value}
                onSelect={(e) => setValue(e)}
                disabled={disabled}
            >
                {lectureTypeList?.map((lectureType: IGetWellnessLectureTypeNameListByCenterIdAdminResponseV1) => (
                    <Select.Option key={lectureType.id} value={lectureType.id}>
                        {lectureType.name}
                    </Select.Option>
                ))}
            </Select>
        </div>
    )
}

export default SelectWellnessLectureType;