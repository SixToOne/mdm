import axios from 'axios';

const path = '/search/tag';

export const getSearchTags = async (keyword: string) => {
    const res = await axios.get<{ tags: string[] }>(`${path}?keyword=${keyword}`);
    return res.data;
};
