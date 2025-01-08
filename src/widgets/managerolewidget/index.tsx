import { useState } from "react"
import { Button, Col, Row, Space, Spin, message } from "antd";
import RoleNameManagement from "@/features/rolenamemanagement";
import RoleAuthManagement from "@/features/roleauthManagement";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { LoadingOutlined } from '@ant-design/icons';
import { createRoleUrlPatternByCenterId, deleteRoleUrlPatternByCenterIdAndRoleId, updateInitRoleUrlPatternActionByCenterId, updateRoleUrlPatternActionByCenterId, getRoleAndUrlPatternByCenterId } from "@/entities/role";
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

const ManageRoleWidget = () => {
    const queryClient = useQueryClient();
    const [selectedRoleName, setSelectedRoleName] = useState<string>('OWNER');
    const selectedCenterId = useSelector((state: RootState) => state.selectedCenterId)

    const { data: roleAndUrlPatternList } = useQuery({
        queryKey: ['roleAndUrlPattern', selectedCenterId],
        queryFn: () => getRoleAndUrlPatternByCenterId(selectedCenterId),
        staleTime: 1000 * 60 * 5,
        select: (res) => res.data
    });

    const addRoleMutation = useMutation({
        mutationFn: (newRoleName: string) => createRoleUrlPatternByCenterId(selectedCenterId, newRoleName),
        onSuccess: (res) => queryClient.setQueryData(['roleAndUrlPattern'], res),
    });

    const initRoleActionMutation = useMutation({
        mutationFn: () => updateInitRoleUrlPatternActionByCenterId(selectedCenterId),
        onSuccess: (res) => queryClient.setQueryData(['roleAndUrlPattern'], res)
    });

    const changeActionMutation = useMutation({
        mutationFn: (actionName: string) =>
            updateRoleUrlPatternActionByCenterId(selectedCenterId, {
                roleName: selectedRoleName,
                actionName,
            }),
        onSuccess: (res) => queryClient.setQueryData(['roleAndUrlPattern'], res)
    });

    const deleteRoleMutation = useMutation({
        mutationFn: (roleId: number) =>
            deleteRoleUrlPatternByCenterIdAndRoleId(selectedCenterId, roleId),
        onSuccess: (res) => {
            queryClient.setQueryData(['roleAndUrlPattern'], res);
            setSelectedRoleName("OWNER");
        },
    });

    const clickDeleteRoleButton = () => {
        if (!roleAndUrlPatternList) return message.error("role 데이터가 없습니다.");
        const selectedRole = roleAndUrlPatternList.find(e => e.name === selectedRoleName);
        if (!selectedRole) {
            return message.error("role 데이터가 없습니다.");
        }
        deleteRoleMutation.mutate(selectedRole.id)
    }

    return (
        <div style={{ padding: 20 }}>
            {roleAndUrlPatternList &&
                <Row gutter={24}>
                    <Col flex="250px">
                        <RoleNameManagement
                            roleNameList={roleAndUrlPatternList.map((roleFunctionGroupList) => roleFunctionGroupList.name)}
                            selectedRoleName={selectedRoleName}
                            onSelectRoleName={(roleName: string) => setSelectedRoleName(roleName)}
                            addRoleName={(newRoleName: string) => addRoleMutation.mutate(newRoleName)} />
                    </Col>
                    <Col flex="auto">
                        <div style={{ padding: 14 }}>
                            <Space style={{ justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
                                <div className="body-content-accent">접근을 허용할 기능을 체크해주세요</div>
                                <div>
                                    <Button type="primary"
                                        onClick={() => initRoleActionMutation.mutate()}
                                        disabled={initRoleActionMutation.isPending || selectedRoleName === 'OWNER'}>
                                        {selectedRoleName === 'OWNER' ? 'OWNER는 모든 기능에 권한이 있습니다' :
                                            initRoleActionMutation.isPending ? <div><Spin size="small" indicator={<LoadingOutlined spin style={{ color: 'var(--Base-Base-White)', marginRight: 8 }} />} /> 저장 중입니다.</div> :
                                                '초기화'}
                                    </Button>
                                    <Button color="danger" variant="outlined"
                                        style={{ marginLeft: 10 }}
                                        onClick={clickDeleteRoleButton}
                                        disabled={deleteRoleMutation.isPending || selectedRoleName === 'OWNER'}>
                                        {deleteRoleMutation.isPending ? <div><Spin size="small" indicator={<LoadingOutlined spin style={{ color: 'var(--Base-Base-White)', marginRight: 8 }} />} /> 삭제 중입니다.</div> :
                                            '역할 삭제'}
                                    </Button>
                                </div>
                            </Space>
                            <RoleAuthManagement
                                selectedRoleName={selectedRoleName}
                                onClickCheckBox={(utilization: string) => changeActionMutation.mutate(utilization)}
                                urlPatternListByRoleName={roleAndUrlPatternList.find(roleAndUrlPattern => roleAndUrlPattern.name === selectedRoleName)?.urlPatternList}
                            />
                        </div>
                    </Col>
                </Row>
            }
        </div>
    )
}

export default ManageRoleWidget