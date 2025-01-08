import { Button, Modal } from "antd"
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useQueryGetWellnessTicketList } from "@/entities/wellnessticket/model";
import FirstStep from "./ui/FirstStep";
import SecondStep from "./ui/SecondStep";

const IssueWellnessTicket = () => {
    const selectedCenterId = useSelector((state: RootState) => state.selectedCenterId)
    const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
    const [selectedTicket, setSelectedTicket] = useState<IGetWellnessTicketAdminResponseV1>();
    const [discountValue, setDiscountValue] = useState<number>(0);
    const [step, setStep] = useState<number>(1);
    const { data: wellnessTicketList } = useQueryGetWellnessTicketList(selectedCenterId);
    if (!wellnessTicketList) return <div></div>

    return <>
        <Button type="primary" onClick={() => setIsOpenModal(true)}>수강권 발급</Button>
        <Modal
            title="수강권 추가"
            centered
            open={isOpenModal}
            onOk={() => setIsOpenModal(false)}
            onCancel={() => setIsOpenModal(false)}
            footer={null}
            width={1000}
        >

            {step === 1 ? <>
                <FirstStep onClickNextButton={(step, discountValue, selectedTicket) => {
                    setStep(step)
                    setDiscountValue(discountValue)
                    setSelectedTicket(selectedTicket)
                }} wellnessTicketList={wellnessTicketList.filter((e: IGetWellnessTicketAdminResponseV1) => !e.isDelete)} />
            </> : step === 2 ? <>
                {selectedTicket && <SecondStep
                    wellnessTicket={selectedTicket}
                    setStep={setStep} discountValue={discountValue}
                />}
            </> : <></>}
        </Modal>
    </>
}

export default IssueWellnessTicket