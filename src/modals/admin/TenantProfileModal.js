import React, { useState } from "react";
import { Form, Row, Col, Button, Input, Space, Select, Tabs} from "antd";
import axios from "axios";
import toast from "react-hot-toast";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";


export const TenantProfileModal = ({ data, onModalData }) => {
    // const companyId = useSelector((state) => state.user).user.companyId._id;
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate()


        // const onFinish = async (values) => {
        //     console.log("received values of form", values);
        //     try {
        //         values.companyId = companyId
        //         const res = await axios.post("/api/user/create-business-partner", values,
        //             {
        //                 headers: {
        //                     Authorization: `Bearer ${localStorage.getItem('token')}`,
        //
        //                 }
        //             });
        //         if (res.data.success) {
        //             toast.success(res.data.message);
        //             setShowModal(false)
        //             navigate('/')
        //         } else {
        //             toast.error(res.data.message);
        //         }
        //     } catch (error) {
        //         toast.error("Something went wrong");
        //     }
        // };
        return (

            <div className='modal'>
                <Tabs className='form-content'>
                    <Tabs.TabPane tab="Company Information" key={0}>
                        <div>
                            <Form layout="vertical">
                                <h1 className="card-title mt-3">Company Details</h1>
                                <Row gutter={20}>
                                    <Col span={8} xs={240} s={24} lg={8}>
                                        <Form.Item
                                            required
                                            label="VAT/Tax ID"
                                            name="taxId"
                                            rules={[{ require: true }]}
                                        >
                                            <Input placeholder="VAT/Tax ID"></Input>
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={20}>
                                    <Col span={8} xs={240} s={24} lg={8}>
                                        <Form.Item
                                            required
                                            label="Company Name"
                                            name="companyName"
                                            rules={[{ require: true }]}
                                        >
                                            <Input placeholder="Company Name"></Input>
                                        </Form.Item>
                                    </Col>
                                    <Col span={8} xs={240} s={24} lg={8}>
                                        <Form.Item
                                            required
                                            label="Main Contact Name"
                                            name="mainContact"
                                            rules={[{ require: true }]}
                                        >
                                            <Input placeholder="Main Contact Name"></Input>
                                        </Form.Item>
                                    </Col>
                                    <Col span={8} xs={240} s={24} lg={8}>
                                        <Form.Item
                                            required
                                            label="Phone Number"
                                            name="phoneNumber"
                                            rules={[{ require: true }]}
                                        >
                                            <Input placeholder="Phone Number"></Input>
                                        </Form.Item>
                                    </Col>
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
                                            label="Website"
                                            name="website"
                                            rules={[{ require: true }]}
                                        >
                                            <Input placeholder="Website"></Input>
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
                                </Row>
                                <Row>
                                </Row>
                                <div className="d-flex justify-content-end">
                                    {/*<Button loading={loading_v2} disabled={loading_v2} className="primary-button" htmlType="submit">*/}
                                    {/*    Update*/}
                                    {/*</Button>*/}
                                </div>
                            </Form>
                        </div>
                    </Tabs.TabPane>
                   <Tabs.TabPane tab='User Accounts' key={1}>
                       <div>
                           <div>
                               <Form layout="vertical">
                                   <h1 className="card-title mt-3">Company Details</h1>
                                   <Row gutter={20}>
                                       <Col span={8} xs={240} s={24} lg={8}>
                                           <Form.Item
                                               required
                                               label="VAT/Tax ID"
                                               name="taxId"
                                               rules={[{ require: true }]}
                                           >
                                               <Input placeholder="VAT/Tax ID"></Input>
                                           </Form.Item>
                                       </Col>
                                   </Row>
                                   <Row gutter={20}>
                                       <Col span={8} xs={240} s={24} lg={8}>
                                           <Form.Item
                                               required
                                               label="Company Name"
                                               name="companyName"
                                               rules={[{ require: true }]}
                                           >
                                               <Input placeholder="Company Name"></Input>
                                           </Form.Item>
                                       </Col>
                                       <Col span={8} xs={240} s={24} lg={8}>
                                           <Form.Item
                                               required
                                               label="Main Contact Name"
                                               name="mainContact"
                                               rules={[{ require: true }]}
                                           >
                                               <Input placeholder="Main Contact Name"></Input>
                                           </Form.Item>
                                       </Col>
                                       <Col span={8} xs={240} s={24} lg={8}>
                                           <Form.Item
                                               required
                                               label="Phone Number"
                                               name="phoneNumber"
                                               rules={[{ require: true }]}
                                           >
                                               <Input placeholder="Phone Number"></Input>
                                           </Form.Item>
                                       </Col>
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
                                               label="Website"
                                               name="website"
                                               rules={[{ require: true }]}
                                           >
                                               <Input placeholder="Website"></Input>
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
                                   </Row>
                                   <Row>
                                   </Row>
                                   <div className="d-flex justify-content-end">
                                       {/*<Button loading={loading_v2} disabled={loading_v2} className="primary-button" htmlType="submit">*/}
                                       {/*    Update*/}
                                       {/*</Button>*/}
                                   </div>
                               </Form>
                           </div>
                       </div>
                   </Tabs.TabPane>
                </Tabs>
            </div>
     )}



