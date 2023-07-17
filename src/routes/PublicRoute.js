import React from "react";
import {Navigate} from "react-router-dom";

export default function PublicRoute(props) {
    const user = JSON.parse(localStorage.getItem('token'))
    if(user == null || user == undefined) {
        return  props.children
    }
    return <Navigate to='/' />

}