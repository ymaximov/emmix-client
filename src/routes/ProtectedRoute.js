import React, {useEffect} from "react";
import {Navigate, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import {setUser} from "../redux/slices/userSlice";
import {showLoading, hideLoading} from "../redux/slices/alertsSlice";

export default function ProtectedRoute(props) {
    const user = useSelector((state) => state.user);
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
    }, []);
    if(user === "loading") return "..."
    return props.children
}


