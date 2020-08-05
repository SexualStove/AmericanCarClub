import axios from 'axios'

export default () => {
    return axios.create({
        baseURL: 'http://138.68.18.100:8081'
    });

}