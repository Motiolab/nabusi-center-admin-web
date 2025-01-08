interface IProps {
    output?: string;
}
const OutputOenString = ({ output }: IProps) => {
    return <>
        <div style={{ width: "69px", height: "78px", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: "32px", color: "var(--Neutrals-Neutrals700)", border: "1px solid var(--Neutrals-Neutrals200)", borderRadius: "var(--Spacingxs)" }}>
            {output ?? ""}
        </div>
    </>
}


export { OutputOenString }