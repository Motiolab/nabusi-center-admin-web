interface IProps {
    title?: string;
    content?: React.ReactNode;
    icon?: React.ReactNode;
    styles?: {
        container?: React.CSSProperties;
        title?: React.CSSProperties;
        content?: React.CSSProperties;
        border?: React.CSSProperties;
    };
}
const LinkCenterInfo = ({ title, content, icon, styles }: IProps) => {
    return <div style={{ display: "flex", gap: "var(--Spacingbase)", fontSize: "16px", color: "var(--Neutrals-Neutrals700)", padding: "var(--Spacings) var(--Spacingbase) var(--Spacings) var(--Spacingbase)", backgroundColor: "var(--Neutrals-Neutrals50)", ...styles?.container }}>
        <div style={{ display: "flex", gap: "var(--Spacingxs)", lineHeight: "28px" }}>
            {icon}
            <div style={{ fontWeight: 700, ...styles?.title }}>
                {title}
            </div>
        </div>
        <div style={{ border: "1px solid var(--Neutrals-Neutrals200)", ...styles?.border }}></div>
        <div className="desktop-body-content-regular" style={styles?.content}>
            {content}
        </div>
    </div>
}

export { LinkCenterInfo }