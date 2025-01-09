import { Button, Checkbox, Divider, Flex, Input, Radio, RadioChangeEvent, Slider, message } from "antd"
import { ChangeEvent, useState } from "react";
import SliderMarks from "./model/sliderMarks";
import './index.css'
import CustomColorPicker from "@/shared/ui/CustomColorPicker";
import MultiSelectWellnessClass from "@/entities/wellnessclass/ui/MultiSelectWellnessClass";
import { useMutationCreateWellnessTicket } from "@/entities/wellnessticket/model";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

const CreateWellnessTicket = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const selectedCenterId = useSelector((state: RootState) => state.selectedCenterId)
    const [name, setName] = useState<string>('');
    const [type, setType] = useState<string>('COUNT');
    const [price, setPrice] = useState<number | undefined>(undefined);
    const [discountValue, setDiscountValue] = useState<number>(0);
    const [usableMonth, setUsableMonth] = useState<number>(1);
    const [usableDate, setUsableDate] = useState<number>(100);
    const [isUsableDateManually, setIsUsableDateManually] = useState<boolean>(false);
    const [totalUsableCnt, setTotalUsableCnt] = useState<number>(1);
    const [limitType, setLimitType] = useState<string>('NONE')
    const [limitCnt, setLimitCnt] = useState<number>(0);
    const [backgroundColor, setBackgroundColor] = useState<string>('#00000095');
    const [wellnessClassIdList, setWellnessClassIdList] = useState<number[] | undefined>(undefined);
    const createMutation = useMutationCreateWellnessTicket((res: any) => {
        if (res.data) navigate(-1);
        queryClient.invalidateQueries({ queryKey: ['getWellnessTicketList', selectedCenterId] })
    });

    const calculateFinalPrice = (price: number, discountValue: number): number => {
        if (!price || discountValue < 0) return 0;
        return discountValue === 0 ? price : price - (price * (discountValue / 100));
    };

    const clickCreateButton = () => {
        if (!price) return message.error("판매가를 입력해주세요.")
        if (!wellnessClassIdList) return message.error("예약 가능한 그룹 수업을 선택해주세요.")

        let calcUsableDate = usableDate;
        if (!isUsableDateManually) {
            calcUsableDate = usableMonth * 30
        }

        const request: ICreateWellnessTicketAdminRequestV1 = {
            centerId: selectedCenterId,
            type,
            name: name.trim(),
            backgroundColor,
            textColor: '#000000',
            price,
            limitType,
            limitCnt,
            totalUsableCnt,
            usableDate: calcUsableDate,
            discountValue,
            salesPrice: calculateFinalPrice(price, discountValue),
            wellnessClassIdList
        }

        createMutation.mutate(request)
    }

    return <>
        <Flex align="center" style={{ marginTop: 16 }}>
            <div style={{ width: 124 }}>수강권명</div>
            <Input
                placeholder="수강권 명을 입력해 주세요"
                style={{ width: "208px", height: 44 }}
                value={name}
                onChange={(event: ChangeEvent<HTMLInputElement>) => setName(event.target.value)}
                onBlur={() => setName((prev) => prev.trim())}
            />
        </Flex>
        <Flex align="center" style={{ marginTop: 16 }}>
            <div style={{ width: 124 }}>색상</div>
            <CustomColorPicker value={backgroundColor} setValue={(value) => setBackgroundColor(value)} />
        </Flex >
        <Flex align="center" style={{ marginTop: 16 }}>
            <div style={{ width: 124 }}>수강권 종류</div>
            <Radio.Group onChange={(e: RadioChangeEvent) => setType(e.target.value)} value={type}>
                <Radio value={'COUNT'}>횟수권</Radio>
                <Radio value={'PERIOD'}>기간권</Radio>
            </Radio.Group>
        </Flex>
        <Flex align="center" style={{ marginTop: 16 }}>
            <div style={{ width: 124 }}>판매가</div>
            <Input
                placeholder="판매가를 입력해 주세요"
                style={{ width: "208px", height: 44 }}
                value={price}
                type="number"
                min={0}
                onChange={(event: ChangeEvent<HTMLInputElement>) => setPrice(Number(event.target.value))}
            />
            <div style={{ marginLeft: 12 }}>원</div>
        </Flex>
        <Flex align="center" style={{ marginTop: 16 }}>
            <div style={{ width: 124 }}>할인율</div>
            <Input
                type="number"
                style={{ width: "208px", height: 44 }}
                min={0}
                value={discountValue}
                onChange={(event: ChangeEvent<HTMLInputElement>) => setDiscountValue(Number(event.target.value))}
            />
            <div style={{ marginLeft: 12 }}>%</div>
        </Flex>

        <Flex align="center" style={{ marginTop: 16, backgroundColor: 'var(--Neutrals-Neutrals50)', padding: 'var(--Spacingbase) var(--Spacingbase)' }}>
            <div style={{ width: 120 }}>최종 판매가</div>
            <div style={{ width: "208px" }}>
                {price ? calculateFinalPrice(price, discountValue) : 0}
            </div>
            <div style={{ marginLeft: 12 }}>원</div>
        </Flex>

        <div style={{ marginTop: 16 }}>
            <Flex align="start" >
                <div style={{ width: 124 }}>유효기간</div>
                <div style={{ width: 493 }}>
                    {!isUsableDateManually && <div style={{ color: `var(--Primary-Primary)` }}>{usableMonth}개월 ({usableMonth * 30}일)</div>}
                    <Slider marks={SliderMarks}
                        tooltip={{ formatter: null }}
                        style={{ marginTop: 16 }}
                        step={1}
                        defaultValue={1}
                        max={12}
                        value={usableMonth}
                        onChange={(e) => setUsableMonth(e)}
                        dots={false}
                        disabled={isUsableDateManually}
                    />
                </div>
            </Flex>
            <div style={{ marginLeft: 124, marginTop: 16 }}>
                <Checkbox checked={isUsableDateManually} onChange={(e) => setIsUsableDateManually(e.target.checked)}>직접입력</Checkbox>
                {isUsableDateManually && <div style={{ marginTop: 16 }}>
                    <Input
                        type="number"
                        style={{ width: "160px", height: 44 }}
                        min={0}
                        value={usableDate}
                        onChange={(event: ChangeEvent<HTMLInputElement>) => setUsableDate(Number(event.target.value))}
                    />
                    <span style={{ marginLeft: 12 }}>일</span>
                </div>}
            </div>
        </div>

        {type === 'COUNT' && <Flex align="center" style={{ marginTop: 16 }}>
            <div style={{ width: 124 }}>사용 가능 횟수</div>
            <Input
                type="number"
                style={{ width: "208px", height: 44 }}
                value={totalUsableCnt}
                min={0}
                onChange={(event: ChangeEvent<HTMLInputElement>) => setTotalUsableCnt(Number(event.target.value))}
            />
            <div style={{ marginLeft: 12 }}>회</div>
        </Flex>}

        <div style={{ marginTop: 16 }}>
            <Flex align="start" >
                <div style={{ width: 124 }}>이용 제한</div>
                <div>
                    <Radio.Group onChange={(e: RadioChangeEvent) => setLimitType(e.target.value)} value={limitType}>
                        <Radio value={'WEEK'}>주간</Radio>
                        <Radio value={'MONTH'}>월간</Radio>
                        <Radio value={'NONE'}>이용 제한 없음</Radio>
                    </Radio.Group>
                </div>
            </Flex>
            <div style={{ marginLeft: 124, marginTop: 16 }}>
                <div style={{ marginTop: 16 }}>
                    <Input
                        type="number"
                        style={{ width: "160px", height: 44 }}
                        value={limitCnt}
                        min={0}
                        onChange={(event: ChangeEvent<HTMLInputElement>) => setLimitCnt(Number(event.target.value))}
                        disabled={limitType === 'NONE'}
                    />
                    <span style={{ marginLeft: 12 }}>회 이용 가능</span>
                </div>
            </div>
        </div>
        <Flex align="center" style={{ marginTop: 16 }}>
            <div style={{ width: 124 }}>그룹 수업</div>
            <MultiSelectWellnessClass value={wellnessClassIdList} setValue={(value) => setWellnessClassIdList(value)} />
            <div style={{ marginLeft: 12 }}>수업만 예약 가능</div>
        </Flex>

        <div style={{ marginTop: 36 }}>
            <Divider style={{ margin: 0 }} />
        </div>

        <Flex align="center" style={{ marginTop: 24, justifyContent: 'space-between' }}>
            <Button onClick={() => navigate(`/wellness-ticket`)}>취소</Button>
            <Button type="primary" onClick={clickCreateButton}>추가하기</Button>
        </Flex>
    </>
}

export default CreateWellnessTicket