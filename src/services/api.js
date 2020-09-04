import axios from 'axios'
const BaseURL = 'http://138.68.18.100:8081';
//export const BaseURL = 'http://localhost:8081';
export default () => {

    return axios.create({
        baseURL: BaseURL
    });

}