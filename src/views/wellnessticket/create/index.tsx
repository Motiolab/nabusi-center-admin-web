import CreateWellnessTicket from "@/features/createwellnessticket"
import { Divider, Flex } from "antd"

const WellnessTicketCreate = () => {
    return (
        <div>
            <div style={{ backgroundColor: 'white' }}>
                <Flex style={{ padding: '20px 24px' }}>
                    <div>기본정보</div>
                </Flex>
                <Divider style={{ margin: 0 }} />
                <div style={{ padding: '20px 24px' }}>
                    <CreateWellnessTicket />
                </div>
            </div>
        </div>
    )
}

export default WellnessTicketCreate