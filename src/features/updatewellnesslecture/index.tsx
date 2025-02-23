import { RootState } from "@/store";
import { useQueryClient } from "@tanstack/react-query";
import { ChangeEvent, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import dayjs, { Dayjs } from "dayjs";
import { Button, DatePicker, Divider, Flex, Input, TimePicker, message } from "antd";
import { useQueryGetWellnessTicketManagementNameListByCenterId } from "@/entities/wellnessticketmanagement/model";
import styles from './styles.module.css'
import SelectWellnessLectureType from "@/entities/wellnessLectureType/ui/SelectWellnessLectureType";
import CreateWellnessLectureType from "../createwellnesslecturetype";
import SelectTeacher from "@/entities/teacher/ui/SelectTeacher";
import AddTeacher from "../addteacher";
import MultiSelectWellnessTicketManagement from "@/entities/wellnessticketmanagement/ui/MultiSelectWellnessTicketManagement";
import ImageUploaderList from "@/shared/ui/ImageUploaderList";
import { useMutationUpdateWellnessLecture, useQueryGetWellnessLectureDetailById } from "@/entities/wellnesslecture/model";

const { TextArea } = Input;

interface IProps {
    id: number
}
const UpdateWellnessLecture = ({ id }: IProps) => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const selectedCenterId = useSelector((state: RootState) => state.selectedCenterId)
    const [name, setName] = useState<string>('')
    const [selectedLectureTypeId, setSelectedLectureTypeId] = useState<number | undefined>(undefined);
    const [selectedTeacherId, setSelectedTeacherId] = useState<number | undefined>(undefined);
    const [startDateTime, setStartDateTime] = useState<Dayjs | undefined>(undefined);
    const [startTime, setStartTime] = useState<Dayjs | null>();
    const [endTime, setEndTime] = useState<Dayjs | null>();
    const [room, setRoom] = useState<string>('');
    const [maxReservationCnt, setMaxReservationCnt] = useState<number | undefined>(undefined);
    const [uploadedUrls, setUploadedUrls] = useState<Array<string>>([]);
    const [price, setPrice] = useState<number | undefined>(undefined);
    const [description, setDescription] = useState<string>('');
    const { data: wellnessLectureDetail } = useQueryGetWellnessLectureDetailById(selectedCenterId, id);
    const [selectedWellnessTicketManagementIdList, setSelectedWellnessTicketManagementIdList] = useState<(string | number | null)[][] | undefined>(undefined);
    const updateMutation = useMutationUpdateWellnessLecture((res: any) => {
        if (res.data) {
            queryClient.invalidateQueries({ queryKey: ['getWellnessLectureDetailById', selectedCenterId, id] })
            message.success('수업 수정 성공하였습니다.');
            navigate(-1);
        }
    });

    const { data: wellnessTicketManagementNameList } = useQueryGetWellnessTicketManagementNameListByCenterId(selectedCenterId)

    useEffect(() => {
        if (!wellnessTicketManagementNameList || !wellnessLectureDetail?.wellnessTicketAvailableList) return;

        const availableIds = wellnessLectureDetail.wellnessTicketAvailableList.map(
            (ticket) => ticket.wellnessTicketManagementId
        );

        const filteredData = wellnessTicketManagementNameList
            .filter((e: IGetWellnessTicketManagementNameByCenterIdAdminResponseV1) =>
                availableIds.includes(e.id)
            )
            .map((e: IGetWellnessTicketManagementNameByCenterIdAdminResponseV1) => {
                const isUnique = wellnessTicketManagementNameList.filter(
                    (i: IGetWellnessTicketManagementNameByCenterIdAdminResponseV1) => i.id === e.id
                ).length === 1;

                return isUnique ? [e.id] : [e.id, e.id];
            });

        setSelectedWellnessTicketManagementIdList(filteredData);
    }, [wellnessTicketManagementNameList, wellnessLectureDetail]);

    useEffect(() => {
        if (!wellnessLectureDetail) return
        console.log('wellnessLectureDetail', wellnessLectureDetail)
        setName(wellnessLectureDetail.name)
        setSelectedLectureTypeId(wellnessLectureDetail.wellnessLectureTypeId)
        setSelectedTeacherId(wellnessLectureDetail.teacherId)
        setStartDateTime(dayjs(wellnessLectureDetail.startDateTime))
        setStartTime(dayjs(wellnessLectureDetail.startDateTime))
        setEndTime(dayjs(wellnessLectureDetail.endDateTime))
        setRoom(wellnessLectureDetail.room)
        setMaxReservationCnt(wellnessLectureDetail.maxReservationCnt)
        setDescription(wellnessLectureDetail.description)
        setPrice(wellnessLectureDetail.price)
    }, [wellnessLectureDetail])

    const clickUpdateButton = () => {
        if (!name) return message.error('수업명을 입력해주세요.')
        if (!selectedLectureTypeId) return message.error("수업 종류를 선택해주세요.")
        if (!selectedTeacherId) return message.error('코치를 선택해주세요.')
        if (!startDateTime) return message.error("시작 날짜를 입력해주세요.")
        if (!startTime) return message.error("수업 시작 시간을 입력해주세요.")
        if (!endTime) return message.error("수업 종료 시간을 입력해주세요.")
        if (!room) return message.error("장소를 선택해주세요.")
        if (!maxReservationCnt) return message.error("정원을 입력해주세요.")
        if (!selectedWellnessTicketManagementIdList || !wellnessTicketManagementNameList) return message.error("예약 가능한 수강권을 선택해주세요.");
        if (uploadedUrls.length === 0) return message.error("수업 사진을 추가해주세요.")
        if (!price) return message.error("가격을 입력해주세요.")

        if (!selectedWellnessTicketManagementIdList || !wellnessTicketManagementNameList) return message.error("예약 가능한 수강권을 선택해주세요.");

        const wellnessTicketManagementIdList = selectedWellnessTicketManagementIdList.map((item: (string | number | null)[]) => {
            if (item.length === 1) {
                return wellnessTicketManagementNameList.find(e => e.id === item[0])?.id as number;
            } else if (item.length === 2) {
                return item[1] as number
            } else {
                return item[item.length - 1] as number
            }
        });

        const request: IUpdateWellnessLectureAdminRequestV1 = {
            id,
            name: name,
            description: description,
            centerId: selectedCenterId,
            maxReservationCnt: maxReservationCnt,
            room: room,
            lectureImageUrlList: uploadedUrls,
            teacherId: selectedTeacherId,
            wellnessLectureTypeId: selectedLectureTypeId,
            startDateTime: startDateTime.set('hour', startTime.hour()).set('minute', startTime.minute()),
            endDateTime: startDateTime.set('hour', endTime.hour()).set('minute', endTime.minute()),
            wellnessTicketManagementIdList,
            price
        };
        updateMutation.mutate(request)
    }


    return (
        <div>
            <Flex align="center" style={{ marginTop: 16 }}>
                <div style={{ width: 124 }}>수업명</div>
                <Input
                    classNames={{ input: styles.searchInput }}
                    placeholder="수업명을 입력해 주세요"
                    style={{ width: "335px", height: 44 }}
                    value={name}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => setName(event.target.value)}
                    disabled={false}
                />
            </Flex>
            <Flex align="center" style={{ marginTop: 16 }}>
                <div style={{ width: 124 }}>수업 종류</div>
                <SelectWellnessLectureType value={selectedLectureTypeId} setValue={setSelectedLectureTypeId} disabled={false} />
                <CreateWellnessLectureType />
            </Flex>
            <Flex align="center" style={{ marginTop: 16 }}>
                <div style={{ width: 124 }}>코치</div>
                <SelectTeacher value={selectedTeacherId} setValue={setSelectedTeacherId} disabled={false} />
                <AddTeacher />
            </Flex>
            <Flex align="center" style={{ marginTop: 16 }}>
                <div style={{ width: 124 }}>수업일</div>
                <DatePicker placeholder="시작일" value={startDateTime} onChange={(e) => setStartDateTime(e.startOf('date'))} size="large" disabled={false} />
                <TimePicker
                    style={{ marginLeft: 16 }}
                    format="HH:mm"
                    value={startTime}
                    size="large"
                    placeholder="시작 시간"
                    onChange={(value) => setStartTime(value)}
                />
                <div style={{ marginInline: 8 }}>-</div>
                <TimePicker
                    format="HH:mm"
                    value={endTime}
                    size="large"
                    placeholder="종료 시간"
                    onChange={(value) => setEndTime(value)}
                />
            </Flex>
            <Flex align="center" style={{ marginTop: 16 }}>
                <div style={{ width: 124 }}>수업 장소</div>
                <Input
                    classNames={{ input: styles.searchInput }}
                    placeholder="장소 입력"
                    style={{ width: "160px", height: 44 }}
                    value={room}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => setRoom(event.target.value)}
                    disabled={false}
                />
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
                    disabled={false}
                />
                <div style={{ margin: 12 }}>명</div>
            </Flex>
            <Flex align="center" style={{ marginTop: 16 }}>
                <div style={{ width: 124 }}>예약 가능 정기권</div>
                {wellnessTicketManagementNameList && <MultiSelectWellnessTicketManagement
                    value={selectedWellnessTicketManagementIdList}
                    setValue={(value) => setSelectedWellnessTicketManagementIdList(value)}
                    optionList={wellnessTicketManagementNameList}
                    disabled={false} />
                }
            </Flex>

            {wellnessLectureDetail && <Flex align="center" style={{ marginTop: 16 }}>
                <div style={{ width: 124 }}>수업 이미지</div>
                <ImageUploaderList setUploadedUrls={setUploadedUrls} initImageUrlList={wellnessLectureDetail.lectureImageUrlList} />
            </Flex>}

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
                <Button type="primary" onClick={clickUpdateButton}>수정하기</Button>
            </Flex>
        </div>
    )
}

export default UpdateWellnessLecture;