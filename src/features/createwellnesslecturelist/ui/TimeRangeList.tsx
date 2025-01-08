import { Flex, Select, TimePicker } from "antd";
import { Dayjs } from "dayjs";
import { ReactComponent as Vector } from "@/assets/icon/Vector.svg"

interface IProps {
    timeRanges: TimeRange[]
    setTimeRanges: (value: TimeRange[]) => void
    disabled: boolean
}

interface TimeRange {
    dayOfWeek: '1' | '2' | '3' | '4' | '5' | '6' | '7' | '';
    startTime: Dayjs | null;
    endTime: Dayjs | null;
}

const TimeRangeList = ({ timeRanges, setTimeRanges, disabled }: IProps) => {

    const handleAdd = () => {
        if (disabled) return;
        setTimeRanges([
            ...timeRanges,
            { dayOfWeek: '', startTime: null, endTime: null } // 새로운 빈 항목 추가
        ]);
    };

    const handleRemove = (index: number): void => {
        if (timeRanges.length <= 1) {
            return alert("수업 기간은 최소 1개 이상이어야 합니다.")
        }
        const newTimeRanges = [...timeRanges];
        newTimeRanges.splice(index, 1); // 해당 항목 삭제
        setTimeRanges(newTimeRanges);
    };

    const handleChange = (index: number, field: keyof TimeRange, value: any): void => {
        const newTimeRanges = [...timeRanges];
        newTimeRanges[index] = { ...newTimeRanges[index], [field]: value };
        setTimeRanges(newTimeRanges);
    };

    return <>
        <div>
            {timeRanges.map((timeRange, index) => (
                <div style={{ marginTop: 16 }}>
                    <Flex align="center" >
                        <Select
                            className={`body-content-standard`}
                            style={{ width: "76px", height: "44px", marginRight: 16 }}
                            placeholder="요일"
                            value={timeRange.dayOfWeek}
                            onSelect={(e) => handleChange(index, 'dayOfWeek', e)}
                            disabled={disabled}
                        >
                            <Select.Option key={'1'} value={'1'}>월</Select.Option>
                            <Select.Option key={'2'} value={'2'}>화</Select.Option>
                            <Select.Option key={'3'} value={'3'}>수</Select.Option>
                            <Select.Option key={'4'} value={'4'}>목</Select.Option>
                            <Select.Option key={'5'} value={'5'}>금</Select.Option>
                            <Select.Option key={'6'} value={'6'}>토</Select.Option>
                            <Select.Option key={'7'} value={'7'}>일</Select.Option>
                        </Select>
                        <TimePicker
                            format="HH:mm"
                            value={timeRange.startTime}
                            size="large"
                            placeholder="시작 시간"
                            onChange={(value) => handleChange(index, 'startTime', value)}
                            disabled={disabled}
                        />
                        <div style={{ margin: 8 }}>-</div>
                        <TimePicker
                            format="HH:mm"
                            value={timeRange.endTime}
                            size="large"
                            placeholder="종료 시간"
                            onChange={(value) => handleChange(index, 'endTime', value)}
                            disabled={disabled}
                        />
                        {timeRanges.length > 1 && <div style={{ margin: 8 }}>
                            <div
                                style={{ padding: 8, cursor: 'pointer' }}
                                onClick={() => handleRemove(index)}
                            ><Vector /></div>
                        </div>}


                    </Flex>
                </div>
            ))}
            <div
                className="body-content-accent"
                style={{ color: 'var(--Primary-Primary)', cursor: disabled ? 'not-allowed' : 'pointer', marginTop: 16 }}
                onClick={handleAdd}

            >
                + 추가하기
            </div>
        </div>
    </>
}

export default TimeRangeList;