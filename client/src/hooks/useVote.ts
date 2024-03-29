import { FormEvent, useEffect, useState } from 'react';
import { IMdm, IMyRatio } from '@/apis/types/mdm-post ';
import { postMdmVote } from '@/apis/post-mdm-vote';
import { getMdmPost } from '@/apis/get-mdm';

export const getValue = (a: number, b: number) => {
    if (a + b === 0) return 0;
    if (a > b) {
        return (a / (a + b)) * 100;
    } else {
        return (b / (a + b)) * 100;
    }
};

export const useVote = (data: IMdm, handleDataChange: (id: number, newData: IMdm) => void) => {
    const [progressValue, setProgressValue] = useState<number>();

    const update = async (myRatio: IMyRatio) => {
        await postMdmVote(data.mdmId, myRatio);
        const newData = await getMdmPost(data.mdmId);
        handleDataChange(data.mdmId, newData);
    };

    const handleProgress = (e: FormEvent<HTMLInputElement>) => {
        const newProgressValue = parseInt(e.currentTarget.value);
        const myRatio: IMyRatio = {
            count1: 50,
            count2: 50,
        };
        if (newProgressValue < 50) {
            myRatio.count1 = Math.max((100 - newProgressValue) / 10, newProgressValue / 10);
            myRatio.count2 = Math.min((100 - newProgressValue) / 10, newProgressValue / 10);
        } else {
            myRatio.count1 = Math.min((100 - newProgressValue) / 10, newProgressValue / 10);
            myRatio.count2 = Math.max((100 - newProgressValue) / 10, newProgressValue / 10);
        }
        update(myRatio);
    };

    useEffect(() => {
        setProgressValue(getValue(data.opinion1.count, data.opinion2.count));
    }, [data]);

    return { handleProgress, progressValue, handleDataChange };
};
