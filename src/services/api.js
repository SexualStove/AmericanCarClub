import axios from 'axios'

export default () => {
    return axios.create({
        baseURL: `http://138.68.5.128:8081/`
    });

}