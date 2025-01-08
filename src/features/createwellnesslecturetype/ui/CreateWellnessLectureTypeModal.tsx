import { RootState } from "@/store";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Flex, Input, Table, TableProps, message } from "antd";
import { useState } from "react";
import { useSelector } from "react-redux";
import { ReactComponent as Check } from '@/assets/icon/Check.svg';
import { ReactComponent as Vector } from "@/assets/icon/Vector.svg"
import { createWellnessLectureTypeByCenterId, getWellnessLectureTypeNameListByCenterId } from "@/entities/wellnessLectureType/api";
import { AxiosError } from "axios";

interface DataType {
    key: string;
    name: string;
    description: string;
}

const columns: TableProps<DataType>['columns'] = [
    {
        title: '이름',
        dataIndex: 'name',
        key: 'name'
    },
    {
        title: '설명',
        dataIndex: 'description',
        key: 'description',
    },
]

const CreateWellnessLectureTypeModal = () => {
    const queryClient = useQueryClient();
    const [isOpenNewLectureTypeInput, setIsOpenNewLectureTypeInput] = useState<boolean>(false);
    const selectedCenterId = useSelector((state: RootState) => state.selectedCenterId)
    const [newName, setNewName] = useState<string>('');
    const [newDescription, setNewDescription] = useState<string>('');

    const { data: wellnessLectureTypeList } = useQuery({
        queryKey: ['wellnessLectureTypeList', selectedCenterId],
        queryFn: () => getWellnessLectureTypeNameListByCenterId(selectedCenterId),
        staleTime: 1000 * 60 * 5,
        select: (res) => res.data
    });

    const createActionMutation = useMutation({
        mutationFn: ({ name, description }: { name: string; description: string }) =>
            createWellnessLectureTypeByCenterId(selectedCenterId, name, description),
        onSuccess: () => {
            setNewName('');
            setNewDescription('');
            setIsOpenNewLectureTypeInput(false);
            queryClient.invalidateQueries({ queryKey: ['wellnessLectureTypeList', selectedCenterId] })
            queryClient.invalidateQueries({ queryKey: ['lectureTypeList', selectedCenterId] })
        },
        onError: (error: AxiosError<string>) => message.error(error.response?.data)
    });

    const clickCheckIcon = () => {
        if (newName === '') {
            return alert("새로운 그룹 종류 이름을 입력해 주세요.");
        }

        createActionMutation.mutate({ name: newName, description: newDescription })
    }

    return (
        <div>
            {wellnessLectureTypeList &&
                <div>
                    <Table<DataType>
                        columns={columns}
                        scroll={{ y: 410 }}
                        pagination={false}
                        dataSource={wellnessLectureTypeList.map((wellnessLectureType: IGetWellnessLectureTypeNameListByCenterIdAdminResponseV1) => ({
                            key: wellnessLectureType.id.toString(),
                            name: wellnessLectureType.name,
                            description: wellnessLectureType.description,
                        }))} />
                </div>
            }
            <div style={{ padding: 14 }}>
                {!isOpenNewLectureTypeInput ?
                    <div style={{ padding: 14, textAlign: 'center' }}>
                        <div
                            className="body-content-accent"
                            style={{ color: 'var(--Primary-Primary)', cursor: 'pointer' }}
                            onClick={() => setIsOpenNewLectureTypeInput(true)}
                        >
                            새로운 수업 종류 추가
                        </div>
                    </div> : <Flex justify="space-between" style={{ alignItems: 'center' }} gap={16}>
                        <Input
                            placeholder="수업 종류"
                            size="large"
                            value={newName}
                            onChange={(e) => setNewName(e.target.value)}
                        />
                        <Input
                            placeholder="설명"
                            size="large"
                            value={newDescription}
                            onChange={(e) => setNewDescription(e.target.value)}
                        />
                        <div
                            style={{ padding: 8, cursor: 'pointer' }}
                            onClick={clickCheckIcon}
                        ><Check /></div>
                        <div
                            style={{ padding: 8, cursor: 'pointer' }}
                            onClick={() => setIsOpenNewLectureTypeInput(false)}
                        ><Vector /></div>
                    </Flex>}
            </div>
        </div>
    )
}
export default CreateWellnessLectureTypeModal;