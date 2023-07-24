import Navbar from "./layout/Navbar";
import {Layout} from "./layout/Layout";
import {useSelector} from "react-redux";
import {Button, Col, Row} from "antd";

export const Home = () => {
    const state = useSelector(state => state.user)
    return (
        <div>
        <Layout />
            <div className="layout">
                <div className='top-menus'>
                    <Row gutter={20}>
                        <div>hi</div>
                    </Row>
                    <div className='quick-actions mb-4 mr-5'>
                        <Row gutter={20}>
                            <Col>
                                <Button className='quick-actions-button'>Add</Button>
                                <Button className='quick-actions-button'>Add</Button>
                                <Button className='quick-actions-button'>Add</Button>
                            </Col>
                        </Row>
                        <Row gutter={20}>
                            <Col className='mb-2'>
                                <Button className='quick-actions-button'>Add</Button>
                                <Button className='quick-actions-button'>Add</Button>
                                <Button className='quick-actions-button'>Add</Button>
                            </Col>
                        </Row>
                        <Row gutter={20}>
                            <Col>
                                <Button className='quick-actions-button'>Add</Button>
                                <Button className='quick-actions-button'>Add</Button>
                                <Button className='quick-actions-button'>Add</Button>
                            </Col>
                        </Row>
                        <Row gutter={20}>
                            <Col>
                                <Button className='quick-actions-button'>Add</Button>
                                <Button className='quick-actions-button'>Add</Button>
                                <Button className='quick-actions-button'>Add</Button>
                            </Col>
                        </Row>
                    </div>
                    <Row gutter={20}>
                        <div>hi</div>
                    </Row>
                    <div className='quick-actions mb-4'>
                        <Row gutter={20}>
                            <Col>
                                <Button className='quick-actions-button'>Add</Button>
                                <Button className='quick-actions-button'>Add</Button>
                                <Button className='quick-actions-button'>Add</Button>
                            </Col>
                        </Row>
                        <Row gutter={20}>
                            <Col className='mb-2'>
                                <Button className='quick-actions-button'>Add</Button>
                                <Button className='quick-actions-button'>Add</Button>
                                <Button className='quick-actions-button'>Add</Button>
                            </Col>
                        </Row>
                        <Row gutter={20}>
                            <Col>
                                <Button className='quick-actions-button'>Add</Button>
                                <Button className='quick-actions-button'>Add</Button>
                                <Button className='quick-actions-button'>Add</Button>
                            </Col>
                        </Row>
                        <Row gutter={20}>
                            <Col>
                                <Button className='quick-actions-button'>Add</Button>
                                <Button className='quick-actions-button'>Add</Button>
                                <Button className='quick-actions-button'>Add</Button>
                            </Col>
                        </Row>
                    </div>

                </div>
            </div>
        </div>
    )
}
