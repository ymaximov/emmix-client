import Navbar from "./layout/Navbar";
import {Layout} from "./layout/Layout";
import {useSelector} from "react-redux";

export const Home = () => {
    const state = useSelector(state => state.user)
    return (
        <div>
        <Layout />
        </div>
    )
}
