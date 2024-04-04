import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { IMdm } from '@/apis/types/mdm';
import { getMdmPost } from '@/apis/get-mdm';
import { getFormattedYearMonthDayTime } from '@/utils/time';
import { useVote } from '@/hooks/useVote';
import MdmVoteForm from '@/components/MdmVoteForm';
import { MdmResult, NotVote, VoteCount } from '@/components/MdmCard/MdmCard';
import { ProgressBar } from '@/components/commons';
import MdmComments from '@/components/MdmComments';
import Tag from '@/components/Tag';
import RelatedQuiz from '@/components/RelatedQuiz';
import { IRelatedQuiz } from '@/apis/types/mdm';
import { getMdmRelatedQuiz } from '@/apis/get-mdm';
import { ArrowDown } from '@/components/icons';

const MDM = () => {
    const { id } = useParams();
    if (!id) return null;

    const [mdmData, setMdmData] = useState<IMdm>();
    const [relatedQuiz, setRelatedQuiz] = useState<IRelatedQuiz[]>([]);
    const [toggle, setToggle] = useState<boolean>(false);

    const fetchMdmData = useCallback(async () => {
        const data = await getMdmPost(parseInt(id));
        if (data) setMdmData(data);
    }, []);

    const fetchRelatedQuiz = useCallback(async () => {
        const data = await getMdmRelatedQuiz(parseInt(id));
        if (data) setRelatedQuiz(data);
    }, []);

    useEffect(() => {
        fetchMdmData();
        fetchRelatedQuiz();
    }, [id]);

    const handleDataChange = (id: number, newData: IMdm) => {
        if (!mdmData) return;
        setMdmData(newData);
    };

    const { mdmResultPercentage, rangeInputValue, handleProgress, changeMyMdmRatio } = useVote({
        data: mdmData,
        handleDataChange,
    });

    if (!mdmData) return <>...loading</>;

    return (
        <StyledMDM>
            {mdmData.title && <PostTitle>{mdmData.title}</PostTitle>}
            <PostInfo>
                <div>
                    <Nickname>{mdmData.nickname}</Nickname>
                    <span>{getFormattedYearMonthDayTime(new Date(mdmData.createdAt))}</span>
                </div>
                <div>
                    <span>조회수 {mdmData.views}</span>
                </div>
            </PostInfo>
            {mdmData.content && (
                <PostContent>
                    {mdmData.content.split('\n').map((line, index) => (
                        <React.Fragment key={index}>
                            {line}
                            <br />
                        </React.Fragment>
                    ))}
                </PostContent>
            )}
            <MdmVoteForm
                data={mdmData}
                handleClick={(a: number, b: number) => changeMyMdmRatio(a, b)}
                rangeInputValue={rangeInputValue}
                handleProgress={handleProgress}
            />
            <MdmResult>
                {mdmResultPercentage &&
                mdmResultPercentage.count1 + mdmResultPercentage.count2 > 0 ? (
                    <ProgressBar
                        max={100}
                        value={Math.max(mdmResultPercentage.count1, mdmResultPercentage.count2)}
                        reverse={mdmResultPercentage.count1 < mdmResultPercentage.count2 || false}
                    />
                ) : (
                    <NotVote>투표하고 결과보기</NotVote>
                )}
                <VoteCount>{mdmData.vote}명 투표</VoteCount>
            </MdmResult>
            <div>
                <TagsWrapper>
                    {mdmData.tags.map((tag, index) => (
                        <Tag content={tag} key={index} />
                    ))}
                </TagsWrapper>
                <FinanceQuiz onClick={() => setToggle(!toggle)}>
                    금융Quiz
                    <ArrowDown />
                </FinanceQuiz>
                {toggle && <RelatedQuiz relatedQuiz={relatedQuiz} />}
            </div>
            <MdmComments mdmId={mdmData.mdmId} totalComment={mdmData.commentCount} />
        </StyledMDM>
    );
};

const StyledMDM = styled.div`
    width: 100%;
    height: 100%;
`;

export const PostTitle = styled.header`
    font-size: 20px;
    font-weight: 600;
`;

export const PostInfo = styled.div`
    padding: 5px 0;
    margin-bottom: 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    font-size: 12px;
    color: ${({ theme }) => theme.DARK_BLACK};
`;

export const Nickname = styled.span`
    margin-right: 6px;
    font-weight: 500;
`;

export const PostContent = styled.div`
    font-size: 15px;
    padding: 2px 2px 24px 2px;
`;

const TagsWrapper = styled.div`
    width: 100%;
    display: flex;
    gap: 7px;
    margin-bottom: 12px;
    overflow: scroll;
`;

const FinanceQuiz = styled.div`
    margin-top: 20px;
    display: flex;
    align-items: center;
    gap: 10px;
    font-weight: 500;
`;

export default MDM;
