import axios from 'axios';
import {useState, useEffect} from "react";
import toast from 'react-hot-toast';

const options = {
    api: '/',
    method: 'post',
}

const usePost = (props = options) => {
    const [state, setState] = useState({});

    const onSubmit = (data) => {
        setState({isLoading: true});
        const newProps = {...options, ...props};
        return axios[newProps.method](props.api, data, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
        })
            .then((res) => {
                setState({});
                toast.success(res.data.message)
            })
            .catch((err) => toast.error(err?.response?.data?.message))
    };
    return {...state, onSubmit};
}

export default usePost;