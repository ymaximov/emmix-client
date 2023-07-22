import React, { useState } from "react";
import {Table, Button, Row, Col, Form, Input, Select} from "antd";
// import Layout from '../../components/Layout'
import axios from "axios";
import toast from "react-hot-toast";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";


export const AddNewUserModal = () => {
    // const companyId = useSelector((state) => state.user).user.companyId._id;    /
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate()
    const token = JSON.parse(localStorage.getItem('token')).access_token
    const tenant = useSelector((state) => state.tenant).tenant.id
    console.log(tenant)
    // console.log(tenantID)
    const onFinish = async (values) => {
        console.log("received values of form", values);
        try {
            values.tenant_id = tenant
            const res = await axios.post("/api/user/add-new-user", values,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,

                    }
                });
            console.log(values, 'FORM VALUES')
            if (res.data.success) {
                toast.success(res.data.message);
                // setShowModal(false)
                // navigate('/')
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
            <i className="ri-user-add-line" onClick={() => setShowModal(true)}></i>
            {showModal ? (
                <>
                    <div className='modal'>

                        <div className='form-content'>
                            <i className="ri-close-circle-line" onClick={() => setShowModal(false)}></i>
                            <Form layout="vertical" onFinish={onFinish}>
                                <h1 className="card-title mt-3">User account details</h1>
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
                                    <Col span={8} xs={240} s={24} lg={8}>
                                        <Form.Item
                                            required
                                            label="Password"
                                            name="password"
                                            rules={[{ require: true }]}
                                        >
                                            <Input.Password placeholder="Password"></Input.Password>
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
                                        SUBMIT
                                    </Button>
                                </div>
                            </Form>
                        </div>
                    </div>
                </>
            ) : null}

        </div>
    );
};


