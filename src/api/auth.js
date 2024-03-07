import endpoint from './endpoints';
import axios from "axios";
// let token = import.meta.env.VITE_TEMP_TOKEN;

export default {
    register: data => {
        let method = "post";
        let url = endpoint.AUTH.REGISTER
        return axios({ method, url, data });
    },
    login: data => {
        let method = "post";
        let url = endpoint.AUTH.LOGIN
        return axios({ method, url, data });
    }, 
}