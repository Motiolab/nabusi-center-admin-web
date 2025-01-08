import UpdateWellnessTicket from "@/features/updatewellnessticket";
import { Divider, Flex } from "antd";
import { useParams } from "react-router-dom";

const WellnessTicketUpdate = () => {
    const { id } = useParams();
    const numericId = id ? parseInt(id, 10) : undefined;
    return (
        <div>
            <div style={{ backgroundColor: 'white' }}>
                <Flex style={{ padding: '20px 24px' }}>
                    <div>기본정보</div>
                </Flex>
                <Divider style={{ margin: 0 }} />
                <div style={{ padding: '20px 24px' }}>
                    {numericId && <UpdateWellnessTicket id={numericId} />}
                </div>
            </div>
        </div>
    )
}

export default WellnessTicketUpdate