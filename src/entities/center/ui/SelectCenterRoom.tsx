import { Select } from "antd";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { getRoomListByCenterId } from "../room/api";


interface IProps {
    value: number | undefined;
    setValue: (value: number | undefined) => void;
    disabled: boolean
}

const SelectCenterRoom = ({ value, setValue, disabled }: IProps) => {
    const selectedCenterId = useSelector((state: RootState) => state.selectedCenterId)

    const { data: centerRoomList } = useQuery({
        queryKey: ['getRoomListByCenterId', selectedCenterId],
        queryFn: () => getRoomListByCenterId(selectedCenterId),
        staleTime: 1000 * 60 * 5,
        select: (res) => res.data
    });

    return (
        <div>
            <Select
                className={`body-content-standard`}
                style={{ width: "160px", height: "44px" }}
                placeholder="장소 선택"
                value={value}
                onSelect={(e) => setValue(e)}
                disabled={disabled}
            >
                {centerRoomList?.map((centerRoom: ICenterRoom) => (
                    <Select.Option key={centerRoom.id} value={centerRoom.id}>
                        {centerRoom.name}
                    </Select.Option>
                ))}
            </Select>
        </div>
    )
}

export default SelectCenterRoom;