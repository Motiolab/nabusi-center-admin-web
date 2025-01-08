import './index.css'
import { DropDownMenu } from "@/features";
import { useEffect, useRef, useState } from "react";
import { ReactComponent as ArrowDown } from '@/assets/icon/ArrowDown.svg';

interface IProps {
    styles?: { result?: React.CSSProperties, container?: React.CSSProperties, menu?: React.CSSProperties }
    dropDownItemList: IDropDown[]
    iconSvg?: React.ReactNode;
    onChange?: Function;
    initalObject?: { value: any, [key: string | number]: any; }
    isImmutable?: boolean;
}
const DropDownResult = ({ styles, dropDownItemList, iconSvg, onChange, initalObject = { value: "", text: "" }, isImmutable = false }: IProps) => {
    const [dropdownMenuVisible, setDropdownMenuVisible] = useState<boolean>();
    const dropdownRef = useRef<HTMLDivElement>(null);
    const [result, setResult] = useState<IDropDown>(initalObject);

    const menuOnClick = (item: any) => {
        if (isImmutable) return;
        setResult(item);
        setDropdownMenuVisible(false)
        onChange?.(item.value)
    }
    const handleClickOutside = (event: MouseEvent) => {
        if (!(event.target instanceof Node)) return;
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setDropdownMenuVisible(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);
    return <>
        <div className="dropdown-container" style={styles?.container} ref={dropdownRef}>
            <div className="dropdown-result-box" style={styles?.result} onClick={() => setDropdownMenuVisible(c => !c)}>
                <div>{result.text ?? result.value ?? ""}</div>
                {iconSvg ?? <ArrowDown style={{ cursor: "pointer" }} fill="var(--Neutrals-Neutrals500)" width={24} height={24} />}
                <DropDownMenu className={`${dropdownMenuVisible ? "show" : ""}`} dropDownItemList={dropDownItemList} style={styles?.menu} setResult={menuOnClick} result={result} />
            </div>

        </div>
    </>
}

export { DropDownResult }