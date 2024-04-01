/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { postComment } from '@/apis/post-comment';
import { IMdm, INewComment } from '@/apis/types/mdm-post ';
import { getMdmPost } from '@/apis/get-mdm';
import { getFormattedYearMonthDayTime } from '@/utils/time';
import { useVote } from '@/hooks/useVote';
import MdmVoteForm from '@/components/MdmVoteForm';
import { MdmResult, NotVote, VoteCount } from '@/components/MdmCard/MdmCard';
import { ProgressBar } from '@/components/commons';
import MdmComments from '@/components/MdmComments';

const MDM = () => {
    const { id } = useParams();
    if (!id) return null;

    const [mdmData, setMdmData] = useState<IMdm>();
    const [nickname, setNickname] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [commentInputValue, setCommentInputValue] = useState<string>('');

    const validateInput = useCallback(() => {
        if (!nickname) {
            alert('닉네임을 입력해주세요.');
            return false;
        }
        if (!password) {
            alert('패스워드를 입력해주세요.');
            return false;
        }
        if (!commentInputValue) {
            alert('댓글을 입력해주세요.');
            return false;
        }
        return true;
    }, [nickname, password, commentInputValue]);

    const uploadComment = async () => {
        if (!validateInput() || !mdmData) return;
        const newComment: INewComment = {
            content: commentInputValue,
            nickname,
            password,
        };
        await postComment(mdmData.mdmId, newComment);
    };

    useEffect(() => {
        const fetchMdmData = async () => {
            const data = await getMdmPost(parseInt(id));
            if (data) setMdmData(data);
        };
        fetchMdmData();
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
            {mdmData.title && (
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
            <CommentHeader>
                <TotalNumberOfComments>댓글 36</TotalNumberOfComments>
                <UploadCommentButton onClick={uploadComment}>등록</UploadCommentButton>
            </CommentHeader>
            <InputUser>
                <Input
                    type="text"
                    placeholder="닉네임"
                    onChange={(e) => setNickname(e.target.value)}
                />
                <Input
                    type="text"
                    placeholder="비밀번호"
                    onChange={(e) => setPassword(e.target.value)}
                />
            </InputUser>
            <Textarea
                placeholder="댓글을 작성해주세요."
                onChange={(e) => setCommentInputValue(e.target.value)}
            />

            <MdmComments mdmId={mdmData.mdmId} />
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
    padding: 10px 2px 24px 2px;
`;

const CommentHeader = styled.div`
    width: 100%;
    padding: 18px 3px 10px 3px;
    border-top: 1px solid ${({ theme }) => theme.BORDER_LIGHT};
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const TotalNumberOfComments = styled.div`
    font-size: 18px;
    font-weight: 500;
`;

export const UploadCommentButton = styled.button`
    padding: 3px 7px;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 500;
    background-color: ${({ theme }) => theme.BACKGROUND_LIGHT_GRAY};
    color: ${({ theme }) => theme.LIGHT_BLACK};
`;

export const InputUser = styled.div`
    width: 100%;
    height: 48px;
    margin-bottom: 4px;
    display: flex;
    gap: 4px;
`;

export const Input = styled.input`
    width: 100%;
    height: 48px;
    padding-left: 5px;
    border: 1px solid ${({ theme }) => theme.BORDER_LIGHT};
    border-radius: 4px;

    &:focus {
        outline-color: ${({ theme }) => theme.PRIMARY};
    }
`;

export const Textarea = styled.textarea`
    width: 100%;
    height: 80px;
    padding: 5px 0 0 5px;
    border: 1px solid ${({ theme }) => theme.BORDER_LIGHT};
    border-radius: 4px;

    &:focus {
        outline-color: ${({ theme }) => theme.PRIMARY};
    }
`;

export default MDM;
