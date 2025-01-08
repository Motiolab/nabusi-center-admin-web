import { createWellnessClassByCenterId } from "@/entities/wellnessclass/api";
import { RootState } from "@/store";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Flex, Input, Table, TableProps, message } from "antd";
import { useState } from "react";
import { useSelector } from "react-redux";
import { ReactComponent as Check } from '@/assets/icon/Check.svg';
import { ReactComponent as Vector } from "@/assets/icon/Vector.svg"
import { AxiosError } from "axios";
import { useQueryGetWellnessClassNameListByCenterId } from "@/entities/wellnessclass/model";

interface DataType {
    key: string;
    name: string;
    teacherName: string;
}

const columns: TableProps<DataType>['columns'] = [
    {
        title: '이름',
        dataIndex: 'name',
        key: 'name'
    },
    {
        title: '선생님',
        dataIndex: 'teacherName',
        key: 'teacherName',
    },
]

const CreateWellnessClassModal = () => {
    const queryClient = useQueryClient();
    const [isOpenNewClassNameInput, setIsOpenNewClassNameInput] = useState<boolean>(false);
    const selectedCenterId = useSelector((state: RootState) => state.selectedCenterId)
    const [newWellnessClassName, setNewWellnessClassName] = useState<string>('');

    const { data: wellnessClassList } = useQueryGetWellnessClassNameListByCenterId(selectedCenterId);

    const createActionMutation = useMutation({
        mutationFn: (newClassName: string) => createWellnessClassByCenterId(selectedCenterId, newClassName),
        onSuccess: () => {
            setNewWellnessClassName('');
            setIsOpenNewClassNameInput(false);
            queryClient.invalidateQueries({ queryKey: ['wellnessClassList', selectedCenterId] })
        },
        onError: (error: AxiosError<string>) => message.error(error.response?.data)
    });

    const clickCheckIcon = () => {
        if (newWellnessClassName === '') {
            return alert("새로운 그룹 수업 이름을 입력해 주세요.");
        }
        createActionMutation.mutate(newWellnessClassName)
    }

    return (
        <div>
            {wellnessClassList &&
                <div>
                    <Table<DataType>
                        columns={columns}
                        scroll={{ y: 410 }}
                        pagination={false}
                        dataSource={wellnessClassList.map((wellnessClass: IGetWellnessClassNameByCenterIdAdminResponseV1) => ({
                            key: wellnessClass.id.toString(),
                            name: wellnessClass.name,
                            teacherName: wellnessClass.teacherName,
                        }))} />
                </div>
            }
            <div style={{ padding: 14 }}>
                {!isOpenNewClassNameInput ?
                    <div style={{ padding: 14, textAlign: 'center' }}>
                        <div
                            className="body-content-accent"
                            style={{ color: 'var(--Primary-Primary)', cursor: 'pointer' }}
                            onClick={() => setIsOpenNewClassNameInput(true)}
                        >
                            새로운 그룹 수업 추가
                        </div>
                    </div> : <Flex justify="space-between" style={{ alignItems: 'center' }}>
                        <Input
                            placeholder="최대 10자"
                            size="large"
                            onChange={(e) => setNewWellnessClassName(e.target.value)}
                        />
                        <div
                            style={{ padding: 8, cursor: 'pointer' }}
                            onClick={clickCheckIcon}
                        ><Check /></div>
                        <div
                            style={{ padding: 8, cursor: 'pointer' }}
                            onClick={() => setIsOpenNewClassNameInput(false)}
                        ><Vector /></div>
                    </Flex>}
            </div>
        </div>
    )
}
export default CreateWellnessClassModal;