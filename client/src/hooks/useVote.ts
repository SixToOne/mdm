import { useCallback, useEffect, useState } from 'react';
import { IMdm, IMdmRatio } from '@/apis/types/mdm-post ';
import { postMdmVote } from '@/apis/post-mdm-vote';
import { getMdmPost } from '@/apis/get-mdm';

interface IUseVote {
    data: IMdm | undefined;
    handleDataChange: (id: number, newData: IMdm) => void;
}

export const useVote = ({ data, handleDataChange }: IUseVote) => {
    const [mdmResultPercentage, setMdmResultPercentage] = useState<IMdmRatio>();
    const [myMdmRatio, setMyMdmRatio] = useState<IMdmRatio>();
    const [rangeInputValue, setRangeInputValue] = useState<number>(50);

    useEffect(() => {
        init();
    }, [data]);

    const init = useCallback(() => {
        if (!data) return;
        const { opinion1, opinion2 } = data;
        const newMdmResultPercentage = {
            count1: getPercentage(opinion1.count + opinion2.count, opinion1.count),
            count2: getPercentage(opinion1.count + opinion2.count, opinion2.count),
        };
        setMdmResultPercentage(newMdmResultPercentage);
        const newMyMdmRatio = { count1: opinion1.count, count2: opinion2.count };
        setMyMdmRatio(newMyMdmRatio);
        if (opinion2.myRatio) setRangeInputValue(opinion2.myRatio * 10);
    }, [data]);

    const update = useCallback(
        async (myRatio: IMdmRatio) => {
            if (!data) return;
            await postMdmVote(data.mdmId, myRatio);
            const newData = await getMdmPost(data.mdmId);
            handleDataChange(data.mdmId, newData);
        },
        [data]
    );

    const changeMyMdmRatio = useCallback((count1: number, count2: number) => {
        const newMyMdmRatio = { count1, count2 };
        setMyMdmRatio(newMyMdmRatio);
        setRangeInputValue(count2 * 10);
        update(newMyMdmRatio);
    }, []);

    const handleProgress = (progressValue: number) => {
        const newMyMdmRatio = getMyMdmRatio(progressValue);
        setRangeInputValue(progressValue);
        setMyMdmRatio(newMyMdmRatio);
        update(newMyMdmRatio);
    };

    return {
        mdmResultPercentage,
        myMdmRatio,
        changeMyMdmRatio,
        rangeInputValue,
        handleProgress,
    };
};

export const getPercentage = (total: number, value: number): number => {
    if (total === 0) return 0;
    return Math.floor((value / total) * 100);
};

export const getMyMdmRatio = (progressValue: number): IMdmRatio => {
    const newMyMdmRatio: IMdmRatio = {
        count1: 50,
        count2: 50,
    };
    if (progressValue < 50) {
        newMyMdmRatio.count1 = Math.max((100 - progressValue) / 10, progressValue / 10);
        newMyMdmRatio.count2 = Math.min((100 - progressValue) / 10, progressValue / 10);
    } else {
        newMyMdmRatio.count1 = Math.min((100 - progressValue) / 10, progressValue / 10);
        newMyMdmRatio.count2 = Math.max((100 - progressValue) / 10, progressValue / 10);
    }
    return newMyMdmRatio;
};
