import React, { useState } from "react";
import {Table, Button, Row, Col, Form, Input, Select} from "antd";
// import Layout from '../../components/Layout'
import axios from "axios";
import toast from "react-hot-toast";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {ChangePasswordModal} from "../ChangePasswordModal";
import {url} from '../../connections/toServer'


export const UpdateUserModal = ({ isOpen, data, closeModal, setRowData, getUsersData }) => {
    // const companyId = useSelector((state) => state.user).user.companyId._id;    /
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate()
    const token = JSON.parse(localStorage.getItem('token')).access_token
    const tenant = useSelector((state) => state.tenant).tenant.id
    console.log(tenant)
    console.log(data, 'data')
    const [formData, setFormData] = useState({
        // Initialize form fields based on the data received
        first_name: data ? data.first_name : '',
        last_name: data ? data.last_name : '',
        email: data ? data.email : '',
        phone: data ? data.phone : '',
        role: data ? data.role : '',
        account_status: data ? data.account_status : '',

        // Add more form fields as needed
    });
    // console.log(tenantID)
    const onFinish = async (values) => {
        console.log("received values of form", values);
        try {
            values.tenant_id = tenant
            const res = await axios.put(`${url}/api/user/update-user`, values,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,

                    }
                });
            if (res.data.success) {
                toast.success(res.data.message);
                getUsersData()
                closeModal()
                // navigate('/admin/companyprofile')
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            toast.error("Something went wrong");
            console.log(error)
        }
    };


    return (

        <div className='new-bp-modal'>
                <>
                    <div className='modal'>
                        <div className='form-content'>
                            <i className="ri-close-circle-line" onClick={closeModal}></i>
                            <h1 className='modal-title'>Update User Account</h1>
                            <Form layout="vertical" onFinish={onFinish} initialValues={formData}>
                                <h1 className="card-title mt-3 mb-3">User account details</h1>
                                <Row gutter={20}>
                                    <Col span={8} xs={240} s={24} lg={8}>
                                        <Form.Item
                                            required
                                            name="account_status" // Use the name prop to link the form field with form data
                                            label="Account Status"
                                            rules={[{ required: true, message: 'Please select an account type' }]}
                                        >
                                            <select className="bp-type custom-select">
                                                <option>--Please Select an Option--</option>
                                                <option value="active">Active</option>
                                                <option value="inactive">Inactive</option>
                                                <option value="deleted">Deleted</option>
                                            </select>
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={20}>
                                    <Col span={8} xs={240} s={24} lg={8}>
                                        <Form.Item
                                            label="First Name"
                                            name="first_name"
                                            rules={[{ require: false }]}
                                        >
                                            <Input placeholder="First Name"></Input>
                                        </Form.Item>
                                    </Col>
                                    <Col span={8} xs={240} s={24} lg={8}>
                                        <Form.Item
                                            label="Last Name"
                                            name="last_name"
                                            rules={[{ require: false }]}
                                        >
                                            <Input placeholder="Last Name"></Input>
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={20}>

                                    <Col span={8} xs={240} s={24} lg={8}>
                                        <Form.Item
                                            required
                                            label="Email Address"
                                            name="email"
                                            rules={[{ require: true }]}
                                        >
                                            <Input placeholder="Email Address"></Input>
                                        </Form.Item>
                                    </Col>
                                    <Col span={8} xs={240} s={24} lg={8}>
                                        <Form.Item
                                            required
                                            label="Phone Number"
                                            name="phone"
                                            rules={[{ require: true }]}
                                        >
                                            <Input placeholder="Phone Number"></Input>
                                        </Form.Item>
                                    </Col>
                                    <Col>
                                        <Form.Item
                                            required
                                            name="role" // Use the name prop to link the form field with form data
                                            label="Account Type"
                                            rules={[{ required: true, message: 'Please select an account type' }]}
                                        >
                                            <select className="bp-type">
                                                <option>--Please Select an Option--</option>
                                                <option value="admin">Admin</option>
                                                <option value="super user">Super User</option>
                                                <option value="professional user">Professional User</option>
                                                <option value="standard user">Limited User</option>
                                            </select>
                                        </Form.Item>
                                    </Col>
                                </Row>
                                {/* <Row gutter={20}>
        <Col span={8} xs={240} s={24} lg={8}>
            <Form.Item
              required
              label="Address"
              name="address"
              rules={[{ require: true }]}
            >
              <Input placeholder="Address"></Input>
            </Form.Item>
          </Col>
          <Col span={8} xs={240} s={24} lg={8}>
            <Form.Item
              required
              label="Address"
              name="address"
              rules={[{ require: true }]}
            >
              <Input placeholder="Address"></Input>
            </Form.Item>
          </Col>
          <Col span={8} xs={240} s={24} lg={8}>
            <Form.Item
              required
              label="Address"
              name="address"
              rules={[{ require: true }]}
            >
              <Input placeholder="Address"></Input>
            </Form.Item>
          </Col>
        </Row> */}
                                <div className="d-flex justify-content-end">
                                    <Button className="primary-button" htmlType="submit">
                                        Update
                                    </Button>
                                </div>
                            </Form>
                            <div className='mt-5 chp' onClick={() => navigate('/admin/resetpassword')}>Change Password</div>
                        </div>
                    </div>
                </>

        </div>
    );
};


