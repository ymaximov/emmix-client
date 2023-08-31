import {Layout} from '../layout/Layout'
import {useSelector, useDispatch} from "react-redux";
import {hideLoading, showLoading} from "../../redux/slices/alertsSlice";
import axios from "axios";
import {useEffect} from "react";

export const PurchaseOrder = () => {
    const token = JSON.parse(localStorage.getItem('token')).access_token
    const tenant = JSON.parse(localStorage.getItem('token')).tenant_id
    const POID = useSelector((state) => state.createdPo.po_id)
    const dispatch = useDispatch()
    console.log(POID, 'PO ID')

    const getPOData = async () => {
        try {
            dispatch(showLoading());
            const res = await axios.get(`/api/purchasing/get-po-by-id/${POID}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(res, 'response')
            dispatch(hideLoading());
            if (res.status === 200) {
                console.log(res, 'PODATA')

            }
        } catch (error) {
            dispatch(hideLoading());
            console.log(error)
        }
    };

    useEffect(() => {
        getPOData()
    }, []);

    return (
        <>
            <Layout />
            <div className="layout">

            </div>
        </>
    )
}
