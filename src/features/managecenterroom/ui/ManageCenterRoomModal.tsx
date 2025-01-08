


import { createWellnessClassByCenterId } from "@/entities/wellnessclass/api";
import { RootState } from "@/store";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Flex, Input, Table, TableProps, message } from "antd";
import { useState } from "react";
import { useSelector } from "react-redux";
import { ReactComponent as Check } from '@/assets/icon/Check.svg';
import { ReactComponent as Vector } from "@/assets/icon/Vector.svg"
import { createCenterRoomByCenterId, getRoomListByCenterId } from "@/entities/center/room/api";
import { AxiosError } from "axios";

interface DataType {
    key: string;
    name: string;
}

const columns: TableProps<DataType>['columns'] = [
    {
        title: '이름',
        dataIndex: 'name',
        key: 'name'
    }
]

const ManageCenterRoomModal = () => {
    const queryClient = useQueryClient();
    const [isOpenNewCenterRoomInput, setIsOpenNewCenterRoomInput] = useState<boolean>(false);
    const selectedCenterId = useSelector((state: RootState) => state.selectedCenterId)
    const [newCenterRoomName, setNewCenterRoomName] = useState<string>('');

    const { data: centerRoomList } = useQuery({
        queryKey: ['getRoomListByCenterId', selectedCenterId],
        queryFn: () => getRoomListByCenterId(selectedCenterId),
        staleTime: 1000 * 60 * 5,
        select: (res) => res.data
    });

    const createCenterRoomMutation = useMutation({
        mutationFn: (newCenterRoom: string) => createCenterRoomByCenterId(selectedCenterId, newCenterRoom),
        onSuccess: () => {
            setNewCenterRoomName('');
            setIsOpenNewCenterRoomInput(false);
            queryClient.invalidateQueries({ queryKey: ['getRoomListByCenterId', selectedCenterId] })
        },
        onError: (error: AxiosError<string>) => message.error(error.response?.data)
    });

    const clickCheckIcon = () => {
        if (newCenterRoomName === '') {
            return alert("새로운 장소 이름을 입력해 주세요.");
        }
        createCenterRoomMutation.mutate(newCenterRoomName)
    }

    return (
        <div>
            {centerRoomList &&
                <div>
                    <Table<DataType>
                        columns={columns}
                        scroll={{ y: 410 }}
                        pagination={false}
                        dataSource={centerRoomList.map((centerRoom: ICenterRoom) => ({
                            key: centerRoom.id.toString(),
                            name: centerRoom.name
                        }))} />
                </div>
            }
            <div style={{ padding: 14 }}>
                {!isOpenNewCenterRoomInput ?
                    <div style={{ padding: 14, textAlign: 'center' }}>
                        <div
                            className="body-content-accent"
                            style={{ color: 'var(--Primary-Primary)', cursor: 'pointer' }}
                            onClick={() => setIsOpenNewCenterRoomInput(true)}
                        >
                            새로운 장소 추가
                        </div>
                    </div> : <Flex justify="space-between" style={{ alignItems: 'center' }}>
                        <Input
                            placeholder="최대 10자"
                            size="large"
                            onChange={(e) => setNewCenterRoomName(e.target.value)}
                        />
                        <div
                            style={{ padding: 8, cursor: 'pointer' }}
                            onClick={clickCheckIcon}
                        ><Check /></div>
                        <div
                            style={{ padding: 8, cursor: 'pointer' }}
                            onClick={() => setIsOpenNewCenterRoomInput(false)}
                        ><Vector /></div>
                    </Flex>}
            </div>
        </div>
    )
}
export default ManageCenterRoomModal;