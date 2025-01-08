

import { Tab } from "@/shared";
import { useState } from "react"
import './index.css'

interface IProps {
    tabItemList: { text: string }[];
    style?: React.CSSProperties;
    setSelectIdx?: React.Dispatch<React.SetStateAction<number>>;
}

const TabList = ({ tabItemList, style, setSelectIdx }: IProps) => {
    const [selectTab, setSelectTab] = useState<number>(0);
    const propsStyle = style ?? {}
    const propsSetSelectIdx = setSelectIdx ?? (() => { })

    return <>
        <div className="tab-list-container" style={propsStyle}>
            {tabItemList && tabItemList.length > 0 && tabItemList.map((e, idx) =>
                <Tab key={idx} text={e.text} selected={selectTab === idx} onClick={() => { setSelectTab(idx); propsSetSelectIdx(idx); }} />)}
        </div>
    </>
}

export { TabList };