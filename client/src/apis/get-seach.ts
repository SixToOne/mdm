import axios from 'axios';

const path = '/search';

export interface ITag {
    tag: string;
    cnt: number;
}

export const getSearchTags = async (keyword: string) => {
    const res = await axios.get<{ tags: ITag[] }>(`${path}/tag?keyword=${keyword}`);
    return res.data;
};
