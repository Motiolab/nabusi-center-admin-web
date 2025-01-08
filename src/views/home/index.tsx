import { getScheduleByCenterId } from "@/entities/schedule";
import { RootState } from "@/store";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const Home = () => {
    const selectedCenterId = useSelector((state: RootState) => state.selectedCenterId)

    useEffect(() => {
        getScheduleByCenterId(selectedCenterId).then(res => console.log(res.data)).catch(error => console.error('error', error));
    })

    return (
        <div>
            <h1>Home</h1>
        </div>
    )
}

export default Home;