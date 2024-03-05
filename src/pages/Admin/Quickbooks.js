import React, {useState, useEffect, useContext} from 'react';
import {Spin} from 'antd';

import {Button} from "antd";
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import {QuickbookContext} from '../../App';
import {Layout} from "../layout/Layout";

export default function Quickbooks() {
    const token = JSON.parse(localStorage.getItem('token')).access_token
    const {state, dispatch} = useContext(QuickbookContext);
    const navigate = useNavigate();
    const [data, setData] = useState({errorMessage: '', isLoading: false});

    const {authorize_url} = state;
    const isAuthenticated = state.isLoggedIn;

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/admin/invoices');
        }
    }, [isAuthenticated, navigate]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        const url = window.location.href;
        const hasCode = url.includes('?code=');

        if (hasCode) {
            const newUrl = url.split('?code=');
            window.history.pushState({}, null, newUrl[0]);
            setData({...data, isLoading: true});

            const requestData = {
                client_id: state.client_id,
                redirect_uri: state.redirect_uri,
                client_secret: state.client_secret,
                code: newUrl[1],
                url: url,
            };
            const proxy_url = state.proxy_url;

            axios.post(proxy_url, requestData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            }).then(response => {
                dispatch({
                    type: 'LOGIN',
                    payload: {user: response.data, isLoggedIn: true},
                });
            }).catch(() => {
                setData({
                    isLoading: false,
                    errorMessage: 'Sorry! Login failed',
                });
            });
        }
    }, [state, dispatch, data]);

    const buttonClicked = () => {
        fetch(authorize_url, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((res) => res.text())
            .then((url) => {
                window.location.href = url;
            })
            .catch(err => console.error(err));
    };

    return (
        <div>
            <Layout/>
            <div className="layout">
                <h1>OAuth2.0 using React</h1>
                <span>{data.errorMessage}</span>
                <div className="login-container" style={{minHeight: 200}}>
                    {data.isLoading ? (
                        <div style={{marginTop: 100}}>
                            <Spin size="large" tip="Please wait...connecting to Quickbooks Dashboard">
                                <div className="content"/>
                            </Spin>
                        </div>
                    ) : (
                        <>
                            <Button
                                className="login-link"
                                onClick={() => {
                                    buttonClicked();
                                    setData({...data, errorMessage: ''});
                                }}
                            >
                                Connect to Quickbooks
                            </Button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};