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
        const token = JSON.parse(localStorage.getItem('token')).access_token
        return axios[newProps.method](props.api, data, {
            headers: {
                Authorization: `Bearer ${token}`
            },
        })
            .then((res) => {
                setState({});
                toast.success(res.data.message)
                console.log(res, 'fetch usePut')
            })
            .catch((err) => toast.error(err?.response?.data?.message))
    };
    return {...state, onSubmit};
}

export default usePost;