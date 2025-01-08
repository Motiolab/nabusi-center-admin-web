import { RootState } from "@/store"
import AddAdminMemberInCenter from "@/features/addadminmemberincenter"
import AdminMemberListTable from "@/features/adminmemberlisttable"
import { getAdminMemberListByCenterId } from "@/entities/member"
import { ReactComponent as Search } from '@/assets/icon/Search.svg';
import { Button, Flex, Input, Space, message } from "antd"
import { ChangeEvent, useState } from "react"
import { useSelector } from "react-redux"
import styles from './styles.module.css'
import RemoveAdminMemberInCenter from "@/features/removeadminmemberincenter"
import { deleteAdminRoleByMemberIdList } from "@/entities/member/centerAdminMember"
import TransferOwnerCenter from "@/features/transferownercenter"
import { updateMemberRole, passOwnerRole } from "@/entities/member/updateOwnerCenterAdminMember"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getRoleInfoListByCenterId } from "@/entities/role";

const AdminMemberListWidget = () => {
    const queryClient = useQueryClient();
    const selectedCenterId = useSelector((state: RootState) => state.selectedCenterId)
    const [searchText, setSearchText] = useState<string>('');
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [selectionType, setSelectionType] = useState<'checkbox' | 'radio'>('checkbox');
    const [isOpenRemoveAdminMemberModal, setIsOpenRemoveAdminMemberModal] = useState<boolean>(false);
    const [isOpenTransferOwnerCenterModal, setIsOpenTransferOwnerCenterModal] = useState<boolean>(false);

    const { data: adminMemberList } = useQuery({
        queryKey: ['adminMemberList', selectedCenterId],
        queryFn: () => getAdminMemberListByCenterId(selectedCenterId),
        staleTime: 1000 * 60 * 5,
        select: (res) => res.data
    });

    const { data: roleInfoList } = useQuery({
        queryKey: ['roleInfoList', selectedCenterId],
        queryFn: () => getRoleInfoListByCenterId(selectedCenterId),
        staleTime: 1000 * 60 * 5,
        select: (res) => res.data
    });

    const deleteActionMutation = useMutation({
        mutationFn: () => {
            if (selectedCenterId === 0) throw new Error('Center ID is not selected.');
            return deleteAdminRoleByMemberIdList(selectedCenterId, selectedRowKeys as number[]);
        },
        onSuccess: (res) => {
            setSelectedRowKeys([]);
            setSelectionType('checkbox');
            setIsOpenRemoveAdminMemberModal(false);
            queryClient.invalidateQueries({ queryKey: ['adminMemberList', selectedCenterId] });
        },
        onError: (error) => {
            message.error("삭제를 실패했습니다." + error.message)
            setIsOpenRemoveAdminMemberModal(false);
        }
    });

    const requestTransferOwnerCenterMutation = useMutation({
        mutationFn: () => {
            if (selectedCenterId === 0 || selectedRowKeys.length === 0) throw new Error('Center ID is not selected.');
            return passOwnerRole(selectedCenterId, selectedRowKeys[0] as number);
        },
        onSuccess: (res) => {
            setSelectedRowKeys([]);
            setSelectionType('checkbox');
            setIsOpenTransferOwnerCenterModal(false);
            queryClient.invalidateQueries({ queryKey: ['adminMemberList', selectedCenterId] });
        },
        onError: (error) => {
            message.error("Owner 권한 변경 실패했습니다." + error.message)
            console.error('Error during owner transfer:', error);
        }
    });


    const clickTransferButton = (value: 'checkbox' | 'radio') => {
        setSelectionType(value);
        setSelectedRowKeys([]);
    }

    const changeActionMutation = useMutation({
        mutationFn: (params: { roleId: number, memberId: number }) =>
            updateMemberRole(selectedCenterId, params.roleId, params.memberId),
        onSuccess: (res) => {
            setSelectedRowKeys([]);
            setSelectionType('checkbox');
            return queryClient.invalidateQueries({ queryKey: ['adminMemberList', selectedCenterId] })
        }
    });


    const clickChangeRole = async (roleId: number, memberId: number) => {
        changeActionMutation.mutate({ roleId, memberId });
    }

    return <>
        <div style={{ padding: 24 }}>
            <Flex justify="space-between">
                <Flex gap={24}>
                    {roleInfoList && <AddAdminMemberInCenter roleInfoList={roleInfoList} />}
                    <Input
                        classNames={{ input: styles.searchInput }}
                        placeholder="이름 또는 휴대번호 검색"
                        prefix={<Search />}
                        style={{ width: "310px", backgroundColor: "var(--Base-Base-White)" }}
                        value={searchText}
                        onChange={(event: ChangeEvent<HTMLInputElement>) => setSearchText(event.target.value)}
                    />
                </Flex>
                {selectionType === 'checkbox' ? <div>
                    <RemoveAdminMemberInCenter
                        disabled={(Array.isArray(selectedRowKeys) && selectedRowKeys.length === 0)}
                        clickDeleteButton={() => deleteActionMutation.mutateAsync()}
                        isOpenModal={isOpenRemoveAdminMemberModal}
                        setIsOpenModal={(isOpen: boolean) => setIsOpenRemoveAdminMemberModal(isOpen)}
                    />
                </div> : <div>
                    <Space>
                        <Button onClick={() => {
                            setSelectionType('checkbox')
                            setSelectedRowKeys([])
                        }}>취소</Button>
                        <TransferOwnerCenter
                            disabled={(Array.isArray(selectedRowKeys) && selectedRowKeys.length === 0)}
                            clickTransferButton={() => requestTransferOwnerCenterMutation.mutateAsync()}
                            isOpenModal={isOpenTransferOwnerCenterModal}
                            setIsOpenModal={(isOpen: boolean) => setIsOpenTransferOwnerCenterModal(isOpen)}
                        />
                    </Space>
                </div>}
            </Flex>
            {(adminMemberList && roleInfoList) &&
                <div style={{ marginTop: 20 }}>
                    <AdminMemberListTable
                        selectedRowKeys={selectedRowKeys}
                        setSelectedRowKeys={setSelectedRowKeys}
                        adminMemberList={adminMemberList.filter((member: IAdminMemberByCenter) => member.name.includes(searchText) || member.mobile.includes(searchText))}
                        selectionType={selectionType}
                        setSelectionType={clickTransferButton}
                        roleInfoList={roleInfoList}
                        clickChangeRole={clickChangeRole}
                    />
                </div>}
        </div >
    </>
}

export default AdminMemberListWidget