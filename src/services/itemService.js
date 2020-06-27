import axios from 'axios';

const api = (API_URL = 'http://localhost:5000') => {
    return {
        registerUser: async ({ username, email, password }) => {
            const API_END = `${API_URL}/user/register`;

            try {
                const responseBody = await axios.post(
                API_END, 
                {
                    username: username,
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
        loginUser: async ({ username, password }) => {
            const API_END = `${API_URL}/user/login`;
            
            try {
                const responseBody = await axios.post(
                API_END, 
                {
                    username: username,
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
        retrievePassword: async email => {
            const API_END = `${API_URL}/password`;
            try {
                let response = await axios.post(
                    API_END,
                    {
                        email: email
                    },
                    {
                        headers: {
                          'Access-Control-Allow-Origin': '*',
                        },
                    }
                )
                return response.data;
            } catch (error) {
                console.log(error)
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
            try {
                let res = await axios.get(baseURL);
                return res.data || [];
            } catch (error) {
                console.log(error.response.data)
            }
        },
        postAd: async ad => {
            const API_END = `${API_URL}/api/item/`;
            let { name, price, description, type, photo, tags } = ad;

            try {
                const responseBody = await axios.post(API_END,
                    {
                        name: name, 
                        price: price,
                        description: description,
                        tags: tags,
                        type: type,
                        photo: photo,
                    },    
                );
                return responseBody.data;
            } catch (error) {
                
            }
        },
        getAd: async id => {
            const API_END = `${API_URL}/api/item/${id}`;
            
            try {
                const result = await axios.get(API_END);
                return result.data;
            } catch (error) {
                console.log(error);
            }
        }
    }
}

export default api;