import styled from 'styled-components';
import MdmCard from '@/components/MdmCard';
import { Comment } from '@/components/Comment';

const MDM = () => {
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
            <MdmCard />
            <TotalNumberOfComments>댓글 36</TotalNumberOfComments>
            <InputUser>
                <Input type="text" placeholder="닉네임" />
                <Input type="text" placeholder="비밀번호" />
            </InputUser>
            <Input type="text" placeholder="댓글을 작성해주세요." />
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

const PostTitle = styled.header`
    font-size: 20px;
    font-weight: 600;
`;

const PostInfo = styled.div`
    padding: 5px 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    font-size: 12px;
    color: ${({ theme }) => theme.LIGHT_BLACK};
`;

const PostContent = styled.div`
    font-size: 15px;
    padding: 10px 2px 24px 2px;
`;

const TotalNumberOfComments = styled.div`
    padding-top: 18px;
    font-size: 20px;
    border-top: 1px solid ${({ theme }) => theme.BORDER_LIGHT};
`;

const InputUser = styled.div`
    display: flex;
`;

const Input = styled.input`
    width: 100%;
    height: 30px;
    &:focus {
        outline: none;
    }
`;

export default MDM;
