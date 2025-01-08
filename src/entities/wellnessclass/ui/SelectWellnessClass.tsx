import { Select } from "antd";

import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useQueryGetWellnessClassNameListByCenterId } from "../model";

interface IProps {
    value: number | undefined;
    setValue: (value: number | undefined) => void;
}

const SelectWellnessClass = ({ value, setValue }: IProps) => {
    const selectedCenterId = useSelector((state: RootState) => state.selectedCenterId)
    const { data: wellnessClassList } = useQueryGetWellnessClassNameListByCenterId(selectedCenterId)

    return (
        <div>
            <Select
                className={`body-content-standard`}
                style={{ width: "160px", height: "44px" }}
                placeholder="그룹 수업 선택"
                value={value}
                onSelect={(e) => setValue(e)}
            >
                {wellnessClassList?.map((wellnessClass: IGetWellnessClassNameByCenterIdAdminResponseV1) => (
                    <Select.Option key={wellnessClass.id} value={wellnessClass.id}>
                        {wellnessClass.name}
                    </Select.Option>
                ))}
            </Select>
        </div>
    )
}

export default SelectWellnessClass;