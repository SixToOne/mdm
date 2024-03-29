import styled from 'styled-components';
import RangeInput from '@/components/commons/RangeInput';
import ProgressBar from '@/components/commons/ProgressBar';
import MdmVoteButton from '@/components/MdmVoteButton';
import { IMdm } from '@/apis/types/mdm-post ';
import { useVote } from '@/hooks/useVote';
import { Nickname, PostContent, PostInfo, PostTitle } from '@/pages/MDM';
import Tag from '@/components/Tag';
import { getFormattedYearMonthDayTime } from '@/utils/time';
import React from 'react';

interface StyleProps {
    $hasBorder?: boolean;
}

interface Props extends StyleProps {
    data: IMdm;
    handleDataChange: (id: number, newData: IMdm) => void;
}

const MdmCard = ({ data, handleDataChange, ...styleProps }: Props) => {
    const { mdmResultPercentage, rangeInputValue, handleProgress, changeMyMdmRatio } = useVote({
        data,
        handleDataChange,
    });

    console.log(mdmResultPercentage);

    return (
        <StyledMdmCard {...styleProps}>
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
            <MdmVoteForm>
                <div className="mdm-vote_btns">
                    <MdmVoteButton
                        content={data.opinion1.opinion}
                        isSelected={
                            data.opinion1.myRatio && data.opinion1.myRatio >= 5 ? true : false
                        }
                        handleClick={() => changeMyMdmRatio(10, 0)}
                    />
                    <MdmVoteButton
                        content={data.opinion2.opinion}
                        isSelected={
                            data.opinion2.myRatio && data.opinion2.myRatio >= 5 ? true : false
                        }
                        handleClick={() => changeMyMdmRatio(0, 10)}
                    />
                </div>
                <RangeInput
                    min={0}
                    max={100}
                    step={10}
                    value={rangeInputValue}
                    handleProgress={(e) => handleProgress(parseInt(e.currentTarget.value))}
                />
            </MdmVoteForm>
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

const MdmVoteForm = styled.div`
    width: 100%;
    padding-bottom: 18px;

    .mdm-vote_btns {
        margin-bottom: 8px;
        display: flex;
        gap: 16px;
    }
`;

const MdmResult = styled.div`
    margin-top: 18px;
`;

const VoteCount = styled.div`
    font-size: 12px;
    text-align: right;
    padding-right: 2px;
`;

const NotVote = styled.div`
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
