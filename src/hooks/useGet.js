import axios from 'axios'
import {useState, useEffect} from "react";

const options = {
    api: '/',
}

const useGet = (props = options) => {
    const [state, setState] = useState({isLoading: true});
    useEffect(() => {
        axios
            .get(props.api, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
        })
            .then((res) => setState({data: res.data}))
            .catch((err) => setState({err}))
    }, [])
    return state
};

export default useGet