import {useContext, useEffect, useState} from "react";
import axios from "axios";
import {Button, Typography} from "antd";
import {useNavigate} from 'react-router-dom';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import 'ag-grid-enterprise';
import {Tabs, Col, Row, Tag} from 'antd';
import {Layout} from '../layout/Layout';
import {QuickbookContext} from '../../App';

const { Text } = Typography;
const onChange = key => null;

const INVOICES_URL = 'http://localhost:8080/api/admin/invoices';
const tenantId = JSON.parse(localStorage.getItem('token'))?.tenant_id;
const SALES_ORDERS_URL = `http://localhost:8080/api/sales/sales-orders/${tenantId}`;
const GET_PDF_URL = 'http://localhost:8080/api/admin/invoice-pdf/';
const CREATE_INVOICE_URL = 'http://localhost:8080/api/admin/create-invoice';
const RELEASE_SALES_ORDER_URL = 'http://localhost:8080/api/sales/release-so';
const token = JSON.parse(localStorage.getItem('token'))?.access_token;

const generateUniquePdfName = () => {
    const now = new Date();
    const dateString = now.toISOString().replace(/[\-:T.]/g, '').slice(0, 14);
    const randomString = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `invoice_${dateString}${randomString}.pdf`;
};

const releaseSO = async (totalAmount, so_id) => {
    axios({
        url: CREATE_INVOICE_URL,
        method: 'post',
        data: {
            totalAmount
        }
    })

    axios({
        url: RELEASE_SALES_ORDER_URL,
        method: 'put',
        data: {
            tenant_id: tenantId,
            so_id
        },
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })
};

const items = ({ invoices = [], salesOrders }, getInvoice, setFetchTrigger) => [
  {
    key: "1",
    label: <div>All Invoices {invoices?.QueryResponse?.totalCount ?? 0}</div>,
    children: (
      <div>
        {invoices.QueryResponse &&
          invoices.QueryResponse?.Invoice?.map((invoice, index) => (
            <Row gutter={16} key={index} style={{ marginBottom: 8 }}>
              <Col className="gutter-row" span={5}>
                {invoice.CustomerRef.name} - Total Amount:{" "}
                <strong>{invoice.TotalAmt}$</strong>
              </Col>
              <Col className="gutter-row" span={6}>
                <Button onClick={() => getInvoice(invoice.Id)}>Get PDF</Button>
              </Col>
            </Row>
          ))}
      </div>
    ),
  },
  {
    key: "2",
    label: "Sales Orders",
    children: (
      <div>
        {salesOrders &&
          salesOrders.map((so, index) => (
            <Row gutter={[16, 8]} key={`${index}-so`} style={{ marginBottom: 8 }}>
              <Col className="gutter-row" span={2}>
                Status: <Tag color="default">{so.status}</Tag>
              </Col>
              <Col className="gutter-row" span={2}>
                Sales tax: {Number(so.sales_tax)}$
              </Col>
              <Col className="gutter-row" span={2}>
                Subtotal: {Number(so.subtotal)}$
              </Col>
              <Col className="gutter-row" span={2}>
                <strong>Total</strong>: {Number(so.total_amount)}$
              </Col>
              <Col className="gutter-row" span={4}>
                <Text strong>Due Date</Text>:{" "}
                {new Date(so.due_date).toLocaleString("en-GB", {
                  timeZone: "UTC",
                })}
              </Col>
              <Col className="gutter-row" span={4}>
                <Button
                  onClick={() => {
                    releaseSO(so.total_amount, so.id);
                    setFetchTrigger();
                  }}
                  disabled={so.released}
                >
                    {so.released ? 'Released' : 'Release'}
                </Button>
              </Col>
            </Row>
          ))}
      </div>
    ),
  },
];

const getAllData = async dispatch => {
    const [invoicesResp, soResp] = await Promise.all([
      axios.get(INVOICES_URL),
      axios.get(SALES_ORDERS_URL),
    ]);

    dispatch({
      type: "SET_INVOICES",
      payload: invoicesResp.data.data,
    });

    dispatch({
      type: "SET_SALES_ORDERS",
      payload: soResp.data.salesOrders,
    });
  };

export const Invoices = () => {
    const {state, dispatch} = useContext(QuickbookContext);
    const {givenName, familyName, email, phoneNumber} = state.user?.userInfo ?? {};
    const {CompanyName, LegalName, Email, Country} = state.user?.companyInfo.CompanyInfo ?? {};
    const [fetchTrigger, setFetchTrigger] = useState(0);

    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch({
            type: 'LOGOUT',
        });
        navigate('/admin/quickbooks');
    };

    const isAuthenticated = state.isLoggedIn;
    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/admin/quickbooks');
        }
    }, [isAuthenticated, navigate]);

    useEffect(() => {
        getAllData(dispatch);
    }, [fetchTrigger]);

    const getInvoice = async (invoiceId) => {
        try {
            const response = await axios({
                method: 'get',
                url: `${GET_PDF_URL}${invoiceId}`,
                responseType: 'blob',
            });
            const blob = new Blob([response.data], {type: 'application/pdf'});
            const downloadUrl = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = downloadUrl;
            const uniquePdfName = generateUniquePdfName();
            link.setAttribute('download', uniquePdfName);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.log(error)
        }
    }

    const tabs = items(
      { invoices: state.invoices, salesOrders: state.salesOrders },
      getInvoice,
      setFetchTrigger
    );

    return (
        <>
            <Layout/>
            <div className="layout">
                <div>Invoice data</div>
                <Button onClick={() => handleLogout()}>Logout From Quickbooks</Button>
                <Button>Create Payable Invoice</Button>

                <div style={{display: 'flex', flexDirection: 'row'}}>
                    <div className="content" style={{display: 'flex', flexDirection: 'column', marginRight: 20}}>
                    <span>
                        <h2>User Info</h2>
                    </span>
                        <span>
                        <strong>Given Name : </strong>
                            {givenName}
                    </span>
                        <span>
                    <strong>Family Name : </strong>
                            {familyName}
                    </span>
                        <span>
                        <strong>Email : </strong>
                            {email}
                    </span>
                        <span>
                    <strong>Phone Number : </strong>
                            {phoneNumber}
                    </span>
                    </div>

                    <div className="content" style={{display: 'flex', flexDirection: 'column'}}>
                    <span>
                        <h2>Company Info</h2>
                    </span>
                        <span>
                    <strong>Company Name : </strong>
                            {CompanyName}
                    </span>
                        <span>
                        <strong>Legal Name : </strong>
                            {LegalName}
                    </span>
                        <span>
                        <strong>Company Email : </strong>
                            {Email.Address}
                    </span>
                        <span>
                        <strong>Locale : </strong>
                            {Country}
                    </span>
                    </div>
                </div>

                <Tabs defaultActiveKey="1" items={tabs} onChange={onChange}/>
            </div>
        </>
    );
}