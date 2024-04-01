import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import ProgressBar from '@/components/commons/ProgressBar';
import { IMdm } from '@/apis/types/mdm-post ';
import { useVote } from '@/hooks/useVote';
import { Nickname, PostContent, PostInfo, PostTitle } from '@/pages/MDM';
import Tag from '@/components/Tag';
import { getFormattedYearMonthDayTime } from '@/utils/time';
import MdmVoteForm from '@/components/MdmVoteForm';

interface StyleProps {
    $hasBorder?: boolean;
}

interface Props extends StyleProps {
    data: IMdm;
    handleDataChange: (id: number, newData: IMdm) => void;
}

const MdmCard = ({ data, handleDataChange, ...styleProps }: Props) => {
    const navigate = useNavigate();
    const { mdmResultPercentage, rangeInputValue, handleProgress, changeMyMdmRatio } = useVote({
        data,
        handleDataChange,
    });

    return (
        <StyledMdmCard
            {...styleProps}
            onClick={() => {
                navigate(`/mdm/${data.mdmId}`);
            }}
        >
            <TagsWrapper>
                {data.tags.map((tag, index) => (
                    <Tag content={tag} key={index} />
                ))}
            </TagsWrapper>
            {data.title && <PostTitle>{data.title}</PostTitle>}
            <PostInfo>
                <div>
                    <Nickname>{data.nickname}</Nickname>
                    <span>{getFormattedYearMonthDayTime(new Date(data.createdAt))}</span>
                </div>
                <div>
                    <span>조회수 {data.views}</span>
                </div>
            </PostInfo>
            {data.title && (
                <PostContent>
                    {data.content.split('\n').map((line, index) => (
                        <React.Fragment key={index}>
                            {line}
                            <br />
                        </React.Fragment>
                    ))}
                </PostContent>
            )}
            <MdmVoteForm
                data={data}
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
                <VoteCount>{data.vote}명 투표</VoteCount>
            </MdmResult>
        </StyledMdmCard>
    );
};

const StyledMdmCard = styled.div<StyleProps>`
    padding: 18px;
    display: flex;
    flex-direction: column;
    background-color: white;
    border: ${({ theme, $hasBorder }) => ($hasBorder ? `1px solid ${theme.BORDER_LIGHT}` : 'none')};
    border-radius: 10px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
`;

const TagsWrapper = styled.div`
    width: 100%;
    display: flex;
    gap: 7px;
    margin-bottom: 12px;
    overflow: hidden;
`;

export const MdmResult = styled.div`
    margin-top: 18px;
`;

export const VoteCount = styled.div`
    font-size: 12px;
    text-align: right;
    padding-right: 2px;
`;

export const NotVote = styled.div`
    width: 100%;
    height: 24px;
    padding-top: 2px;
    margin-bottom: 8px;
    border-radius: 3px;
    font-size: 12px;
    text-align: center;
    border: 1px solid ${({ theme }) => theme.BORDER_LIGHT};
    background-color: ${({ theme }) => theme.BORDER_LIGHT};
    color: ${({ theme }) => theme.DARK_BLACK};
`;

export default MdmCard;
