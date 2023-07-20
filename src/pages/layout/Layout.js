import Navbar from "./Navbar";
import {useNavigate, useLocation, Link} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import '../../Layout.css'

export const Layout = () => {
    const navigate = useNavigate()
    const location = useLocation()

    const user = useSelector((state) => state.user);
    const role = user.user.role;

    const logout = () => {
        localStorage.clear()
        navigate('/login')
    }
    return (
        <>
            <div className='upper-nav'>
            <div className="upper-nav-1">
                <div className='ml-4'>{user?.user.tenant_company_name}</div>



            </div>
            <div className="upper-nav-2">
                <div className='ml-4'>Welcome, {user?.user.first_name} {user?.user.last_name}</div>
                {/*<div className='ml-4 mr-4 underline'>My Account</div>*/}
                {/*<i className="ri-logout-circle-line ml-4 mr-4 cursor-pointer" onClick={logout}></i>*/}
                {/*<div className='logout' onClick={logout}>Logout</div>*/}
            </div>
            </div>
        <Navbar />
        </>
    )
}
