import { Button, Modal } from "antd"
import { useState } from "react";
import SelectMember from "@/shared/ui/selectMember";
import CheckReservation from "./ui/CheckReservation";

interface IProps {
    wellnessLectureDetail: IGetWellnessLectureDetailAdminResponseV1
}

const CreateReservation = ({ wellnessLectureDetail }: IProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [step, setStep] = useState<number>(1)
    const [selectedMember, setSelectedMember] = useState<IGetAllMemberListByCenterIdAdminResponseV1 | undefined>(undefined);

    return <>
        <Button type="primary" onClick={() => setIsModalOpen(true)}>예약 하기</Button>
        <Modal title={step === 1 ? "예약자 선택" : "예약 확인"}
            open={isModalOpen}
            onOk={() => setIsModalOpen(false)}
            onCancel={() => setIsModalOpen(false)}
            width={720}
            footer={null}
            centered
        >
            {step === 1 ? <>
                <div style={{ marginTop: 20 }}>
                    <SelectMember
                        onClickNextButton={() => setStep(2)}
                        selectedMember={selectedMember}
                        setSelectedMember={setSelectedMember} />
                </div>
            </> :
                <CheckReservation
                    wellnessLectureDetail={wellnessLectureDetail}
                    memberDetail={selectedMember}
                    onClickBeforeButton={() => {
                        setSelectedMember(undefined)
                        setStep(1)
                    }}
                    closeModal={() => setIsModalOpen(false)}
                />
            }
        </Modal>
    </>
}

export default CreateReservation