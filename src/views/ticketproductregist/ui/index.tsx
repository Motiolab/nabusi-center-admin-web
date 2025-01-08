

import { BreadCrumb } from "@/features";
import { Button, Checkbox, Form, Input, InputNumber, Modal, Radio, Select, Slider, message } from "antd";
import styles from './styles.module.css';
import { ReactComponent as Minus } from '@/assets/icon/Minus.svg';
import { ReactComponent as Plus } from '@/assets/icon/Plus.svg';
import { useForm } from "antd/es/form/Form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerTicketProduct } from "@/entities";
import { RootState } from "@/store";
import { useSelector } from "react-redux";

const TicketProductRegistView = () => {
    const [form] = useForm();
    const [usableDate, setUsableDate] = useState<number>(30);
    const [usebleDateHandwritten, setUsebleDateHandwritten] = useState<boolean>(false);
    const classTypeSelectOptionMockData = [{ id: 1, name: "TTC" }, { id: 2, name: "그룹" }, { id: 3, name: "종류 1" }, { id: 4, name: "종류 4" }, { id: 5, name: "종류 5" }]
    const [limitCntPeriod, setLimitCntPeriod] = useState<number>(1);
    const [lastPrice, setLastPrice] = useState<number>(0);
    const [typeStatus, setTypeStatus] = useState<"COUNT" | "PERIOD">("COUNT");
    const [checkSaveModalStatus, setCheckSaveModalStatus] = useState<boolean>(false);
    const [checkCancelModalStatus, setCheckCancelModalStatus] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();
    const selectedCenterId = useSelector((state: RootState) => state.selectedCenterId)
    const handleDivClick = (event: React.MouseEvent<HTMLInputElement, MouseEvent> | any, setFunction: React.Dispatch<React.SetStateAction<number>>, setForm?: Function, formName?: string) => {
        const div = event.currentTarget;
        const divRect = div.getBoundingClientRect();
        const clickPosition = event.clientX - divRect.left;
        const divWidth = divRect.width;
        if (clickPosition < divWidth / 3 * 1) {
            setFunction((prevValue) => prevValue - 1);
            if (setForm && formName) { setForm(formName, Number(event.target.value) - 1); }
        } else if (clickPosition > divWidth / 3 * 2) {
            setFunction((prevValue) => prevValue + 1);
            if (setForm && formName) { setForm(formName, Number(event.target.value) + 1); }
        }
    };
    const onFinish = (values: any) => {
        const requestBody = { ...values, centerId: selectedCenterId, isSales: true, classTypeIdList: values.classTypeIdList?.filter((q: number) => q !== 0) }
        if (!requestBody.name || !requestBody.discountPercent || !requestBody.price || !requestBody.usableDate || !requestBody.limitTypePeriod) {
            return message.error("필수 입력값을 입력해 주세요")
        }
        setLoading(true);
        registerTicketProduct(requestBody, selectedCenterId)
            .then(() => navigate("/home/wellness-ticket"))
            .catch((error) => console.error("Error", error))
            .finally(() => setLoading(false))
    };

    const numbers: number[] = Array.from({ length: 13 }, (_, index) => index);
    const marks: Record<number, React.ReactNode> = numbers.map((q, idx) => <div key={idx} style={{ width: "1px", height: "7px", backgroundColor: "var(--Neutrals-Neutrals400)", marginTop: "var(--Spacingsm)" }}></div>);
    return <>
        <div style={{ height: "100%" }}>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "var(--Spacingxs)", height: "24px", paddingBottom: "21px" }}>
                    <div style={{ color: "var(--Neutrals-Neutrals500)", fontSize: "14px" }}>
                        수강권
                    </div>
                    <div style={{ color: "var(--Neutrals-Neutrals500)", fontSize: "14px" }}>
                        /
                    </div>
                    <BreadCrumb />
                </div>
            </div>
            <div style={{ backgroundColor: "var(--Base-Base-White)", height: "calc(100% - 40px)", display: "flex", flexDirection: "column", gap: "var(--Spacingl)" }}>
                <Form form={form} onFinish={onFinish} colon={false} labelAlign="left" labelCol={{ style: { width: "136px", alignItems: "center", display: "flex" } }} >
                    <div style={{ display: "flex", flexDirection: "column", gap: "var(--Spacingl)", borderBottom: "1px solid var(--Neutrals-Neutrals200)" }}>
                        <div style={{ borderBottom: "1px solid var(--Neutrals-Neutrals200)", fontSize: "18px", fontWeight: 600, color: "var(--Base-Base-Black)", padding: "var(--Spacingml) var(--Spacingl) var(--Spacingm) var(--Spacingl)" }}>
                            기본 정보
                        </div>
                        <div style={{ marginInline: "var(--Spacingl)", marginBottom: "var(--Spacingl)" }} className="body-content-bold" >
                            <div style={{ display: "flex", height: "44px", marginBottom: "24px", gap: "var(--Spacingsm)" }}>
                                <Form.Item label="수강권명" name="name" >
                                    <Input className={styles.customInputHeight + " body-content-standard"} style={{ width: "300px", height: "44px" }} placeholder="수강권 명을 입력해 주세요" />
                                </Form.Item>
                            </div>
                            <div style={{ display: "flex", height: "44px", marginBottom: "24px", gap: "var(--Spacingsm)" }}>
                                <Form.Item label="수강권 종류" name="type" initialValue={"COUNT"} className={styles.ailineItemCenter}>
                                    <Radio.Group className="body-content-standard" style={{ width: "300px", height: "44px", display: "flex", alignItems: "center" }} onChange={(e) => setTypeStatus(e.target.value)}>
                                        <Radio value="COUNT" style={{ alignItems: "center" }}>횟수권</Radio>
                                        <Radio value="PERIOD" style={{ alignItems: "center" }}>기간권</Radio>
                                    </Radio.Group>
                                </Form.Item>
                            </div>
                            <div style={{ display: "flex", height: "44px", marginBottom: "24px", gap: "var(--Spacingsm)" }}>
                                <Form.Item label="판매가" name="price" >
                                    <InputNumber min={0} className={styles.customInputHeight + " body-content-standard"} onChange={(e) => setLastPrice(() => !e ? 0 : form.getFieldValue("discountPercent") ? ((100 - form.getFieldValue("discountPercent")) * e / 100) : e)} style={{ width: "208px", height: "44px" }} placeholder="판매가를 입력해 주세요" />
                                </Form.Item>
                                <div style={{ display: "flex", alignItems: "center" }} className="body-content-standard">원</div>
                            </div>
                            <div style={{ display: "flex", height: "44px", marginBottom: "24px", gap: "var(--Spacingsm)" }}>
                                <Form.Item label="할인율" name="discountPercent"  >
                                    <InputNumber min={0} max={100} className={styles.customInputHeight + " body-content-standard"} style={{ width: "208px", height: "44px" }} onChange={(e: number | null) => { setLastPrice(() => e ? ((100 - Number(e)) * form.getFieldValue("price") / 100) : form.getFieldValue("price")) }} placeholder="할인율을 입력해 주세요" />
                                </Form.Item>
                                <div style={{ display: "flex", alignItems: "center" }} className="body-content-standard">%</div>
                            </div>
                            <div style={{ backgroundColor: "var(--Neutrals-Neutrals50)", display: "flex", height: "44px", alignItems: "center", padding: "0px var(--Spacingbase) 0px var(--Spacingbase)", marginBlock: "40px", gap: "12px" }}>
                                <div style={{ width: "124px" }}>
                                    최종 판매가
                                </div>
                                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                                    <div style={{ width: "184px", padding: "var(--Spacings) var(--Spacingsm) var(--Spacings) var(--Spacingsm)" }}>
                                        {lastPrice.toLocaleString()}
                                    </div>
                                    <div className="body-content-standard">원</div>
                                </div>
                            </div>
                            <div style={{ display: "flex", height: usebleDateHandwritten ? "205px" : "159px", marginBottom: "24px", gap: "var(--Spacingsm)" }}>
                                <Form.Item label="유효기간" name="usableDate" labelCol={{ style: { display: "flex", alignItems: "flex-start", width: "136px" } }} initialValue={usableDate / 30}>
                                    <div className="body-content-accent" style={{ color: "var(--Primary-Primary)" }}>{(usableDate / 30).toLocaleString()}개월 {`(${usableDate}일)`}</div>
                                    <Slider value={usableDate / 30} onChange={(e) => { setUsableDate(e * 30); form.setFieldValue("usableDate", e * 30) }} marks={{ ...marks }} className={styles.sliderDotDisplayNone} styles={{ track: { backgroundColor: "var(--Primary-Primary)", height: "8px", borderRadius: "var(--Radiuss)" }, rail: { height: "8px", borderRadius: "var(--Radiuss)", backgroundColor: "var(--Neutrals-Neutrals100)" } }} min={0} max={12} style={{ width: "493px", display: "flex", alignItems: "center" }} />
                                    <div style={{ display: "flex", flexDirection: "column", gap: "var(--Spacingl)" }}>
                                        <Checkbox onChange={() => setUsebleDateHandwritten((q) => !q)} checked={usebleDateHandwritten} style={{ paddingTop: "var(--Spacingl)", width: "100px" }} className="body-content-standard">직접 입력</Checkbox>
                                        {usebleDateHandwritten &&
                                            <div style={{ display: "flex", alignItems: "center", gap: "var(--Spacingsm)" }} >
                                                <InputNumber min={0} max={360} value={usableDate} onClick={(q) => handleDivClick(q, setUsableDate, form.setFieldValue, "usableDate")} onChange={(e) => { e && setUsableDate(Number(e)); e && form.setFieldValue("usableDate", Number(e)) }} className={styles.customInputHeightAndCenter} controls={false} style={{ width: "160px", height: "44px" }} prefix={<Minus width={16} height={16} fill="var(--Neutrals-Neutrals500)" />} suffix={<Plus width={16} height={16} fill="var(--Neutrals-Neutrals500)" />} />
                                                <div className="body-content-standard">일</div>
                                            </div>
                                        }
                                    </div>
                                </Form.Item>
                            </div>

                            {typeStatus === "COUNT" && <div style={{ display: "flex", height: "44px", marginBottom: "24px", gap: "var(--Spacingsm)" }}>
                                <Form.Item label="사용 가능 횟수" name="usableCnt" >
                                    <InputNumber className={styles.customInputHeight + " body-content-standard"} style={{ width: "208px", height: "44px" }} placeholder="사용 가능 횟수를 입력해 주세요" />
                                </Form.Item>
                                <div style={{ display: "flex", alignItems: "center" }} className="body-content-standard">회</div>
                            </div>}
                            <Form.Item label="이용제한" name="limitTypePeriod" style={{ height: "44px", width: "688px" }} initialValue={"WEEKLY"}>
                                <Radio.Group className="body-content-standard" style={{ height: "44px", display: "flex", alignItems: "center" }}>
                                    <Radio value="WEEKLY" style={{ alignItems: "center" }}>주간</Radio>
                                    <Radio value="MONTHLY" style={{ alignItems: "center" }}>월간</Radio>
                                    <Radio value="UNLIMITED" style={{ alignItems: "center" }}>이용 제한 없음</Radio>
                                </Radio.Group>
                            </Form.Item>
                            <div style={{ display: "flex", height: "44px", marginBottom: "24px", gap: "var(--Spacingsm)" }}>
                                <Form.Item label name="limitCntPeriod" style={{ height: "44px" }} className={styles.formCustomInputFLexAndCenter} initialValue={1}>
                                    <InputNumber min={0} max={360} value={limitCntPeriod} onClick={(q) => handleDivClick(q, setLimitCntPeriod, form.setFieldValue, "limitCntPeriod")} onChange={(e) => { e && setLimitCntPeriod(Number(e)); e && form.setFieldValue("limitCntPeriod", Number(e)) }} className={styles.customInputHeightAndCenter} controls={false} style={{ width: "160px", height: "44px" }} prefix={<Minus width={16} height={16} fill="var(--Neutrals-Neutrals500)" />} suffix={<Plus width={16} height={16} fill="var(--Neutrals-Neutrals500)" />} />
                                </Form.Item>
                                <div style={{ height: "44px", display: "flex", alignItems: "center" }} className="body-content-standard">회 이용 가능</div>
                            </div>
                            <div style={{ display: "flex", height: "44px", marginBottom: "24px", gap: "var(--Spacingsm)" }}>
                                <Form.Item name="classTypeIdList" label="예약 가능 수업 종류" style={{ height: "44px" }} >
                                    <Select onSelect={(q) => q === 0 && form.setFieldValue("classTypeIdList", [0, ...classTypeSelectOptionMockData.map((w) => w.id)])} mode="multiple" className={`body-content-standard ${styles.overFlowScroll}`} style={{ width: "300px", height: "44px" }}>
                                        <Select.Option value={0}>수업 종류 전체</Select.Option>
                                        {classTypeSelectOptionMockData.map((q, idx) => <Select.Option key={idx + 1} value={q.id}>{q.name}</Select.Option>)}
                                    </Select>
                                </Form.Item>
                                <div style={{ height: "44px", display: "flex", alignItems: "center" }} className="body-content-standard">수업만 예약 가능</div>
                            </div>
                        </div>
                    </div>
                    <div style={{ display: "flex", gap: "var(--Spacingml)", justifyContent: "right", padding: "var(--Spacingl)" }}>
                        <Button onClick={() => setCheckCancelModalStatus(true)}>취소</Button>
                        <Button onClick={() => setCheckSaveModalStatus(true)} type="primary">등록하기</Button>
                    </div>
                </Form >
            </div >
        </div >
        <Modal centered styles={{ content: { padding: "var(--Spacingml) var(--Spacingbase) var(--Spacingml) var(--Spacingbase)" } }} open={checkSaveModalStatus} footer={false} closeIcon={false} width={436} onCancel={() => setCheckSaveModalStatus(false)}>
            <div className="body-highlight-accent" style={{ color: "var(--Base-Base-Black)" }}>
                수업 저장하기
            </div>
            <div style={{ color: "var(--Neutrals-Neutrals700)", marginBlock: "20px" }}>
                <div className="body-content-standard">
                    입력하신 내용대로 수강권을 변경하시겠습니까?
                </div>
                <div>
                    <div className="body-content-accent">
                        저장 즉시 기존 발급 수강권도 변경되는 항목
                    </div>
                    <div className="body-content-standard">
                        &nbsp;&middot;&nbsp;수강권명<br />
                        &nbsp;&middot;&nbsp;예약 가능 수업 종류<br />
                    </div>
                </div>
                <div style={{ marginTop: "24px" }}>
                    <div className="body-content-accent">
                        저장 이후 발급된 수강권부터 적용되는 항목
                    </div>
                    <div className="body-content-standard">
                        &nbsp;&middot;&nbsp;최종 판매가<br />
                        &nbsp;&middot;&nbsp;사용 가능 횟수 (기간권 제외)<br />
                        &nbsp;&middot;&nbsp;이용 제한<br />
                    </div>
                </div>
            </div>
            <div style={{ display: "flex", gap: "var(--Spacingbase)" }}>
                <Button style={{ height: "52px", width: "50%" }} onClick={() => setCheckSaveModalStatus(false)}>돌아가기</Button>
                <Button disabled={loading} style={{ height: "52px", width: "50%" }} onClick={() => onFinish(form.getFieldsValue())} type="primary">{loading ? "저장 중" : "저장하기"}</Button>
            </div>
        </Modal>
        <Modal centered styles={{ content: { padding: "var(--Spacingml) var(--Spacingbase) var(--Spacingml) var(--Spacingbase)" } }} open={checkCancelModalStatus} footer={false} closeIcon={false} width={436} onCancel={() => setCheckCancelModalStatus(false)}>
            <div className="body-highlight-accent" style={{ color: "var(--Base-Base-Black)" }}>
                수정 그만하기
            </div>
            <div style={{ color: "var(--Neutrals-Neutrals700)", marginBlock: "20px" }}>
                수정을 그만하시겠습니까?<br />
                변경했던 내용은 저장되지 않습니다.<br />
            </div>
            <div style={{ display: "flex", gap: "var(--Spacingbase)" }}>
                <Button style={{ height: "52px", width: "50%" }} onClick={() => setCheckCancelModalStatus(false)}>돌아가기</Button>
                <Button style={{ height: "52px", width: "50%" }} onClick={() => navigate(-1)} type="primary" danger>그만하기</Button>
            </div>
        </Modal>
    </>
}


export { TicketProductRegistView };