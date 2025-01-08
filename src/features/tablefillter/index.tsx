
import { Button, Checkbox } from "antd";
import { ReactComponent as ArrowDown } from '@/assets/icon/ArrowDown.svg';
import { CheckboxChangeEvent } from "antd/es/checkbox";
import { categoryEnToKr } from "@/views/ticketproductlist/model";
import { useState } from "react";
import { ticketValueEnToKr } from "@/entities/ticket/model";

interface IProps {
    optionList: ITableFilterItem[];
    setSelectList: React.Dispatch<React.SetStateAction<ITableFilterItem[] | ITicketProductTableFilterItem[] | ITicketAndMemberTableFilterItem[]>>;
    styles?: { container?: React.CSSProperties, category?: React.CSSProperties, value?: React.CSSProperties, footer?: React.CSSProperties }
    displayState: boolean;
    onCancelClick?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
    onSubmitClick?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
    footer?: React.ReactNode;
    isSimple?: boolean;
}

const TableFilter = ({ displayState, optionList, setSelectList, styles, onCancelClick, onSubmitClick, footer, isSimple }: IProps) => {
    const [checkboxCheckedList, setCheckboxCheckedList] = useState<boolean[]>([]);
    const handleCheckboxChange = (event: CheckboxChangeEvent, category: CategoryKey, value: string) => {
        const checked = event.target.checked;
        setSelectList(prevSelectedItems => {
            const categoryIndex = prevSelectedItems.findIndex(item => item.category === category);
            if (checked) {
                if (categoryIndex !== -1) {
                    const updatedCategory = { ...prevSelectedItems[categoryIndex], valueList: [...prevSelectedItems[categoryIndex].valueList, value] };
                    return [...prevSelectedItems.slice(0, categoryIndex), updatedCategory, ...prevSelectedItems.slice(categoryIndex + 1)];
                } else {
                    return [...prevSelectedItems, { category, valueList: [value] }];
                }
            } else {
                if (categoryIndex !== -1) {
                    const updatedValueList = prevSelectedItems[categoryIndex].valueList.filter((val: any) => val !== value);
                    if (updatedValueList.length === 0) {
                        return [...prevSelectedItems.slice(0, categoryIndex), ...prevSelectedItems.slice(categoryIndex + 1)];
                    } else {
                        const updatedCategory = { ...prevSelectedItems[categoryIndex], valueList: updatedValueList };
                        return [...prevSelectedItems.slice(0, categoryIndex), updatedCategory, ...prevSelectedItems.slice(categoryIndex + 1)];
                    }
                }
            }
            return prevSelectedItems;
        });
    };

    return <div style={{ ...styles?.container, position: "fixed", right: 48, zIndex: 10000, boxShadow: "0px 2px 8px 0px #0000001A", width: "312px", padding: "var(--Spacings)", borderRadius: "var(--Radiussm)", transformOrigin: "top right", opacity: displayState ? 1 : 0, transform: displayState ? "scaleX(1) scaleY(1)" : "scaleX(0) scaleY(0)", transition: "opacity 150ms, transform 300ms", backgroundColor: "var(--Base-Base-White)" }}>
        {isSimple
            ? <><div style={{ display: "flex", justifyContent: "space-between", padding: "var(--Spacingxs) var(--Spacingsm) var(--Spacingxs) var(--Spacingsm)" }}>
                <div className="body-conten-accent" style={{ color: "var(--Neutrals-Neutrals700)" }}>
                    {categoryEnToKr(optionList[0].category)}
                </div>
                <div className="body-caption-standard" style={{ color: "var(--Neutrals-Neutrals500)", cursor: "pointer" }} onClick={() => { setCheckboxCheckedList([]); setSelectList([]) }} >
                    모두 지우기
                </div>
            </div>


                <div className="body-caption-accent" style={{ ...styles?.category, display: "flex", justifyContent: "space-between", padding: "var(--Spacings) var(--Spacingsm) var(--Spacings) var(--Spacingsm)", borderBottom: "1px solid var(--Neutrals-Neutrals200)", color: "var(--Neutrals-Neutrals700)" }}>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr" }}>
                    {optionList[0].valueList.map((r, vIdx) =>
                        <Checkbox key={vIdx} checked={checkboxCheckedList[vIdx]} style={{ ...styles?.value, padding: "var(--Spacings) var(--Spacingsm) var(--Spacings) var(--Spacingsm)" }} onChange={(w) => { setCheckboxCheckedList((prevState) => { const updatedList = [...prevState]; updatedList[vIdx] = !updatedList[vIdx]; return updatedList; }); handleCheckboxChange(w, optionList[0].category, r) }}><span className="body-caption-standard" style={{ color: "var(--Base-Base-Black)" }}>{ticketValueEnToKr(r)}</span></Checkbox>
                    )}
                </div>

            </>
            : <><div style={{ display: "flex", justifyContent: "space-between", padding: "var(--Spacingxs) var(--Spacingsm) var(--Spacingxs) var(--Spacingsm)", marginBottom: "var(--Spacingsm)" }}>
                <div className="body-conten-accent" style={{ color: "var(--Neutrals-Neutrals700)" }}>
                    필터
                </div>
                <div className="body-caption-standard" style={{ color: "var(--Neutrals-Neutrals500)", cursor: "pointer" }} onClick={() => { setCheckboxCheckedList([]); setSelectList([]) }} >
                    모두 지우기
                </div>
            </div>
                {
                    optionList.map((e, idx) => <div key={idx}>
                        <div className="body-caption-accent" style={{ ...styles?.category, display: "flex", justifyContent: "space-between", padding: "var(--Spacings) var(--Spacingsm) var(--Spacings) var(--Spacingsm)", borderBottom: "1px solid var(--Neutrals-Neutrals200)", color: "var(--Neutrals-Neutrals700)" }}>
                            <div>
                                {categoryEnToKr(e.category)}
                            </div>
                            <ArrowDown width={16} height={16} fill={"var(--Neutrals-Neutrals500)"} />
                        </div>
                        <div style={{ display: "grid", gridTemplateColumns: (idx === 0 && !e.gird) ? "1fr 1fr" : "1fr" }}>
                            {e.valueList.map((r, vIdx) =>
                                <Checkbox key={vIdx} checked={checkboxCheckedList[idx === 0 ? vIdx : idx === 1 ? 100 + vIdx : 200 + vIdx]} style={{ ...styles?.value, padding: "var(--Spacings) var(--Spacingsm) var(--Spacings) var(--Spacingsm)" }} onChange={(w) => { setCheckboxCheckedList((prevState) => { const updatedList = [...prevState]; updatedList[idx === 0 ? vIdx : idx === 1 ? 100 + vIdx : 200 + vIdx] = !updatedList[idx === 0 ? vIdx : idx === 1 ? 100 + vIdx : 200 + vIdx]; return updatedList; }); handleCheckboxChange(w, e.category, r) }}><span className="body-caption-standard" style={{ color: "var(--Base-Base-Black)" }}>{ticketValueEnToKr(r)}</span></Checkbox>
                            )}
                        </div>
                    </div>)
                }
            </>}
        {
            footer
                ? footer
                : <div style={{ display: "flex", gap: "var(--Spacingbase)", justifyContent: "right", ...styles?.footer }}>
                    <Button style={{ height: "36px", padding: "var(--Spacingxs) var(--Spacingm) var(--Spacingxs) var(--Spacingm)" }} onClick={(e) => onCancelClick?.(e)}>취소</Button>
                    <Button style={{ height: "36px", padding: "var(--Spacingxs) var(--Spacingm) var(--Spacingxs) var(--Spacingm)" }} type="primary" onClick={(e) => onSubmitClick?.(e)}>적용</Button>
                </div>
        }
    </div >
}
export { TableFilter }