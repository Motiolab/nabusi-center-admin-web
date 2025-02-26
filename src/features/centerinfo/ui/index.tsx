import { DropDownResult, updateCenterInfo } from "@/features";
import { useEffect, useState } from "react";
import { Button, Checkbox, Flex, Form, Input, Modal, TimePicker, message } from "antd";
import { OutputOenString, formatNumber, cNTypeToKr } from "@/shared";
import DaumPostcode from 'react-daum-postcode';
import dayjs, { Dayjs } from "dayjs";
import { useForm } from "antd/es/form/Form";
import { krToCNType } from "@/shared/model/enToKr";
import { ReactComponent as PlusCircle } from "@/assets/icon/PlusCircle.svg"
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { getCenterInfo } from "../api";
import { ReactComponent as Clock } from '@/assets/icon/Clock.svg'
import { ReactComponent as Check } from "@/assets/icon/Check.svg"
import { ReactComponent as Close } from "@/assets/icon/Close.svg"
import { ReactComponent as Edit } from "@/assets/icon/Edit.svg"
import { ReactComponent as Trash } from "@/assets/icon/Trash.svg"
import ImageUploaderList from "@/shared/ui/ImageUploaderList";

interface IRequestContactNumber {
    id: number;
    contactType: 'LANDLINE' | 'MOBILE';
    number: string;
}
interface IRequestOpenInfo {
    id: number | undefined;
    closeTime: Dayjs;
    day: number;
    isDayOff: boolean;
    openTime: Dayjs;
}
interface IRequestRoom {
    id: number;
    name: string;
    capacity: number | null;
}
interface IRequestCenterInfoJoinAll {
    name: string;
    address: string;
    detailAddress: string;
    contactNumberList: IRequestContactNumber[];
    openInfoList: IRequestOpenInfo[];
    roomList: IRequestRoom[];
}

const { TextArea } = Input;

const CenterInfo = () => {
    const [startCheck, setStartCheck] = useState<number[]>([]);
    const [endCheck, setEndCheck] = useState<number[]>([]);
    const [isDayOffCheckList, setIsDayOffCheckList] = useState<boolean[]>([]);
    const [centerInfoJoinAll, setCenterInfoJoinAll] = useState<ICenterInfoJoinAll | undefined>(undefined);
    const [roomDeleteModalStatue, setRoomDeleteModalStatue] = useState<boolean>(false);
    const [isDaumPostcodeModal, setIsDaumPostcodeModal] = useState(false);
    const [roomModified, setRoomModified] = useState<boolean[]>([]);
    const [roomBeforeName, setRoomBeforeName] = useState<string>("");
    const [roomRemoveIdx, setRoomRemoveIdx] = useState<number>();
    const [requestLoding, setRequestLoding] = useState<boolean>(false);
    const [roadName, setRoadName] = useState<string>('');
    const [form] = useForm();
    const [uploadedUrls, setUploadedUrls] = useState<Array<string>>([]);
    const  [description, setDescription] = useState<string>('');
    const selectedCenterId = useSelector((state: RootState) => state.selectedCenterId)
    const [centerOpenInfoList, setCenterOpenInfoList] = useState<Array<IRequestOpenInfo>>(Array.from({ length: 7 }, (_, day) => ({
        id: undefined, closeTime: dayjs().hour(23).minute(0), day, openTime: dayjs().hour(5).minute(0), isDayOff: false,
    })));

    const setInitValues = (data: ICenterInfoJoinAll) => {
        const res = data;
        while (res.contactNumberList.length < 2) { res.contactNumberList.push({ id: undefined, contactType: "LANDLINE", number: "" }) }
        if (res.openInfoList.length > 0) {
            const openInfoListData = res.openInfoList.map(openInfo => ({
                id: openInfo.id,
                closeTime: dayjs(openInfo.closeTime),
                day: openInfo.day,
                openTime: dayjs(openInfo.openTime),
                isDayOff: openInfo.isDayOff
            }))
            setCenterOpenInfoList(openInfoListData)
        }
        setStartCheck(res.openInfoList.map((e) => dayjs(e.openTime).hour()))
        setEndCheck(res.openInfoList.map((e) => dayjs(e.closeTime).hour()))
        setIsDayOffCheckList(res.openInfoList.map((e) => e.isDayOff))
        setCenterInfoJoinAll(res)
        setUploadedUrls(res.imageUrlList);
        setDescription(res.description)
    }

    useEffect(() => {
        getCenterInfo(selectedCenterId)
            .then(res => setInitValues(res.data))
            .catch(err => console.error("err", err))
    }, [])

    const stateListModified = (index: number, fun: Function) => {
        fun((prevArray: any[]) => {
            const newArray = [...prevArray];
            newArray[index] = !newArray[index];
            return newArray;
        });
    };
    const setName = (index: number, name: string) => {
        form.setFieldsValue({ roomList: form.getFieldValue('roomList').map((room: any, idx: any) => idx === index ? { ...room, name: name } : room), });
    };
    const handleComplete = (data: any) => {
        let fullAddress = data.address;
        let roadName = data.roadnameEnglish;
        setRoadName(roadName);

        let extraAddress = '';

        if (data.addressType === 'R') {
            if (data.bname !== '') {
                extraAddress += data.bname;
            }
            if (data.buildingName !== '') {
                extraAddress += (extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName);
            }
            fullAddress += (extraAddress !== '' ? ` (${extraAddress})` : '');
        }
        form.setFieldValue("address", fullAddress);
        setIsDaumPostcodeModal(false);
    };

    const onFinish = (value: IRequestCenterInfoJoinAll) => {
        if (!centerInfoJoinAll) return;
        setRequestLoding(true)
        updateCenterInfo(selectedCenterId, {
            ...value,
            roadName: roadName,
            id: centerInfoJoinAll.id,
            code: centerInfoJoinAll.code,
            contactNumberList: value.contactNumberList.map((e) => ({ ...e, type: krToCNType(e.contactType) })),
            openInfoList: value.openInfoList.map((e) => ({
                ...e, openTime: e.openTime.format("YYYY-MM-DDTHH:mm:00Z"),
                closeTime: e.closeTime.format("YYYY-MM-DDTHH:mm:00Z")
            })),
            imageUrlList: uploadedUrls,
            description: description
        })
            .then((res) => { if (res.data) message.success("센터 수정 성공하였습니다.") })
            .catch((err) => { console.error("err", err); })
            .finally(() => setRequestLoding(false))
    }

    return <>
        {centerInfoJoinAll &&
            <Form onFinish={onFinish} form={form} layout="vertical">
                <div style={{ display: "flex", padding: "24px", gap: "116px" }}>
                    <div style={{ width: "41%" }}>
                        <Form.Item label="상호명" name="centerName" initialValue={centerInfoJoinAll.name}>
                            <Input style={{ height: "44px", fontSize: "16px" }} />
                        </Form.Item>
                        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "8px" }}>
                            <Form.Item label="주소" name="address" style={{ marginBottom: 0, width: "calc(100% - 53px - 8px)" }} initialValue={centerInfoJoinAll.address}>
                                <Input style={{ height: "44px", fontSize: "16px" }} disabled />
                            </Form.Item>
                            <Button type="primary" onClick={() => setIsDaumPostcodeModal(true)}>검색</Button>
                        </div>
                        <Form.Item name="detailAddress" initialValue={centerInfoJoinAll.detailAddress}>
                            <Input style={{ height: "44px", fontSize: "16px" }} />
                        </Form.Item>
                        <div style={{ display: "flex", flexDirection: "column", gap: "var(--Spacings)" }}>
                            <Form.List name={"contactNumberList"} initialValue={centerInfoJoinAll.contactNumberList.map((e, idx) => ({ ...e, type: cNTypeToKr(centerInfoJoinAll.contactNumberList[idx].contactType), number: formatNumber(e.number) }))}>
                                {fields =>
                                    <>
                                        {fields.map((filed, idx) =>
                                            <div key={idx} style={{ display: "flex", alignItems: "end", gap: "10px" }}>
                                                <Form.Item name={[filed.name, "type"]} label={idx === 0 && "연락처"} style={{ width: "100px", marginBottom: 0 }} >
                                                    <DropDownResult dropDownItemList={[{ text: "유선", value: "유선" }, { text: "휴대폰", value: "휴대폰" }]} initalObject={{ value: cNTypeToKr(centerInfoJoinAll.contactNumberList[idx].contactType), ...centerInfoJoinAll.contactNumberList[idx] }} />
                                                </Form.Item>
                                                <Form.Item name={[filed.name, "number"]} style={{ width: "calc(100% - 110px)", marginBottom: 0 }} >
                                                    <Input style={{ height: "44px", fontSize: "16px" }} />
                                                </Form.Item>
                                            </div>
                                        )}
                                    </>}
                            </Form.List>
                            <div style={{ marginBottom: "33px", color: "var(--Neutrals-Neutrals700)" }}>
                                연락처는 회원에게 노출됩니다.
                            </div>
                        </div>

                        <div style={{ marginTop: 16 }}>
                            <div>센터 이미지</div>
                            <div style={{ marginTop: 8 }}><ImageUploaderList setUploadedUrls={setUploadedUrls} initImageUrlList={uploadedUrls} /></div>
                        </div>

                        <div style={{ marginTop: 40, marginBottom: 14 }}>
                            <div style={{ width: 124 }}>센터 소개</div>
                            <div style={{ marginTop: 24 }}>
                                <TextArea
                                    rows={4}
                                    placeholder="센터 대해 간단하게 소개해 주세요."
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)} />
                            </div>
                        </div>

                    </div>
                    <div style={{ width: "50%" }}>
                        {centerInfoJoinAll.code && <>
                            <Form.Item label="센터코드" >
                                <div style={{ display: "flex", flexDirection: "column", gap: "var(--Spacingml)" }}>
                                    <div style={{ display: "flex", gap: "var(--Spacingl)" }}>
                                        <OutputOenString output={centerInfoJoinAll.code[0]} />
                                        <OutputOenString output={centerInfoJoinAll.code[1]} />
                                        <OutputOenString output={centerInfoJoinAll.code[2]} />
                                        <OutputOenString output={centerInfoJoinAll.code[3]} />
                                    </div>
                                    <div style={{ backgroundColor: "var(--Neutrals-Neutrals50)", padding: "var(--Spacingsm)", color: "var(--Neutrals-Neutrals700)", display: "flex", flexDirection: "column", gap: "var(--Spacings)" }}>
                                        <div style={{ fontWeight: 600, fontSize: "18px" }}>
                                            센터 코드 사용 방법
                                        </div>
                                        <div style={{ fontSize: "16px" }}>
                                            <div>
                                                1.사용 방법
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Form.Item>
                        </>}

                        <Form.Item label="운영 시간" >
                            <div>
                                <Form.List name={"openInfoList"} initialValue={centerOpenInfoList}>
                                    {fields => <div>
                                        {fields.map((field, idx) => <Flex style={{ justifyContent: 'space-between', padding: "var(--Spacingsm) 0", borderTop: "1px solid var(--Neutrals-Neutrals200)", color: isDayOffCheckList[idx] ? "var(--Neutrals-Neutrals300)" : "" }}>
                                            <div style={{ margin: "0 var(--Spacingm)" }}>
                                                {["월", "화", "수", "목", "금", "토", "일"][idx]}
                                            </div>
                                            <div style={{ margin: "0 0 0 var(--Spacingm)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                                <div style={{ display: "flex", alignItems: "center", gap: "var(--Spacings)" }}>
                                                    <Clock width={16} height={16} />
                                                    <div>{startCheck[idx] < 12 ? "오전" : "오후"}</div>
                                                    <Form.Item name={[field.name, "openTime"]} noStyle >
                                                        <TimePicker onChange={(e) => setStartCheck((prev) => ({ ...prev, [idx]: e.hour() }))} allowClear={false} needConfirm={false} format={"hh:mm"} minuteStep={5} variant="borderless" style={{ backgroundColor: "var(--Base-Base-White)", padding: 0, width: "45%", color: isDayOffCheckList[idx] ? "var(--Neutrals-Neutrals300)" : "" }} use12Hours suffixIcon={false} />
                                                    </Form.Item>
                                                </div>

                                            </div>
                                            <div style={{ margin: "0 0 0 var(--Spacingm)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                                <div style={{ display: "flex", alignItems: "center", gap: "var(--Spacings)" }}>
                                                    <Clock width={16} height={16} />
                                                    <div>{endCheck[idx] < 12 ? "오전" : "오후"}</div>
                                                    <Form.Item name={[field.name, "closeTime"]} noStyle >
                                                        <TimePicker onChange={(e) => setEndCheck((prev) => ({ ...prev, [idx]: e.hour() }))} allowClear={false} needConfirm={false} format={"hh:mm"} minuteStep={5} variant="borderless" style={{ backgroundColor: "var(--Base-Base-White)", padding: 0, width: "45%", color: isDayOffCheckList[idx] ? "var(--Neutrals-Neutrals300)" : "" }} use12Hours suffixIcon={false} />
                                                    </Form.Item>
                                                </div>

                                            </div>
                                            <div >
                                                <Form.Item name={[field.name, "isDayOff"]} valuePropName="checked" noStyle>
                                                    <Checkbox style={{ margin: "0 var(--Spacingm)" }} onClick={() => stateListModified(idx, setIsDayOffCheckList)} >휴무</Checkbox>
                                                </Form.Item>
                                            </div>
                                        </Flex>
                                        )}
                                    </div>}
                                </Form.List>
                            </div>
                        </Form.Item>
                        <Form.List name={"roomList"} initialValue={centerInfoJoinAll.roomList}>
                            {(fields, { add, remove }) =>
                                <div>
                                    <div>수업장소</div>
                                    {fields.map((field, idx) =>
                                        <div key={idx} style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid var(--Neutrals-Neutrals200)", padding: "var(--Spacingm) var(--Spacingm) var(--Spacingm) var(--Spacingm)" }}>
                                            <Form.Item name={[field.name, "name"]} noStyle>
                                                <Input variant={roomModified[idx] ? "outlined" : "borderless"} style={{ color: "var(--Base-Base-Black)", maxWidth: "412px", height: "40px" }} disabled={!roomModified[idx]} />
                                            </Form.Item>
                                            <div style={{ display: "flex", gap: "var(--Spacingl)", alignItems: "center" }}>
                                                {roomModified[idx]
                                                    ? <div style={{ display: 'flex', marginLeft: '15px', gap: '24px' }}>
                                                        <Check style={{ cursor: "pointer" }} width={16} height={16} onClick={() => stateListModified(idx, setRoomModified)} />
                                                        <Close style={{ cursor: "pointer" }} width={16} height={16} onClick={() => { stateListModified(idx, setRoomModified); setName(idx, roomBeforeName) }} />
                                                    </div>
                                                    : <div style={{ display: 'flex', marginLeft: '15px', gap: '24px' }}>
                                                        <Edit style={{ cursor: "pointer", color: "var(--Neutrals-Neutrals500)" }} width={16} height={16} onClick={() => { stateListModified(idx, setRoomModified); setRoomBeforeName(form.getFieldValue('roomList')[idx]?.name) }} />
                                                        <Trash style={{ cursor: "pointer", color: "var(--Neutrals-Neutrals500)" }} width={16} height={16} onClick={() => { setRoomRemoveIdx(field.name); setRoomDeleteModalStatue(true) }} />
                                                    </div>
                                                }
                                            </div>
                                        </div>
                                    )}
                                    <div style={{ margin: "var(--Spacingm)" }}>
                                        <div style={{ display: "flex", gap: "var(--Spacings)", color: "var(--Primary-Primary)", alignItems: "center" }}>
                                            <div style={{ cursor: "pointer", display: "flex", gap: "var(--Spacings)", alignItems: "center" }} onClick={() => { add(); stateListModified(fields.length, setRoomModified); }}>
                                                <div>
                                                    추가
                                                </div>
                                                <PlusCircle width={16} height={16} fill="#369AFF" />
                                            </div>
                                        </div>
                                    </div>
                                    <Modal title="수업 장소 삭제" width={436} centered open={roomDeleteModalStatue} styles={{ header: { color: "var(--Base-Base-Black)" }, content: { padding: "20px 16px" }, footer: { margin: 0 } }} footer={false} closeIcon={false} >
                                        <div style={{ marginTop: "12px" }}>
                                            <div style={{ color: "var(--Neutrals-Neutrals700)", fontSize: "16px" }}>
                                                <div>
                                                    수업 장소를 삭제하시겠습니까?
                                                </div>
                                                <div>
                                                    해당 장소로 등록된 수업은 회원에게 하이픈(-) 으로 보여집니다.
                                                </div>
                                            </div>
                                            <div style={{ display: "flex", marginTop: "20px", gap: "var(--Spacingbase)" }}>
                                                <div onClick={() => { setRoomRemoveIdx(undefined); setRoomDeleteModalStatue(false) }} style={{ cursor: "pointer", fontWeight: 600, border: "1px solid var(--Neutrals-Neutrals200)", borderRadius: "var(--Spacingxs)", padding: "12px 72px" }}>
                                                    돌아가기
                                                </div>
                                                <div onClick={() => { roomRemoveIdx?.toString() && remove(roomRemoveIdx); setRoomDeleteModalStatue(false) }} style={{ cursor: "pointer", fontWeight: 600, borderRadius: "var(--Spacingxs)", padding: "12px 84px", backgroundColor: "var(--Error-Error300)", color: "var(--Base-Base-White)" }}>
                                                    삭제
                                                </div>
                                            </div>
                                        </div>
                                    </Modal>
                                </div>}
                        </Form.List>
                    </div>
                </div >
                <div style={{ textAlign: "end", padding: "var(--Spacingl)" }}>
                    <Button type="primary" htmlType="submit">{requestLoding ? "요청 중" : "저장"}</Button>
                </div>
            </Form >}
        <Modal title="우편번호 검색" open={isDaumPostcodeModal} onCancel={() => setIsDaumPostcodeModal(false)} footer={null}>
            <DaumPostcode onComplete={handleComplete} />
        </Modal>
    </>
}

export { CenterInfo }