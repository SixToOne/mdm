import axios from 'axios';

export const axiosConfig = () => {
    axios.defaults.baseURL = process.env.REACT_APP_API_SERVER;
    axios.defaults.withCredentials = true;

    axios.interceptors.response.use(
        (response) => {
            const { data } = response;
            return data;
        },
        (error) => {
            console.error(error);
            return { data: undefined };
            // return Promise.reject(error);
        }
    );
};
