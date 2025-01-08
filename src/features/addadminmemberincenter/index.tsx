import { RootState } from "@/store";
import CountrySelector from "@/shared/ui/countrySelector";
import { Button, Flex, Input, Modal, Select, message } from "antd"
import { useState } from "react";
import { useSelector } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import { inviteAdminMemberByCenterId } from "@/entities/invitationAdminMember";

interface IProps {
    roleInfoList: IGetRoleInfoByCenterIdResponseV1[]
}

const AddAdminMemberInCenter = ({ roleInfoList }: IProps) => {
    const selectedCenterId = useSelector((state: RootState) => state.selectedCenterId)
    const [isOpenSendInviteModal, setIsOpenSendInviteModal] = useState<boolean>(false);
    const [countryCode, setCountryCode] = useState<string>('82');
    const [mobile, setMobile] = useState<string>('');
    const [selectedRoleName, setSelectedRoleName] = useState<number | undefined>(roleInfoList.find(roleInfo => roleInfo.name === "MANAGER")?.id);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        const formattedValue = value.length > 0 && value[0] !== "0" ? "0" + value : value;
        setMobile(formattedValue);
    };

    const addRoleMutation = useMutation({
        mutationFn: () => {
            if (selectedRoleName === undefined) {
                throw new Error("Role ID를 선택해주세요.");
            }
            return inviteAdminMemberByCenterId(selectedCenterId, {
                mobile: `+${countryCode} ${mobile}`,
                roleId: selectedRoleName
            });
        },
        onSuccess: (res) => {
            if (res.data) {
                message.success("초대장 발송 성공");
                setMobile('');
                setIsOpenSendInviteModal(false);
            }
        },
    });

    const clickInviteButton = () => {
        const isValid = validatePhoneNumber(`+${countryCode} ${mobile}`);
        if (isValid) {
            addRoleMutation.mutate();
        } else {
            message.error("전화번호를 확인해주세요.");
        }
    }

    const validatePhoneNumber = (mobile: string) => {
        const cleanNumber = mobile.replace(/[-\s()]/g, "");
        return /^\+?[1-9]\d{1,14}$/.test(cleanNumber);
    };

    return <>
        <Button type="primary" onClick={() => setIsOpenSendInviteModal(true)}>추가</Button>
        <Modal
            title="신규 관리자 추가하기"
            open={isOpenSendInviteModal}
            onCancel={() => setIsOpenSendInviteModal(false)}
            centered
            width={436}
            footer={
                <Button type="primary" size="large" onClick={clickInviteButton}>
                    초대하기
                </Button>
            }>
            <div style={{ color: 'var(--Neutrals-Neutrals700)', marginTop: 24 }}>
                <div className="body-content-standard">
                    <div>1. 초대할 사용자의 휴대폰번호 입력</div>
                    <div>2. 가입 링크 문자 발송</div>
                    <div>3. 링크를 통해 센터 관리자 가입</div>
                </div>
                <div style={{ marginTop: 24 }}>
                    <div style={{ color: 'var(--Base-Base-Black)' }}>휴대폰번호</div>
                    <Flex justify="space-between" style={{ marginTop: 8 }} gap={8}>
                        <div style={{ width: 92 }}>
                            <CountrySelector
                                selectedValue={countryCode}
                                onChangeSelector={(countryCode: string) => setCountryCode(countryCode)} />
                        </div>
                        <div style={{ width: '100%' }}>
                            <Input
                                placeholder="초대할 사용자의 휴대폰번호를 입력해 주세요."
                                size="large"
                                value={mobile}
                                onChange={handleChange} />
                        </div>
                    </Flex>
                </div>
                {roleInfoList && <div style={{ marginTop: 24 }}>
                    <div style={{ color: 'var(--Base-Base-Black)' }}>역할 선택</div>
                    <Select
                        value={selectedRoleName}
                        style={{ width: '100%' }}
                        onChange={(value) => setSelectedRoleName(value)}
                        options={roleInfoList.filter((roleInfo) => roleInfo.name != "OWNER").map((roleInfo) => ({ value: roleInfo.id, label: roleInfo.name }))}
                        size="large"
                    />
                </div>
                }
            </div>
        </Modal>
    </>
}

export default AddAdminMemberInCenter