import axios, { AxiosResponse } from 'axios';

export const axiosConfig = () => {
    axios.defaults.baseURL = process.env.REACT_APP_API_SERVER;
    axios.defaults.withCredentials = true;

    axios.interceptors.response.use(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (response: AxiosResponse<any>) => {
            return response.data;
        },
        (error) => {
            return Promise.reject(error);
        }
    );
};
