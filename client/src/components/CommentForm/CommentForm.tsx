import styled from 'styled-components';
import { INewComment } from '@/apis/types/mdm-post ';

interface CommentFormProps {
    inputValue: INewComment;
    handleInput: (key: keyof INewComment, value: string) => void;
}

const CommentForm = ({ inputValue, handleInput }: CommentFormProps) => {
    return (
        <StyledCommentForm>
            <InputUserInfo>
                <Input
                    type="text"
                    placeholder="닉네임"
                    value={inputValue.nickname}
                    onChange={(e) => handleInput('nickname', e.target.value)}
                />
                <Input
                    type="text"
                    placeholder="비밀번호"
                    value={inputValue.password}
                    onChange={(e) => handleInput('password', e.target.value)}
                />
            </InputUserInfo>
            <Textarea
                placeholder="댓글을 작성해주세요."
                value={inputValue.content}
                onChange={(e) => handleInput('content', e.target.value)}
            />
        </StyledCommentForm>
    );
};

const StyledCommentForm = styled.form`
    width: 100%;
`;

const InputUserInfo = styled.div`
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

export default CommentForm;
