import { useCallback, useState } from 'react';
import { INewComment } from '@/apis/types/mdm';

const useComment = () => {
    const [newComment, setNewComment] = useState<INewComment>({
        nickname: '',
        password: '',
        content: '',
    });

    const handleInputCommentForm = useCallback((key: keyof INewComment, value: string) => {
        setNewComment((prev) => ({ ...prev, [key]: value }));
    }, []);

    const validateInput = useCallback(() => {
        const { nickname, password, content } = newComment;
        if (!nickname) {
            alert('닉네임을 입력해주세요.');
            return false;
        }
        if (!password) {
            alert('패스워드를 입력해주세요.');
            return false;
        }
        if (!content) {
            alert('댓글을 입력해주세요.');
            return false;
        }
        return true;
    }, [newComment]);

    const resetInputValue = useCallback(() => {
        setNewComment({ nickname: '', password: '', content: '' });
    }, []);

    return { newComment, handleInputCommentForm, validateInput, resetInputValue };
};

export default useComment;
