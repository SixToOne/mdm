import axios from 'axios';

const path = '/mdms';

export const postNewMDM = async (formData: FormData) => {
    try {
        const res = await axios.post<{ id: number }>(`${path}`, formData);
        console.log(res.data);
        return res.data;
    } catch (error) {
        alert('필수 입력란을 모두 기입해주세요.');
        console.log(error);
    }
};
