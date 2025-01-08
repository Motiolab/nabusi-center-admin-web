import { getAllMemberRoleCenterIdNotUser } from "@/entities/member"
import { RootState } from "@/store"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

const CheckSelectedCenterId = () => {
    const selectedCenterId = useSelector((state: RootState) => state.selectedCenterId)
    const navigate = useNavigate()
    useEffect(() => {
        if (!selectedCenterId || selectedCenterId === 0) navigate("/centerselect")
        getAllMemberRoleCenterIdNotUser(selectedCenterId)
            .then(res => {
                if (!res.data?.includes(selectedCenterId)) {
                    navigate("/centerselect")
                }
            })
            .catch(() => navigate("/centerselect"))
    }, [])

    return <></>
}

export { CheckSelectedCenterId }