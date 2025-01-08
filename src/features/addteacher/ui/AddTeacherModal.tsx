import { getMemberListToAddTeacherByCenterId } from "@/entities/member";
import { RootState } from "@/store";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, Flex, Input, Table, TableColumnsType, TableProps, message } from "antd";
import { useSelector } from "react-redux";
import { ReactComponent as Search } from '@/assets/icon/Search.svg';
import { ChangeEvent, useState } from "react";
import { addTeacherByCenterId } from "@/entities/teacher";
import { AxiosError } from "axios";

interface DataType {
    key: React.Key;
    name: string;
    mobile: string;
    roleName: string;
}

const columns: TableColumnsType<DataType> = [
    {
        title: '이름',
        dataIndex: 'name',
    },
    {
        title: '휴대폰번호',
        dataIndex: 'mobile',
    },
    {
        title: '역할',
        dataIndex: 'roleName',
    },
];

interface IProps {
    closeModal: () => void;
}


const AddTeacherModal = ({ closeModal }: IProps) => {
    const queryClient = useQueryClient();
    const selectedCenterId = useSelector((state: RootState) => state.selectedCenterId)
    const [searchText, setSearchText] = useState<string>('');
    const [selectedMemberId, setSelectedMemberId] = useState<number | undefined>(undefined);

    const { data: memberListToAddTeacher } = useQuery({
        queryKey: ['getMemberListToAddTeacherByCenterId', selectedCenterId],
        queryFn: () => getMemberListToAddTeacherByCenterId(selectedCenterId),
        staleTime: 1000 * 60 * 5,
        select: (res) => res.data
    });

    const rowSelection: TableProps<DataType>['rowSelection'] = {
        onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
            setSelectedMemberId(selectedRowKeys[0] as number);
        }
    };

    const addTeacherMutation = useMutation({
        mutationFn: (selectedMemberId: number) => {
            if (!selectedMemberId) {
                throw new Error('No member selected');
            }
            return addTeacherByCenterId(selectedCenterId, selectedMemberId)
        },
        onSuccess: (res) => {
            message.success("코치 등록이 완료되었습니다.");
            setSelectedMemberId(undefined);
            queryClient.invalidateQueries({ queryKey: ['getMemberListToAddTeacherByCenterId', selectedCenterId] })
            queryClient.invalidateQueries({ queryKey: ['teacherNameListByCenterId', selectedCenterId] })
            closeModal();
        },
        onError: (error: AxiosError<string>) => message.error(error.response?.data)
    });

    return <>
        <Flex style={{ marginTop: 20, marginBottom: 20, justifyContent: 'space-between' }}>
            <Input
                placeholder="이름 또는 휴대번호 검색"
                prefix={<Search />}
                style={{ width: "310px", backgroundColor: "var(--Base-Base-White)" }}
                value={searchText}
                onChange={(event: ChangeEvent<HTMLInputElement>) => setSearchText(event.target.value)}
                size="large"
            />
            <Button type="primary" disabled={!selectedMemberId} onClick={() => {
                if (!selectedMemberId) {
                    message.error("코치로 등록할 유절르 선택해주세요.")
                    return;
                }
                addTeacherMutation.mutate(selectedMemberId)
            }}>등록</Button>
        </Flex>

        {memberListToAddTeacher && <Table<DataType>
            rowSelection={{ type: 'radio', ...rowSelection }}
            columns={columns}
            dataSource={memberListToAddTeacher
                .filter((member: IMemberByCenterToAddTeacher) => member.name.includes(searchText) || member.mobile.includes(searchText))
                .map((member: IMemberByCenterToAddTeacher) => ({
                    key: member.memberId,
                    name: member.name,
                    mobile: member.mobile,
                    roleName: member.roleName,
                }))}
        />}
    </>
}
export default AddTeacherModal