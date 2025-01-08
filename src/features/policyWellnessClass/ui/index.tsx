import { RootState } from "@/store";
import { DropDownResult, getPolicyClassByCenterId, updatePolicyClassByCenterId } from "@/features"
import { Button, Checkbox, Form, message } from "antd"
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
interface RequestClassPolicy {
    id?: number;
    centerId: number
    reservationStart: number
    reservationEnd: number
    reservationCancelLimit: number
    autoReserveBeforeClassTime: number
    autoAbsentLimit: number
    isActiveAutoReservation: boolean
}
const PolicyWellnessClass = () => {
    const queryClient = useQueryClient();
    // const [classPolicy, setClassPolicy] = useState<IGetPolicyClassByCenterIdAdminResponseV1>();
    const selectedCenterId = useSelector((state: RootState) => state.selectedCenterId)

    const generateIBasicPropsList = (start: number, end: number, step: number): IDropDown[] => {
        const list: IDropDown[] = [];
        for (let i = start; i <= end; i += step) { list.push({ value: i.toString() }); }
        return list;
    }

    const { data: policyWellnessClass } = useQuery({
        queryKey: ["policyWellnessClass", selectedCenterId],
        queryFn: () => getPolicyClassByCenterId(selectedCenterId),
        staleTime: 1000 * 60 * 5,
        select: (res) => res.data
    })

    const changeActionMutation = useMutation({
        mutationFn: (params: IGetPolicyClassByCenterIdAdminResponseV1) =>
            updatePolicyClassByCenterId(selectedCenterId, params),
        onSuccess: (res) => queryClient.setQueryData(['policyWellnessClass'], res)
    });



    const onFinish = (value: RequestClassPolicy) => {
        if (!policyWellnessClass) return message.error("수업 정책 데이터가 없습니다.")
        const params = {
            id: policyWellnessClass.id,
            centerId: policyWellnessClass.centerId,
            reservationStart: value.reservationStart,
            reservationEnd: value.reservationEnd,
            reservationCancelLimit: value.reservationCancelLimit,
            autoReserveBeforeClassTime: value.autoReserveBeforeClassTime,
            autoAbsentLimit: value.autoAbsentLimit,
            isActiveAutoReservation: value.isActiveAutoReservation
        }
        changeActionMutation.mutate(params);
    }


    return <>
        <Form onFinish={onFinish} layout="vertical">
            <div style={{ display: "flex", gap: "40px", flexDirection: "column" }}>
                <div>
                    <div style={{ borderBottom: "1px solid var(--Neutrals-Neutrals200)", fontSize: "18px", fontWeight: 600, color: "var(--Base-Base-Black)", padding: "var(--Spacingml) var(--Spacingl) var(--Spacingm) var(--Spacingl)" }}>
                        에약 시간 정책
                    </div>
                    <div style={{ margin: "var(--Spacingl)", display: "flex", flexDirection: "column", gap: "24px" }}>
                        <div style={{ display: "flex", gap: "16px" }}>
                            <div style={{ fontSize: "14ppx", fontWeight: 600, color: "var(--Base-Base-Black)", display: "flex", alignItems: "center", width: "10.5%" }}>
                                예약 가능 시간
                            </div>
                            <div style={{ fontSize: "16px", color: "var(--Neutrals-Neutrals700)", display: "flex", alignItems: "center" }}>
                                <div style={{ paddingInline: "var(--Spacingm)" }}>
                                    수업 시작
                                </div>
                                {policyWellnessClass ? <Form.Item name={"reservationStart"} initialValue={policyWellnessClass.reservationStart.toString()} noStyle>
                                    <DropDownResult initalObject={{ value: policyWellnessClass.reservationStart.toString() }} dropDownItemList={generateIBasicPropsList(0, 30, 1)} styles={{ result: { width: "74px", color: "var(--Base-Base-Black)" } }} />
                                </Form.Item> : <DropDownResult initalObject={{ value: "10" }} dropDownItemList={generateIBasicPropsList(0, 60, 5)} styles={{ result: { width: "74px", color: "var(--Base-Base-Black)" } }} />}
                                <div style={{ paddingInline: "var(--Spacingm)" }}>
                                    일 전부터 - 수업시작
                                </div>
                                {policyWellnessClass ? <Form.Item name={"reservationEnd"} initialValue={policyWellnessClass.reservationEnd.toString()} noStyle>
                                    <DropDownResult initalObject={{ value: policyWellnessClass.reservationEnd.toString() }} dropDownItemList={generateIBasicPropsList(0, 60, 5)} styles={{ result: { width: "74px", color: "var(--Base-Base-Black)" } }} />
                                </Form.Item> : <DropDownResult initalObject={{ value: "10" }} dropDownItemList={generateIBasicPropsList(0, 60, 5)} styles={{ result: { width: "74px", color: "var(--Base-Base-Black)" } }} />}
                                <div style={{ paddingLeft: "var(--Spacingm)" }}>
                                    분 후 까지 예약 가능합니다.
                                </div>
                            </div>
                        </div>
                        <div style={{ display: "flex", gap: "16px" }}>
                            <div style={{ fontSize: "14ppx", fontWeight: 600, color: "var(--Base-Base-Black)", display: "flex", alignItems: "center", width: "10.5%" }}>
                                예약 취소 가능 시간
                            </div>
                            <div style={{ fontSize: "16px", color: "var(--Neutrals-Neutrals700)", display: "flex", alignItems: "center" }}>
                                <div style={{ paddingInline: "var(--Spacingm)" }}>
                                    수업 시작
                                </div>
                                {policyWellnessClass ? <Form.Item name={"reservationCancelLimit"} initialValue={policyWellnessClass.reservationCancelLimit.toString()} noStyle>
                                    <DropDownResult initalObject={{ value: policyWellnessClass.reservationCancelLimit.toString() }} dropDownItemList={generateIBasicPropsList(0, 60, 5)} styles={{ result: { width: "74px", color: "var(--Base-Base-Black)" } }} />
                                </Form.Item> : <DropDownResult initalObject={{ value: "10" }} dropDownItemList={generateIBasicPropsList(0, 60, 5)} styles={{ result: { width: "74px", color: "var(--Base-Base-Black)" } }} />}
                                <div style={{ paddingLeft: "var(--Spacingm)" }}>
                                    분 전 까지 취소 가능합니다.
                                </div>
                            </div>
                        </div>
                        <div style={{ display: "flex", gap: "16px" }}>
                            <div style={{ fontSize: "14ppx", fontWeight: 600, color: "var(--Base-Base-Black)", display: "flex", alignItems: "center", width: "10.5%" }}>
                                예약 대기
                            </div>
                            <div style={{ fontSize: "16px", color: "var(--Neutrals-Neutrals700)", display: "flex", alignItems: "center" }}>
                                <div style={{ paddingInline: "var(--Spacingm)" }}>
                                    공석이 생겼을 경우 수업 시작
                                </div>
                                {policyWellnessClass ? <Form.Item name={"autoReserveBeforeClassTime"} initialValue={policyWellnessClass.autoReserveBeforeClassTime.toString()} noStyle>
                                    <DropDownResult initalObject={{ value: policyWellnessClass.autoReserveBeforeClassTime.toString() }} dropDownItemList={generateIBasicPropsList(0, 60, 5)} styles={{ result: { width: "74px", color: "var(--Base-Base-Black)" } }} />
                                </Form.Item> : <DropDownResult initalObject={{ value: "10" }} dropDownItemList={generateIBasicPropsList(0, 60, 5)} styles={{ result: { width: "74px", color: "var(--Base-Base-Black)" } }} />}
                                <div style={{ paddingLeft: "var(--Spacingm)" }}>
                                    분 전 까지
                                </div>
                                <div style={{ fontWeight: 700 }}>
                                    &nbsp;자동 예약
                                </div>
                                <div style={{ paddingRight: "var(--Spacingm)" }}>
                                    됩니다.
                                </div>
                                <div >
                                    {policyWellnessClass ? <Form.Item name={"isActiveAutoReservation"} initialValue={policyWellnessClass.isActiveAutoReservation} noStyle valuePropName="checked">
                                        <Checkbox > &nbsp;&nbsp;예약 대기 사용 안함</Checkbox>
                                    </Form.Item> : <Checkbox > &nbsp;&nbsp;예약 대기 사용 안함</Checkbox>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div style={{ borderBottom: "1px solid var(--Neutrals-Neutrals200)", fontSize: "18px", fontWeight: 600, color: "var(--Base-Base-Black)", padding: "var(--Spacingml) var(--Spacingl) var(--Spacingm) var(--Spacingl)" }}>
                        자동 결석 정책
                    </div>
                    <div style={{ fontSize: "16px", color: "var(--Neutrals-Neutrals700)", margin: "var(--Spacingl)" }}>
                        <div style={{ fontSize: "16px", color: "var(--Neutrals-Neutrals700)", display: "flex", alignItems: "center" }}>
                            <div style={{ padding: "var(--Spacingm)" }}>
                                수업 시작
                            </div>
                            {policyWellnessClass ? <Form.Item name={"autoAbsentLimit"} initialValue={policyWellnessClass.autoAbsentLimit.toString()} noStyle>
                                <DropDownResult initalObject={{ value: policyWellnessClass.autoAbsentLimit.toString() }} dropDownItemList={generateIBasicPropsList(0, 60, 5)} styles={{ result: { width: "74px", color: "var(--Base-Base-Black)" } }} />
                            </Form.Item> : <DropDownResult initalObject={{ value: "10" }} dropDownItemList={generateIBasicPropsList(0, 60, 5)} styles={{ result: { width: "74px", color: "var(--Base-Base-Black)" } }} />}
                            <div style={{ padding: "var(--Spacingm) 0 var(--Spacingm) var(--Spacingm)" }}>
                                분 후 까지 출석하지 않으면
                            </div>
                            <div style={{ fontWeight: "700" }}>
                                &nbsp; 자동 결석 처리
                            </div>
                            <div>
                                &nbsp;됩니다.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div style={{ textAlign: "end", padding: "var(--Spacingl)" }}>
                <Button type="primary" htmlType="submit">{changeActionMutation.isPending ? "요청중" : "저장"}</Button>
            </div>
        </Form >
    </>
}

export { PolicyWellnessClass }