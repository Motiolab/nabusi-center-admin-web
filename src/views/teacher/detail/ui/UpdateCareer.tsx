import { useMutationUpdateTeacherCareerById } from "@/entities/teacher/model";
import { RootState } from "@/store";
import { useQueryClient } from "@tanstack/react-query";
import { Button, Divider, Flex, Input, message } from "antd"
import { useState } from "react"
import { useSelector } from "react-redux";

interface IProps {
    setIsUpdateCareer: (isUpdateCareer: boolean) => void
    initCareer: string
    teacherId: number
}

const { TextArea } = Input;

const UpdateCareer = ({ setIsUpdateCareer, initCareer, teacherId }: IProps) => {
    const queryClient = useQueryClient();
    const selectedCenterId = useSelector((state: RootState) => state.selectedCenterId)
    const [career, setCareer] = useState<string>(initCareer)

    const updateMutation = useMutationUpdateTeacherCareerById((res: any) => {
        if (res.data) {
            message.success("주요 이력 수정이 완료되었습니다.")
            setIsUpdateCareer(false);

            queryClient.invalidateQueries({ queryKey: ['getTeacherDetailById', selectedCenterId, teacherId] })
        }
    })

    const onClickSaveButton = () => {
        const request: IUpdateTeacherCareerByIdAdminRequestV1 = {
            id: teacherId,
            career: career,
            centerId: selectedCenterId
        }
        updateMutation.mutate(request);
    }

    return <>
        <div style={{ marginTop: 40, padding: 24 }}>
            <Flex justify="space-between" align="center">
                <div className="body-highlight-accent">주요 이력 <span className="body-caption-standard" style={{ color: 'var(--Neutrals-Neutrals500)', marginLeft: 12 }}>회원에게 보이는 내용입니다.</span></div>
                <div>
                    <Button onClick={() => setIsUpdateCareer(false)}>취소</Button>
                    <Button style={{ marginLeft: 12 }} type="primary" onClick={() => onClickSaveButton()}>저장</Button>
                </div>
            </Flex>
        </div>
        <Divider style={{ margin: 0 }} />
        <div style={{ padding: 24 }}>
            <TextArea
                rows={4}
                placeholder=""
                style={{ width: '100%', marginTop: 24 }}
                value={career}
                onChange={(e) => setCareer(e.target.value)}
            />
        </div>
    </>
}

export default UpdateCareer