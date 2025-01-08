import { useQueryGetWellnessTicketDetailById } from "@/entities/wellnessticket/model";
import { RootState } from "@/store";
import { Button, Divider, Flex, Input, Table } from "antd";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import WellnessTicketDetailInfo from "./ui/WellnessTicketDetailInfo";
import { ReactComponent as Search } from '@/assets/icon/Search.svg'
import DeleteWellnessTicket from "@/features/deletewellnessticket";
import RestoreWellnessTicket from "@/features/restorewellnessticket ";
import ExtensionTicket from "@/features/extensionTicket";

const WellnessTicketDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const selectedCenterId = useSelector((state: RootState) => state.selectedCenterId)
    const [searchText, setSearchText] = useState<string>("");
    const numericId = id ? parseInt(id, 10) : undefined;
    const { data: wellnessTicketDetail, isError, error } = useQueryGetWellnessTicketDetailById(selectedCenterId, numericId as number);

    if (isError) {
        return <div>유효하지 않은 ID입니다. {String(error)}</div>;
    }

    return <>
        {wellnessTicketDetail && <WellnessTicketDetailInfo wellnessTicketDetail={wellnessTicketDetail} />}
        <div style={{ marginTop: 24, backgroundColor: 'white' }}>
            <div style={{ padding: 24 }}>
                <Flex justify="space-between">
                    <Flex align="center" gap={16}>
                        <div>발급 목록 (100000)</div>
                        {wellnessTicketDetail && <ExtensionTicket wellnessTicketId={wellnessTicketDetail.id} wellnessTicketName={wellnessTicketDetail.name} />}
                    </Flex>
                    <div>
                        <Input
                            placeholder="이름 또는 휴대폰번호 검색"
                            value={searchText}
                            prefix={<Search />}
                            style={{ width: "310px", height: "36px", backgroundColor: "var(--Base-Base-White)" }}
                            onChange={(e) => setSearchText(e.target.value)} />
                    </div>
                </Flex>
                <div style={{ marginTop: 20 }}>
                    <Table />
                </div>
            </div>
            <Divider style={{ margin: 0 }} />
            <Flex justify="space-between" style={{ padding: 24 }}>
                {(selectedCenterId && numericId && wellnessTicketDetail) &&
                    !wellnessTicketDetail.isDelete ?
                    <DeleteWellnessTicket centerId={selectedCenterId} id={numericId as number} />
                    : <RestoreWellnessTicket centerId={selectedCenterId} id={numericId as number} />}
                <Button color="primary" variant="outlined" onClick={() => navigate(`/wellness-ticket/update/${numericId}`)}>수정하기</Button>
            </Flex>
        </div>
    </>
}

export default WellnessTicketDetail;