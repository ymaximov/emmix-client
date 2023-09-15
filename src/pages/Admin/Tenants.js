import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import 'ag-grid-enterprise';
import {Layout} from "../layout/Layout";
import {useNavigate} from "react-router-dom";
import {showLoading, hideLoading} from "../../redux/slices/alertsSlice";
import useGet from "../../hooks/useGet";
import {useDispatch, useSelector} from "react-redux";
import {useState, useEffect} from "react";
import axios from 'axios'
import {TenantProfileModal} from "../../modals/admin/TenantProfileModal";
import {setTenantProfile} from "../../redux/slices/admin/tenantProfileSlice";
import {url} from '../../connections/toServer'

export const Tenants = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [tenants, setTenants] = useState([]);
    const [dataForModal, setDataForModal] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const handleModalData = (data) => {
        console.log('Data received from the modal:', data);
    };

    const token = JSON.parse(localStorage.getItem('token')).access_token
    console.log(token)
    const getTenantsData = async () => {
        try {
            dispatch(showLoading());
            const res = await axios.get(`${url}/api/admin/get-all-tenants`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(res, 'response')
            dispatch(hideLoading());
            if (res.status === 200) {
                console.log(res)
                setTenants(res.data)
            }
        } catch (error) {
            dispatch(hideLoading());
        }
    };
    const handleCellClicked = (params) => {
        console.log('AG GRID cell clicked', params);
        // setDataForModal(params.data); // Pass the data from the clicked cell to the modal
        // console.log(params.data, '***Params Data***')
        dispatch(setTenantProfile(params.data))
        navigate('/admin/companyprofile')
        // setIsModalVisible(true); // Show the modal
    };

    const tenant = useSelector((state) => state.tenant)
    const user = useSelector((state) => state.user)
    console.log(tenant, user, 'TENANT!! USER!!')
    const columnDefs = [
        // {
        //     headerName: "Tenant ID",
        //     field: "tenant_id",
        // },
        {
            headerName: "Company Name",
            field: "company_name",
        },
        {
            headerName: "First Name",
            field: "first_name",
        },
        {
            headerName: "Last Name",
            field: "last_name",
        },
        {
            headerName: "Email",
            field: "email",
        },
        {
            headerName: "Phone Number",
            field: "phone",
        },
        {
            headerName: "Security Code",
            field: "security_code",
        },
        {
            headerName: "Account Status",
            field: "account_status",
        },
    ];
    const handleModalToggle = () => {
        setIsModalVisible(!isModalVisible);
    };

    // Modal Handlers
    const handleUpdateTenantDataSubmit = (formData, tenantId) => {
        // Process the form data here (e.g., submit it to the server)
        console.log("Form data submitted:", formData);
        console.log('Tenant ID', tenantId)
        // You can use axios or any other method to submit the form data to the server.
        // Make sure to add proper error handling and success notifications.
        // Example axios code:
        // axios.post("/api/user/create-business-partner", formData, {
        //   headers: {
        //     Authorization: `Bearer ${localStorage.getItem("token")}`,
        //   },
        // })
        // .then((response) => {
        //   if (response.data.success) {
        //     toast.success(response.data.message);
        //     // Additional actions if needed
        //   } else {
        //     toast.error(response.data.message);
        //   }
        // })
        // .catch((error) => {
        //   toast.error("Something went wrong");
        // });

    };

    useEffect(() => {
        getTenantsData()
    }, []);
    return (
        <>
            <Layout />

            {dataForModal && (
                <TenantProfileModal data={dataForModal} onModalData={handleModalData}isModalVisible={isModalVisible} // Pass the modal visibility state to the child component
                                    onModalToggle={handleModalToggle} onFormSubmit={handleUpdateTenantDataSubmit} />
            )}
            <div className="layout">
            {tenants && tenants.length > 0 ? (
                <div>
                    <div className="ag-theme-alpine" style={{ height: '300px', width: '100%' }}>
                        <AgGridReact rowData={tenants} columnDefs={columnDefs} onCellClicked={handleCellClicked} />
                    </div>
                </div>
            ) : (
                <div>...Data is Loading</div>
            )}
            </div>
        </>
    )
}
