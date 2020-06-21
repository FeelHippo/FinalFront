import axios from 'axios';
import Ad from '../models/Ad';

const api = (API_URL = 'http://localhost:5000') => {
    return {
        registerUser: async ({ username, password }) => {
            const API_END = `${API_URL}/user/register`;

            try {
                const responseBody = await axios.post(API_END, {
                    username: username,
                    password: password
                },
                {withCredentials: true})

                return responseBody;

            } catch (error) {
                console.log(error.response.data);
                
            }
        },
        loginUser: async ({username, password}) => {
            const API_END = `${API_URL}/user/login`;

            try {
                const responseBody = await axios.post(API_END, {
                    username: username,
                    password: password
                },
                {withCredentials: true})

                return responseBody;

            } catch (error) {
                console.log(error.response.data);
            }
        },
        getTags: async () => {
            const API_END = `${API_URL}/api/tags`;

            try {
                let result = await axios.get(API_END);
                return result; 

            } catch (error) {
                console.log(error);
                
            }
        },
        getAll: async () => {
            let baseURL = `${API_URL}/api/item`;
            let res = await axios.get(baseURL);
            return res.data || [];
        }
    }
}

export default api;