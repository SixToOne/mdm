import styled from 'styled-components';
// import MdmCard from '@/components/MdmCard';
import { Comment } from '@/components/Comment';
import { useCallback, useState } from 'react';
import { postComment } from '@/apis/post-comment';
import { INewComment } from '@/apis/types/mdm-post ';

const MDM = () => {
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
        if (!validateInput()) return;
        const newComment: INewComment = {
            content: commentInputValue,
            nickname,
            password,
        };
        await postComment(34, newComment);
    };

    return (
        <StyledMDM>
            <PostTitle>친구 돈 오백 안갚는 뻔뻔한 나</PostTitle>
            <PostInfo>
                <div>
                    <span>차재화니</span>
                    <span>20분 전</span>
                </div>
                <div>
                    <span>조회수 10,000</span>
                    <span>댓글 5</span>
                </div>
            </PostInfo>
            <PostContent>
                음식점을 시작하면서 500만원이 필요했어요. 그런데, 10년지기 친구가 내년 2월까지만
                갚으면 된다며, 500만원을 흔쾌히 빌려주었습니다. 그런 친구가 고마워서 밥도 사고
                몇달치 이자도 먼저 입금해주었습니다. 그런데 며칠이 지나더니 갑자기 돈을 달라고
                하더라구요. 이미 가게 계약이 끝나서 돌려주기 힘들었죠. 여유가 된다면서 빌려주더니
                갑자기 달라고 하네요.
            </PostContent>
            {/* <MdmCard data={undefined} /> */}
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
            <Comment isBestComment={true} />
            <Comment isBestComment={true} />
            <Comment isBestComment={true} />
            <Comment />
            <Comment />
            <Comment />
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
    color: ${({ theme }) => theme.LIGHT_BLACK};
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

const UploadCommentButton = styled.button`
    padding: 3px 7px;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 500;
    background-color: ${({ theme }) => theme.BACKGROUND_LIGHT_GRAY};
    color: ${({ theme }) => theme.LIGHT_BLACK};
`;

const InputUser = styled.div`
    width: 100%;
    height: 48px;
    margin-bottom: 4px;
    display: flex;
    gap: 4px;
`;

const Input = styled.input`
    width: 100%;
    height: 48px;
    padding-left: 5px;
    border: 1px solid ${({ theme }) => theme.BORDER_LIGHT};
    border-radius: 4px;

    &:focus {
        outline-color: ${({ theme }) => theme.PRIMARY};
    }
`;

const Textarea = styled.textarea`
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
