import endpoint from './endpoints';
import axios from "axios";
let token = localStorage.getItem('token')

export default {
    updateUser: (data, userEmail) => {
        let method = "patch";
        let url = `${endpoint.USER.UPDATE_USER}/${userEmail}`
        return axios({ method, url, token, data });
    },
}