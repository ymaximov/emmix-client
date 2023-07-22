import axios from 'axios'
import {useState, useEffect} from "react";

const options = {
    api: '/',
}

const useGet = (props = options) => {
    const [state, setState] = useState({isLoading: true});
    const token = JSON.parse(localStorage.getItem('token')).access_token
    useEffect(() => {
        axios
            .get(props.api, {
            headers: {
                Authorization: `Bearer ${token}`
            },
        })
            .then((res) => setState({data: res.data}))
            .catch((err) => setState({err}))
    }, [])
    return state
};

export default useGet