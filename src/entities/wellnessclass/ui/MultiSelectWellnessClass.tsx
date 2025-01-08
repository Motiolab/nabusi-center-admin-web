import { Select } from "antd";

import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useEffect } from "react";
import { useQueryGetWellnessClassNameListByCenterId } from "../model";

interface IProps {
    value: number[] | undefined;
    setValue: (value: number[]) => void;
}

const MultiSelectWellnessClass = ({ value, setValue }: IProps) => {
    const selectedCenterId = useSelector((state: RootState) => state.selectedCenterId)
    const { data: wellnessClassNameList } = useQueryGetWellnessClassNameListByCenterId(selectedCenterId)

    useEffect(() => {
        if (wellnessClassNameList) {
            setValue(wellnessClassNameList.map((wellnessClass: IGetWellnessClassNameByCenterIdAdminResponseV1) => wellnessClass.id))
        }
    }, [wellnessClassNameList])

    return (
        <div>
            <Select
                mode="multiple"
                className={`body-content-standard`}
                style={{ width: "300px" }}
                size="large"
                placeholder="그룹 수업 선택"
                onChange={(e) => setValue(e)}
                maxTagCount="responsive"
                value={value}
            >
                {wellnessClassNameList?.map((wellnessClass: IGetWellnessClassNameByCenterIdAdminResponseV1) => (
                    <Select.Option key={wellnessClass.id} value={wellnessClass.id}>
                        {wellnessClass.name}
                    </Select.Option>
                ))}
            </Select>
        </div>
    )
}

export default MultiSelectWellnessClass;