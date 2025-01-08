import { ConfigProvider } from "antd";

export function AntdProvider({ children }: { children: React.ReactNode }) {
    return (
        <ConfigProvider
            theme={{
                token: {
                    fontFamily: "Pretendard",
                    borderRadius: 4,
                    colorPrimary: "#369AFF",
                    controlHeightLG: 44,
                    colorBgContainer: "#FCFCFC",
                    colorError: "#E57373",
                },
                components: {
                    Table: {
                        rowHoverBg: "var(--Neutrals-Neutrals50)",
                        borderColor: "var(--Neutrals-Neutrals200)",
                    },
                    Input: {
                        colorTextPlaceholder: "var(--Neutrals-Neutrals500)",
                    },
                    Button: {
                        contentFontSizeLG: 14,
                        primaryColor: "var(--Base-Base-White)",
                        controlHeight: 44,
                        defaultColor: "var(--Base-Base-Black)",
                        dangerColor: "var(--Base-Base-White)",
                        defaultHoverBorderColor: "parent",
                        defaultHoverColor: "parent"
                    },
                    Tabs: {
                        itemSelectedColor: "var(--Base-Base-Black)",
                        inkBarColor: "var(--Base-Base-Black)",
                        itemColor: "var(--Neutrals-Neutrals500)",
                        itemHoverColor: "var(--Neutrals-Neutrals500)",
                    },
                    Modal: {
                        contentBg: "var(--Base-Base-White)",
                    },
                    Checkbox: {
                        colorBgContainerDisabled: "var(--Neutrals-Neutrals400)",
                        colorTextDisabled: "var(--Base-Base-Black)",
                    }
                }
            }}
        >
            {children}
        </ConfigProvider >
    );
}