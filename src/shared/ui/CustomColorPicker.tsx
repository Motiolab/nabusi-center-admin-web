import { Button, ColorPicker, Flex } from "antd";

const colors = ['#00000095', '#FF000095', '#00FF0095', '#0000FF95', '#FFFF0095', '#00FFFF95', '#FF00FF95', '#80808095', '#FFA50095'];

interface IProps {
    value: string;
    setValue: (value: string) => void;
}

const CustomColorPicker = ({ value, setValue }: IProps) => {
    const customPanelRender = () => (
        <Flex>
            {colors.map((color) => (
                <Button
                    onClick={() => setValue(color)}
                    style={{ padding: 3, height: 30, marginRight: 5 }}>
                    <div style={{ backgroundColor: color, width: 24, height: 24, borderRadius: 4 }}></div>
                </Button>
            ))}
        </Flex>
    );

    return <ColorPicker
        value={value}
        styles={{ popupOverlayInner: { width: 480 } }}
        panelRender={customPanelRender}
    />
}

export default CustomColorPicker;