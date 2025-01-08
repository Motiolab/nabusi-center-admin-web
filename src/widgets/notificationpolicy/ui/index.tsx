
import { Button, Switch } from "antd"
import { ReactComponent as Info } from '@/assets/icon/Info.svg'
import { ReactComponent as ScheduleNeutrals400 } from '@/assets/icon/ScheduleNeutrals400.svg'
import { useEffect, useRef, useState } from "react"
import './index.css'
import { CustomInput } from "@/features"
import { getNotificationPolicyByCenterId, patchOrCreateNotificationPolicy } from "../api"
import { useSelector } from "react-redux"
import { RootState } from "@/store";

const NotificationPolicy = () => {
    const [notificationPolicyId, setNotificationPolicyId] = useState<number>();
    const autoReservationRef = useRef<HTMLDivElement>(null);
    const [autoReservationText, setAutoReservationText] = useState<string>('<div class="target-title">대기했던 수업이 예약되었습니다.</div><div class="target-content">수업명: {수업명}</div><div class="target-content">수업 시간: {수업 시작 시간} - {수업 종료 시간}</div>');
    const [isActiveAutoReservation, setIsActiveAutoReservation] = useState<boolean>(false);
    const startClassBeforeRef = useRef<HTMLDivElement>(null);
    const [startClassBeforeText, setStartClassBeforeText] = useState<string>('<div class="target-title">30분 뒤 수업이 시작됩니다.</div><div class="target-content">수업명: {회원명}님, [{수업명}] 수업이 곧 시작됩니다. 수업 정보를 확인 해주세요.</div>');
    const [isStartClassBefore, setIsStartClassBefore] = useState<boolean>(false);
    const classAutoCancelRef = useRef<HTMLDivElement>(null);
    const [classAutoCancelText, setClassAutoCancelText] = useState<string>('<div class="target-title">예약하신 수업이 취소되었습니다.</div><div class="target-content">수업명: 수강 인원 미달로 [{수업명}] 수업이 자동 취소되었습니다.</div>');
    const [isClassAutoCancel, setIsClassAutoCancel] = useState<boolean>(false);
    const ticketExpireRef = useRef<HTMLDivElement>(null);
    const [ticketExpireText, setTicketExpireText] = useState<string>('<div class="target-title">수강권이 곧 만료됩니다.</div><div class="target-content">{회원명}님, \'{수강권명}\' 잔여일이 5일 남았습니다.</div>');
    const [isTicketExpire, setIsTicketExpire] = useState<boolean>(false);
    const ticketRemainingRef = useRef<HTMLDivElement>(null);
    const [ticketRemainingText, setTicketRemainingText] = useState<string>('<div class="target-title">수강권이 곧 만료됩니다.</div><div class="target-content">{회원명}님, \'{수강권명}\' 잔여 횟수가 3회 남았습니다.</div>');
    const [isTicketRemaining, setIsTicketRemaining] = useState<boolean>(false);
    const ticketStopExpireRef = useRef<HTMLDivElement>(null);
    const [ticketStopExpireText, setTicketStopExpireText] = useState<string>('<div class="target-title">정지 기간이 곧 끝나갑니다.</div><div class="target-content">{회원명}님, \'{수강권명}\' 정지 기간이 5일 남았습니다.</div>');
    const [isTicketStopExpire, setIsTicketStopExpire] = useState<boolean>(false);
    const happyBirthdayRef = useRef<HTMLDivElement>(null);
    const [happyBirthdayText, setHappyBirthdayText] = useState<string>('<div class="target-title">{회원명}님! 생일 축하드려요.</div><div class="target-content">기분 좋은 하루 보내세요 :)</div>');
    const [isHappyBirthday, setIsHappyBirthday] = useState<boolean>(false);
    const [isRequestSuccess, setIsRequestSuccess] = useState<Boolean>(false);
    const [requestLoading, setRequestLoading] = useState<boolean>(false);
    const selectedCenterId = useSelector((state: RootState) => state.selectedCenterId)

    const ininValue = (res: INotificationPolicy) => {
        setNotificationPolicyId(res.id);
        setAutoReservationText((c) => res.autoReservationText ?? c);
        setIsActiveAutoReservation((c) => res.isActiveAutoReservation ?? c);
        setStartClassBeforeText((c) => res.startClassBeforeText ?? c);
        setIsStartClassBefore((c) => res.isStartClassBefore ?? c);
        setClassAutoCancelText((c) => res.classAutoCancelText ?? c);
        setIsClassAutoCancel((c) => res.isClassAutoCancel ?? c);
        setTicketExpireText((c) => res.ticketExpireText ?? c);
        setIsTicketExpire((c) => res.isTicketExpire ?? c);
        setTicketRemainingText((c) => res.ticketRemainingText ?? c);
        setIsTicketRemaining((c) => res.isTicketRemaining ?? c);
        setTicketStopExpireText((c) => res.ticketStopExpireText ?? c);
        setIsTicketStopExpire((c) => res.isTicketStopExpire ?? c);
        setHappyBirthdayText((c) => res.happyBirthdayText ?? c);
        setIsHappyBirthday((c) => res.isHappyBirthday ?? c);
        setIsRequestSuccess(true)
    }
    useEffect(() => {
        getNotificationPolicyByCenterId(selectedCenterId)
            .then((axiosRes) => {
                const res = axiosRes.data;
                if (!res?.id) { onFinish().then(() => setIsRequestSuccess(true)); return; };
                ininValue(res)
            })
            .catch((err) => { console.log(err) })
    }, [isRequestSuccess])
    const onFinish = async () => {
        if (requestLoading) return;
        const patchOrCreateRequest: INotificationPolicy = { id: notificationPolicyId, centerId: selectedCenterId, autoReservationText, isActiveAutoReservation, startClassBeforeText, isStartClassBefore, classAutoCancelText, isClassAutoCancel, ticketExpireText, isTicketExpire, ticketRemainingText, isTicketRemaining, ticketStopExpireText, isTicketStopExpire, happyBirthdayText, isHappyBirthday, }
        setRequestLoading(true)
        patchOrCreateNotificationPolicy(patchOrCreateRequest, selectedCenterId)
            .finally(() => setRequestLoading(false))
    }

    return <>
        <div style={{ padding: "24px" }}>
            <div style={{ display: "flex", gap: "var(--Spacingxs)", padding: "var(--Spacings) var(--Spacingbase) var(--Spacings) var(--Spacingbase)", backgroundColor: "var(--Neutrals-Neutrals50)" }}>
                <Info width={16} height={16} />
                <div style={{ fontSize: "16px", color: "var(--Neutrals-Neutrals700)" }}>
                    회원 앱을 통해 발송되는 푸시(Push)알림으로 비용이 발생하지 않습니다.
                </div>
            </div>
        </div>
        <div>
            <div style={{ borderBottom: "1px solid var(--Neutrals-Neutrals200)", fontSize: "18px", fontWeight: 600, color: "var(--Base-Base-Black)", padding: "0 var(--Spacingl) var(--Spacingm) var(--Spacingl)", display: "flex", gap: "var(--Spacings)", alignItems: "center" }}>
                <ScheduleNeutrals400 width={24} height={24} />
                <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                    <div>
                        수업 알림
                    </div>
                    <Switch />
                </div>
            </div>
            {isRequestSuccess ? <CustomInput targetRef={autoReservationRef} targetContent={autoReservationText} setTargetContent={setAutoReservationText} explainContent={"대기 에서 예약으로 전환 시"} subExplain={"실시간"} subTargetContent={"예약 대기 기능을 설정했을 때만 적용됩니다."} isSwitch={isActiveAutoReservation} setIsSwitch={setIsActiveAutoReservation} />
                : <div style={{ height: "178px" }}></div>}
            {isRequestSuccess ? <CustomInput targetRef={startClassBeforeRef} targetContent={startClassBeforeText} setTargetContent={setStartClassBeforeText} explainContent={"수업 시작 30분 전"} subExplain={"수업 시작 시간 30분 전"} isSwitch={isStartClassBefore} setIsSwitch={setIsStartClassBefore} />
                : <div style={{ height: "122px" }}></div>}
            {isRequestSuccess ? <CustomInput targetRef={classAutoCancelRef} targetContent={classAutoCancelText} setTargetContent={setClassAutoCancelText} explainContent={"자동 폐강 시"} subExplain={"수업 시작 시간 5분 전"} subTargetContent="자동 폐강 기능을 설정했을 때만 적용됩니다." isSwitch={isClassAutoCancel} setIsSwitch={setIsClassAutoCancel} />
                : <div style={{ height: "150px" }}></div>}

        </div >
        <div>
            <div style={{ borderBottom: "1px solid var(--Neutrals-Neutrals200)", fontSize: "18px", fontWeight: 600, color: "var(--Base-Base-Black)", padding: "0 var(--Spacingl) var(--Spacingm) var(--Spacingl)", display: "flex", gap: "var(--Spacings)", alignItems: "center" }}>
                <ScheduleNeutrals400 width={24} height={24} />
                <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                    <div>
                        수강권 알림
                    </div>
                    <Switch />
                </div>
            </div>
            {isRequestSuccess ? <CustomInput targetRef={ticketExpireRef} targetContent={ticketExpireText} setTargetContent={setTicketExpireText} explainContent={"기간 만료 5일 전"} subExplain={"다일 오전 11:00"} isSwitch={isTicketExpire} setIsSwitch={setIsTicketExpire} />
                : <div style={{ height: "122px" }}></div>}
            {isRequestSuccess ? <CustomInput targetRef={ticketRemainingRef} targetContent={ticketRemainingText} setTargetContent={setTicketRemainingText} explainContent={"잔여 횟수 3회 남았을 때"} subExplain={"수업 예약 후 잔여 횟수 3회 남았을 때 실시간 발송"} isSwitch={isTicketRemaining} setIsSwitch={setIsTicketRemaining} />
                : <div style={{ height: "124px" }}></div>}
            {isRequestSuccess ? <CustomInput targetRef={ticketStopExpireRef} targetContent={ticketStopExpireText} setTargetContent={setTicketStopExpireText} explainContent={"정지 기간 만료 5일전"} subExplain={"당일 오전 11:00"} isSwitch={isTicketStopExpire} setIsSwitch={setIsTicketStopExpire} />
                : <div style={{ height: "122px" }}></div>}
        </div>
        <div>
            <div style={{ borderBottom: "1px solid var(--Neutrals-Neutrals200)", fontSize: "18px", fontWeight: 600, color: "var(--Base-Base-Black)", padding: "0 var(--Spacingl) var(--Spacingm) var(--Spacingl)", display: "flex", gap: "var(--Spacings)", alignItems: "center" }}>
                <ScheduleNeutrals400 width={24} height={24} />
                <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                    <div>
                        회원 알림
                    </div>
                    <Switch />
                </div>
            </div>
            {isRequestSuccess ? <CustomInput targetRef={happyBirthdayRef} targetContent={happyBirthdayText} setTargetContent={setHappyBirthdayText} explainContent={"생일 축하"} subExplain={"당일 오전 11:00"} isSwitch={isHappyBirthday} setIsSwitch={setIsHappyBirthday} />
                : <div style={{ height: "122px" }}></div>}
        </div>
        <div style={{ textAlign: "right", padding: "40px 24px 24px 24px" }}>
            <Button type="primary" onClick={onFinish}>{requestLoading ? "저장중" : "저장"}</Button>
        </div>
    </>
}

export { NotificationPolicy }