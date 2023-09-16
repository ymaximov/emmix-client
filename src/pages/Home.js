import Navbar from "./layout/Navbar";
import {Layout} from "./layout/Layout";
import {useSelector} from "react-redux";
import {Col, Row} from "antd";
import { Formik, Form, Field } from 'formik';
import {useNavigate} from "react-router-dom";
import React, {useState} from "react";

export const Home = () => {
    const state = useSelector(state => state.user)
    const [inputValue, setInputValue] = useState('');
    const navigate = useNavigate()
    const initialValues = {
        code: '', // Initial value for the code field
    };

    const handleSubmit = (values) => {
        // Access the input value from Formik's values object
        const code = values.code.toLowerCase();

        // Update the state variable with the lowercase input value
        setInputValue(code);

        console.log('Form values:', values);
    }

        switch (inputValue) {
        case "pl01":
            navigate('/purchasing')
            break;

        case "pl02":
            navigate('/purchasing/createpo')
            break;

        case "il01":
            navigate('/inventory')
            break;
            case "mm01":
                navigate('/purchasing/goodsreceipt')
                break;

        default:
            // Code to execute when inputValue doesn't match any of the specified cases
            break;
    }

    return (
        <div>
        <Layout />
            <div className="layout">
                <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                    <Form>
                        <Row gutter={10}>
                            <Col span={5} xs={5} s={5} lg={2}>
                                <div>
                                    <label htmlFor="code">.</label>
                                    <Field
                                        type="text"
                                        id="code"
                                        name="code"
                                        placeholder={'Module'}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </Col>
                            <Col span={8} xs={240} s={24} lg={8}>
                                <div className="d-flex justify-content-end">
                                    <button
                                        type="submit"
                                        className="mt-6 rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    >
                                        Execute
                                    </button>
                                </div>
                            </Col>
                        </Row>
                    </Form>
                </Formik>
                {/*<div className='top-menus'>*/}
                {/*    <Row gutter={20}>*/}
                {/*        <div>hi</div>*/}
                {/*    </Row>*/}
                {/*    <div className='quick-actions mb-4 mr-5'>*/}
                {/*        <Row gutter={20}>*/}
                {/*            <Col>*/}
                {/*                <Button className='quick-actions-button'>Add</Button>*/}
                {/*                <Button className='quick-actions-button'>Add</Button>*/}
                {/*                <Button className='quick-actions-button'>Add</Button>*/}
                {/*            </Col>*/}
                {/*        </Row>*/}
                {/*        <Row gutter={20}>*/}
                {/*            <Col className='mb-2'>*/}
                {/*                <Button className='quick-actions-button'>Add</Button>*/}
                {/*                <Button className='quick-actions-button'>Add</Button>*/}
                {/*                <Button className='quick-actions-button'>Add</Button>*/}
                {/*            </Col>*/}
                {/*        </Row>*/}
                {/*        <Row gutter={20}>*/}
                {/*            <Col>*/}
                {/*                <Button className='quick-actions-button'>Add</Button>*/}
                {/*                <Button className='quick-actions-button'>Add</Button>*/}
                {/*                <Button className='quick-actions-button'>Add</Button>*/}
                {/*            </Col>*/}
                {/*        </Row>*/}
                {/*        <Row gutter={20}>*/}
                {/*            <Col>*/}
                {/*                <Button className='quick-actions-button'>Add</Button>*/}
                {/*                <Button className='quick-actions-button'>Add</Button>*/}
                {/*                <Button className='quick-actions-button'>Add</Button>*/}
                {/*            </Col>*/}
                {/*        </Row>*/}
                {/*    </div>*/}
                {/*    <Row gutter={20}>*/}
                {/*        <div>hi</div>*/}
                {/*    </Row>*/}
                {/*    <div className='quick-actions mb-4'>*/}
                {/*        <Row gutter={20}>*/}
                {/*            <Col>*/}
                {/*                <Button className='quick-actions-button'>Add</Button>*/}
                {/*                <Button className='quick-actions-button'>Add</Button>*/}
                {/*                <Button className='quick-actions-button'>Add</Button>*/}
                {/*            </Col>*/}
                {/*        </Row>*/}
                {/*        <Row gutter={20}>*/}
                {/*            <Col className='mb-2'>*/}
                {/*                <Button className='quick-actions-button'>Add</Button>*/}
                {/*                <Button className='quick-actions-button'>Add</Button>*/}
                {/*                <Button className='quick-actions-button'>Add</Button>*/}
                {/*            </Col>*/}
                {/*        </Row>*/}
                {/*        <Row gutter={20}>*/}
                {/*            <Col>*/}
                {/*                <Button className='quick-actions-button'>Add</Button>*/}
                {/*                <Button className='quick-actions-button'>Add</Button>*/}
                {/*                <Button className='quick-actions-button'>Add</Button>*/}
                {/*            </Col>*/}
                {/*        </Row>*/}
                {/*        <Row gutter={20}>*/}
                {/*            <Col>*/}
                {/*                <Button className='quick-actions-button'>Add</Button>*/}
                {/*                <Button className='quick-actions-button'>Add</Button>*/}
                {/*                <Button className='quick-actions-button'>Add</Button>*/}
                {/*            </Col>*/}
                {/*        </Row>*/}
                {/*    </div>*/}

                {/*</div>*/}
            </div>
        </div>
    )
}
