import { RootState } from "@/store";
import { useSelector } from "react-redux";
import { useQueryGetWellnessTicketManagementNameListByCenterId } from "../model";
import { Cascader, Select } from "antd";
import { useEffect, useState } from "react";

interface IProps {
    optionList: IGetWellnessTicketManagementNameByCenterIdAdminResponseV1[]
    value: (string | number | null)[][] | undefined;
    setValue: (value: (string | number | null)[][] | undefined) => void;
    disabled: boolean
}

const MultiSelectWellnessTicketManagement = ({ optionList, value, setValue, disabled }: IProps) => {
    const [cascaderOptions, setCascaderOptions] = useState<any[]>([]);

    useEffect(() => {
        if (optionList) {
            const result: any = [];

            optionList?.forEach((item: IGetWellnessTicketManagementNameByCenterIdAdminResponseV1) => {
                if (item.wellnessTicketIssuanceName === item.wellnessTicketName) {
                    const ticket = {
                        label: item.wellnessTicketName,
                        value: item.id,
                        id: item.id,
                        wellnessTicketId: item.wellnessTicketId,
                        children: []
                    };
                    result.push(ticket);
                }
            })

            optionList?.forEach(item => {
                const countWellnessTicketId = optionList.filter((t: IGetWellnessTicketManagementNameByCenterIdAdminResponseV1) => t.wellnessTicketId === item.wellnessTicketId).length;
                if (countWellnessTicketId === 1) return;

                let ticket = result.find((t: any) => t.wellnessTicketId === item.wellnessTicketId);

                ticket.children.push({
                    label: item.wellnessTicketIssuanceName,
                    wellnessTicketId: item.wellnessTicketId,
                    value: item.id,
                    id: item.id
                });
            })

            setCascaderOptions(result);
        }
    }, [optionList])

    return <>
        <Cascader
            size="large"
            style={{ width: 500 }}
            options={cascaderOptions}
            onChange={(value) => setValue(value)}
            value={value}
            multiple
            maxTagCount={200}
            disabled={disabled}
        />
    </>
}

export default MultiSelectWellnessTicketManagement;