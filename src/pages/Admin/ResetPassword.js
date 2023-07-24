import {Button, Col, Form, Input, Row, Select} from "antd";
import {Layout} from "../layout/Layout";
import React from "react";
import axios from "axios";
import toast from "react-hot-toast";

export const ResetPassword = () => {
    const token = JSON.parse(localStorage.getItem('token')).access_token
    const [form] = Form.useForm();
    const onFinish = async (values) => {
        console.log("received values of form", values);
        try {
            const res = await axios.put("/api/admin/reset-password", values,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,

                    }
                });

            if (res.data.success) {
                toast.success(res.data.message);
                form.resetFields()
            } else {
                toast.eror(res.data.message)
            }
        } catch (error) {
            toast.error(error.response.data.message);
            console.log(error.response, 'error')
        }
    };
    return (
        <>
            <Layout />
            <div className='layout'>
            <Form layout="vertical" className='mt-4' onFinish={onFinish} form={form}>
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
                </Row>
                <Row  gutter={20}>
                    <Col span={8} xs={240} s={24} lg={8}>
                        <Form.Item
                            required
                            label="New Password"
                            name="password"
                            rules={[{ require: true }]}
                        >
                            <Input.Password placeholder="New Password"></Input.Password>
                        </Form.Item>
                    </Col>
                    <Col span={8} xs={240} s={24} lg={8}>
                        <Form.Item
                            required
                            label="Confirm New Password"
                            name="confirm_password"
                            rules={[{ require: true }]}
                        >
                            <Input.Password placeholder="Confirm New Password"></Input.Password>
                        </Form.Item>
                    </Col>
                </Row>



                <div className="d-flex justify-content-end">
                    <Button className="primary-button" htmlType="submit">
                        Change Password
                    </Button>
                </div>
            </Form>
            </div>
        </>
    )
}
