import axios from 'axios';
import Ad from '../models/Ad';

const api = (API_URL = 'http://localhost:5000') => {
    return {
        registerUser: async ({ email, password }) => {
            const API_END = `${API_URL}/user/register`;

            try {
                const responseBody = await axios.post(
                API_END, 
                {
                    email: email,
                    password: password
                },
                {
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                    },
                })

                return responseBody;

            } catch (error) {
                console.log(error.response.data);
                
            }
        },
        loginUser: async ({ email, password }) => {
            const API_END = `${API_URL}/user/login`;

            try {
                const responseBody = await axios.post(
                API_END, 
                {
                    email: email,
                    password: password
                },
                {
                    headers: {
                      'Access-Control-Allow-Origin': '*',
                    },
                });

                return responseBody;

            } catch (error) {
                console.log(error.response.data);
            }
        },
        tokenAuthentication: async token => {
            const API_END = `${API_URL}/tokenIsValid`;

            try {
                let response = await axios.post(
                    API_END, 
                    null,
                    { headers: { "x-auth-token": token } }
                );
                return response.data;
            } catch (error) {
                console.log(error);
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
        getAds: async (params) => {
            let baseURL = `${API_URL}/api/item/${params}`;
            let res = await axios.get(baseURL);
            console.log('LLLLLLLLEEEEEEEEEEEEEEEEEEEEEEEEEPPPPPP', res)
            return res.data || [];
        }
    }
}

export default api;