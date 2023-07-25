import axios from "axios";

axios.interceptors.response.use((response) =>{
    return response;
}, (error)=> {
    const { response } = error;
    const { data } = response;
});

axios.interceptors.request.use((config) =>{
    const token = localStorage.getItem('token');
    config.headers['Access-Control-Allow-Origin'] = "*"
    config.headers['x-access-token'] =  token;
    return config;
});

export const get = axios.get;

export const post = axios.post;

export const patch = axios.patch;

export const _delete = axios.delete;

