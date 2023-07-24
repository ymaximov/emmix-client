import React, {useEffect} from "react";
import {Navigate, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import {setUser} from "../redux/slices/userSlice";
import {showLoading, hideLoading} from "../redux/slices/alertsSlice";
import toast from 'react-hot-toast';

export default function AdminRoute(props) {
    const user = useSelector((state) => state.user);
    const role = user.user.role
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('token'))
        dispatch(setUser(user))
        if(user == null || user == undefined) {
            console.log(user)
            navigate('/login')
            return
        }
        if( role !== 'admin') {
            console.log(role);
            toast.error('You do not have permission to view this page')
            navigate('/')
            return
        }
    }, []);
    if(user === "loading") return "..."
    return props.children
}

