import { Link } from "react-router-dom";
import './index.css'
import Icon from "@/shared/ui/icon";

interface IProps {
    dropDownItemList: IDropDown[]
    className?: string
    style?: React.CSSProperties;
    setResult?: Function
    result?: IDropDown;
    styles?: { menu?: React.CSSProperties, item?: React.CSSProperties }
    allIconShow?: boolean;
}
const DropDownMenu = ({ dropDownItemList, className = "", style, setResult, result, styles, allIconShow }: IProps) => {

    return <div className={`dropdown-menu ${className}`} style={{ ...style, ...styles?.menu }}>
        {dropDownItemList && dropDownItemList.map((item, index) => <Link key={index} className={`dropdown-item ${item.className ?? ""}`} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", ...styles?.item, ...item.style }} to={item.href ?? "#"} onClick={() => { item.onClick?.(); setResult?.(item) }}>
            {item.text ?? item.value ?? ""}
            {(result?.value === item?.value || allIconShow) && <Icon src={(item.iconSvg === "" || item.iconSvg) ? item.iconSvg === "" ? "/assets/icon/Blank.svg" : item.iconSvg : "/assets/icon/Check.svg"} width={item.iconWidth ?? 16} height={item.iconHeight ?? 16} alt="icon" />}
        </Link>
        )}
    </div>

}

export { DropDownMenu }