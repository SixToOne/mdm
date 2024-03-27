import { FormEvent, useState } from 'react';
import styled from 'styled-components';
import RangeInput from '@/components/commons/RangeInput';
import ProgressBar from '@/components/commons/ProgressBar';
import MdmVoteButton from '@/components/MdmVoteButton';

interface StyleProps {
    border?: boolean;
}

interface Props extends StyleProps {}

const MdmCard = ({ ...styleProps }: Props) => {
    const [progressValue, setProgressValue] = useState<number>(50);
    const handleProgress = (e: FormEvent<HTMLInputElement>) => {
        setProgressValue(parseInt(e.currentTarget.value));
    };

    return (
        <StyledMdmCard {...styleProps}>
            <MdmVoteForm>
                <div className="mdm-vote_btns">
                    <MdmVoteButton content={'환승연애 당하기'} isSelected={true} />
                    <MdmVoteButton
                        content={'환승할 때마다 나만 1250원씩 더 내기'}
                        isSelected={false}
                    />
                </div>
                <RangeInput
                    min={0}
                    max={100}
                    step={10}
                    value={progressValue}
                    handleProgress={handleProgress}
                />
            </MdmVoteForm>
            <MdmResult>
                <ProgressBar max={100} value={74} reverse={true} />
                <VoteCount>128명 투표</VoteCount>
            </MdmResult>
        </StyledMdmCard>
    );
};

const StyledMdmCard = styled.div<StyleProps>`
    padding: 18px;
    display: flex;
    flex-direction: column;
    border: ${({ theme, border }) => (border ? `1px solid ${theme.BORDER_LIGHT}` : 'none')};
    border-radius: 10px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
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
    color: ${({ theme }) => theme.LIGHT_BLACK};
    text-align: right;
    padding-right: 2px;
`;

export default MdmCard;
