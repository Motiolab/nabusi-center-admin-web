const noticeTypeToReactNodeTag = (value: boolean) => {
    switch (value) {
        case true:
            return <div className="body-caption-accent" style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "41px", height: "28px", border: "1px solid var(--Primary-Primary)", borderRadius: "var(--Radiuss)", color: "var(--Primary-Primary)", backgroundColor: "var(--Primary-Primary50)" }}>게시</div>
        case false:
            return <div className="body-caption-accent" style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "53px", height: "28px", border: "1px solid var(--Neutrals-Neutrals200)", borderRadius: "var(--Radiuss)", color: "var(--Neutrals-Neutrals400)", backgroundColor: "var(--Neutrals-Neutrals50)" }}>미게시</div>
        default:
            return <div className="body-caption-standardp" style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "85px", height: "28px", borderRadius: "var(--Radiuss)", color: "var(--Error-Error)", backgroundColor: "var(--Error-Error50)" }}>알수없음</div>
    }
}


export { noticeTypeToReactNodeTag };