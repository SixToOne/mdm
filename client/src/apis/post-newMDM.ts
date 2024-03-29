import axios from 'axios';

const path = '/mdms';

export const postNewMDM = async (formData: FormData) => {
    try {
        const res = await axios.post<{ mdmId: number }>(`${path}`, formData);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
