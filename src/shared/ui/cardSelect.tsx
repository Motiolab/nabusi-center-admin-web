import { Card } from "antd";

interface IProps {
    icon: React.ForwardRefExoticComponent<Omit<any, 'ref'> & React.RefAttributes<HTMLSpanElement>>
    title: string,
    content: string,
    onClick: Function,
    userType: string | undefined
}

const CardSelect = ({ icon, title, content, onClick, userType }: IProps) => {
    const AntIcon = icon;

    const getBorderColor = () => {
        return (userType && userType === title) ?
            'var(--Primary-Primary)' :
            'var(--Neutrals-Neutrals100)'
    }

    return (<>
        <Card
            hoverable
            onClick={() => {
                onClick(title)

            }}
            style={{ border: `1px solid ${getBorderColor()}`, textAlign: 'center' }}
        >
            <div><AntIcon style={{ fontSize: 40 }} /></div>
            <div style={{ marginTop: 16, color: 'var(--Base-Base-Black)', fontSize: 20 }}>{title}</div>
            <div style={{ marginTop: 8, color: 'var(--Neutrals-Neutrals700)', fontSize: 16 }}>{content}</div>
        </Card>
    </>)
}

export default CardSelect;