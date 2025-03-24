import { Button, DatePicker, Divider, Flex, Input, message } from "antd"
import styles from './styles.module.css'
import { ChangeEvent, useEffect, useState } from "react"
import SelectWellnessClass from "@/entities/wellnessclass/ui/SelectWellnessClass";
import CreateWellnessClass from "../createwellnessclass";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import SelectWellnessLectureType from "@/entities/wellnessLectureType/ui/SelectWellnessLectureType";
import CreateWellnessLectureType from "../createwellnesslecturetype";
import AddTeacher from "../addteacher";
import SelectTeacher from "@/entities/teacher/ui/SelectTeacher";
import { Dayjs } from "dayjs";
import TimeRangeList from "./ui/TimeRangeList";
import SelectCenterRoom from "@/entities/center/ui/SelectCenterRoom";
import ManageCenterRoom from "../managecenterroom";
import ImageUploaderList from "@/shared/ui/ImageUploaderList";
import { useMutationCreateWellnessLectureListWithWellnessClass } from "@/entities/wellnesslecture/model";
import { useNavigate } from "react-router-dom";
import MultiSelectWellnessTicketManagement from "@/entities/wellnessticketmanagement/ui/MultiSelectWellnessTicketManagement";
import { useQueryGetWellnessTicketManagementNameListByCenterId } from "@/entities/wellnessticketmanagement/model";
import { useQueryGetWellnessClassDetailByCenterId } from "@/entities/wellnessclass/model";

interface TimeRange {
    dayOfWeek: IDayOfWeek;
    startTime: Dayjs | null;
    endTime: Dayjs | null;
}

type IDayOfWeek = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '';

const { TextArea } = Input;

const CreateWellnessLectureList = () => {
    const navigate = useNavigate();
    const [selectedClassId, setSelectedClassId] = useState<number | undefined>(undefined);
    const selectedCenterId = useSelector((state: RootState) => state.selectedCenterId)
    const [lectureName, setLectureName] = useState<string>('')
    const [selectedLectureTypeId, setSelectedLectureTypeId] = useState<number | undefined>(undefined);
    const [selectedTeacherId, setSelectedTeacherId] = useState<number | undefined>(undefined);
    const [startDateTime, setStartDateTime] = useState<Dayjs | undefined>(undefined);
    const [endDateTime, setEndDateTime] = useState<Dayjs | undefined>(undefined);
    const [timeRanges, setTimeRanges] = useState<TimeRange[]>([{ dayOfWeek: '', startTime: null, endTime: null }]);
    const [selectedRoom, setSelectedRoom] = useState<string>('');
    const [maxReservationCnt, setMaxReservationCnt] = useState<number | undefined>(undefined);
    const [uploadedUrls, setUploadedUrls] = useState<Array<string>>([]);
    const [price, setPrice] = useState<number | undefined>(undefined);
    const [description, setDescription] = useState<string>('');
    const [selectedWellnessTicketManagementIdList, setSelectedWellnessTicketManagementIdList] = useState<(string | number | null)[][] | undefined>(undefined);
    const createMutation = useMutationCreateWellnessLectureListWithWellnessClass((res: any) => {
        if (res.data) {
            message.success('수업 생성에 성공하였습니다.');
            navigate(-1);
        }
    });

    const { data: wellnessClass } = useQueryGetWellnessClassDetailByCenterId(selectedCenterId, selectedClassId);
    const { data: wellnessTicketManagementNameList } = useQueryGetWellnessTicketManagementNameListByCenterId(selectedCenterId)

    useEffect(() => {
        if (!wellnessTicketManagementNameList) return;
        const filteredData = wellnessTicketManagementNameList
            .map((e: IGetWellnessTicketManagementNameByCenterIdAdminResponseV1) => {
                if (wellnessTicketManagementNameList.filter((i: IGetWellnessTicketManagementNameByCenterIdAdminResponseV1) => i.id === e.id).length === 1) {
                    return [e.id]
                }
                return [e.id, e.id]
            });

        setSelectedWellnessTicketManagementIdList(filteredData);
    }, [wellnessTicketManagementNameList])

    const clickCreateButton = () => {
        if (!lectureName) return message.error('수업명을 입력해주세요.')
        if (!selectedLectureTypeId) return message.error("수업 종류를 선택해주세요.")
        if (!selectedTeacherId) return message.error('코치를 선택해주세요.')
        if (!startDateTime) return message.error("시작 날짜를 입력해주세요.")
        if (!endDateTime) return message.error("종료 날짜를 입력해주세요.")
        if (timeRanges.some((range) => !range.dayOfWeek || range.startTime === null || range.endTime === null)) {
            return message.error("요일, 시작 시간, 종료 시간을 모두 입력해주세요.");
        }
        if (!selectedRoom) return message.error("장소를 선택해주세요.")
        if (!maxReservationCnt) return message.error("정원을 입력해주세요.")
        if (!selectedWellnessTicketManagementIdList || !wellnessTicketManagementNameList) return message.error("예약 가능한 수강권을 선택해주세요.");
        if (uploadedUrls.length === 0) return message.error("수업 사진을 추가해주세요.")
        if (!price) return message.error("가격을 입력해주세요.")

        const wellnessTicketManagementIdList = selectedWellnessTicketManagementIdList.map((item: (string | number | null)[]) => {
            if (item.length === 1) {
                return wellnessTicketManagementNameList.find(e => e.id === item[0])?.id as number;
            } else if (item.length === 2) {
                return item[1] as number
            } else {
                return item[item.length - 1] as number
            }
        });

        const request: ICreateWellnessLectureListWithWellnessClassAdminRequestV1 = {
            wellnessClassId: 1,
            name: lectureName,
            description: description,
            centerId: selectedCenterId,
            maxReservationCnt: maxReservationCnt,
            room: selectedRoom,
            classImageUrlList: uploadedUrls,
            teacherId: selectedTeacherId,
            wellnessLectureTypeId: selectedLectureTypeId,
            startDateTime: startDateTime,
            endDateTime: endDateTime,
            timeRangeWithDays: timeRanges.map((i: TimeRange) => ({
                ...i,
                startTime: i.startTime
                    ? i.startTime
                        .set("y", startDateTime.get("y"))
                        .set("month", startDateTime.get("month"))
                        .set("date", startDateTime.get("date"))
                        .toISOString()
                    : "",
                endTime: i.endTime
                    ? i.endTime
                        .set("y", startDateTime.get("y"))
                        .set("month", startDateTime.get("month"))
                        .set("date", startDateTime.get("date"))
                        .toISOString()
                    : "",
            })),
            wellnessTicketManagementIdList,
            price: price
        };
        createMutation.mutate(request)
    }

    useEffect(() => {
        if (!wellnessClass) return
        setLectureName(wellnessClass.name)
    }, [wellnessClass])

    return (
        <div>
            <Flex align="center" style={{ marginTop: 16 }}>
                <div style={{ width: 124 }}>그룹 수업</div>
                <SelectWellnessClass value={selectedClassId} setValue={setSelectedClassId} />
                <CreateWellnessClass />
            </Flex>
            <Flex align="center" style={{ marginTop: 16 }}>
                <div style={{ width: 124 }}>수업명</div>
                <Input
                    classNames={{ input: styles.searchInput }}
                    placeholder="수업명을 입력해 주세요"
                    style={{ width: "335px", height: 44 }}
                    value={lectureName}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => setLectureName(event.target.value)}
                    disabled={!selectedClassId}
                />
            </Flex>
            <Flex align="center" style={{ marginTop: 16 }}>
                <div style={{ width: 124 }}>수업 종류</div>
                <SelectWellnessLectureType value={selectedLectureTypeId} setValue={setSelectedLectureTypeId} disabled={!selectedClassId} />
                <CreateWellnessLectureType />
            </Flex>
            <Flex align="center" style={{ marginTop: 16 }}>
                <div style={{ width: 124 }}>코치</div>
                <SelectTeacher value={selectedTeacherId} setValue={setSelectedTeacherId} disabled={!selectedClassId} />
                <AddTeacher />
            </Flex>
            <Flex align="center" style={{ marginTop: 16 }}>
                <div style={{ width: 124 }}>수업 기간</div>
                <DatePicker placeholder="시작일" onChange={(e) => setStartDateTime(e.startOf('date'))} size="large" disabled={!selectedClassId} />
                <div style={{ margin: 8 }}>-</div>
                <DatePicker placeholder="종료일" onChange={(e) => setEndDateTime(e.startOf('date'))} size="large" disabled={!selectedClassId} />
            </Flex>
            <Flex align="center" style={{ marginTop: 16 }}>
                <div style={{ width: 124 }}>수업일</div>
                <TimeRangeList timeRanges={timeRanges} setTimeRanges={setTimeRanges} disabled={!selectedClassId} />
            </Flex>
            <Flex align="center" style={{ marginTop: 16 }}>
                <div style={{ width: 124 }}>수업 장소</div>
                <SelectCenterRoom value={selectedRoom} setValue={setSelectedRoom} disabled={!selectedClassId} />
                <ManageCenterRoom />
            </Flex>
            <Flex align="center" style={{ marginTop: 16 }}>
                <div style={{ width: 124 }}>정원</div>
                <Input
                    classNames={{ input: styles.searchInput }}
                    type="number"
                    placeholder="숫자 입력"
                    style={{ width: "160px", height: 44 }}
                    value={maxReservationCnt}
                    onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        setMaxReservationCnt(event.target.value ? Number(event.target.value) : undefined)
                    }
                    disabled={!selectedClassId}
                />
                <div style={{ margin: 12 }}>명</div>
            </Flex>
            <Flex align="center" style={{ marginTop: 16 }}>
                <div style={{ width: 124 }}>예약 가능 정기권</div>
                {wellnessTicketManagementNameList && <MultiSelectWellnessTicketManagement
                    value={selectedWellnessTicketManagementIdList}
                    setValue={(value) => setSelectedWellnessTicketManagementIdList(value)}
                    optionList={wellnessTicketManagementNameList}
                    disabled={!selectedClassId} />
                }
            </Flex>

            <Flex align="center" style={{ marginTop: 16 }}>
                <div style={{ width: 124 }}>수업 이미지</div>
                <ImageUploaderList setUploadedUrls={setUploadedUrls} disabled={!selectedClassId} />
            </Flex>

            <Flex align="center" style={{ marginTop: 16 }}>
                <div style={{ width: 124 }}>1회 가격</div>
                <Input
                    classNames={{ input: styles.searchInput }}
                    type="number"
                    placeholder="숫자만 입력해주세요."
                    style={{ width: "160px", height: 44 }}
                    value={price}
                    onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        setPrice(event.target.value ? Number(event.target.value) : undefined)
                    }
                    disabled={!selectedClassId}
                />
            </Flex>

            <div style={{ marginTop: 40, marginBottom: 14 }}>
                <div style={{ width: 124 }}>수업 소개</div>
                <Divider style={{ marginTop: 14 }} />
                <div style={{ marginTop: 24 }}>
                    <TextArea
                        rows={4}
                        placeholder="수업에 대해 간단하게 소개해 주세요."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)} />
                </div>
            </div>

            <div style={{ marginTop: 36 }}>
                <Divider style={{ margin: 0 }} />
            </div>

            <Flex align="center" style={{ marginTop: 24, justifyContent: 'space-between' }}>
                <Button onClick={() => navigate(-1)}>취소</Button>
                <Button type="primary" onClick={clickCreateButton}>추가하기</Button>
            </Flex>
        </div>
    )
}
export default CreateWellnessLectureList