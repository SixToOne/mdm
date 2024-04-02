import styled from 'styled-components';
import { IMdm } from '@/apis/types/mdm';
import RangeInput from '@/components/commons/RangeInput';
import MdmVoteButton from '@/components/MdmVoteButton';

interface MdmVoteFormProps {
    data: IMdm;
    handleClick: (a: number, b: number) => void;
    rangeInputValue: number;
    handleProgress: (progressValue: number) => void;
}

const MdmVoteForm = ({ data, handleClick, rangeInputValue, handleProgress }: MdmVoteFormProps) => {
    return (
        <StyledMdmVoteForm>
            <div className="mdm-vote_btns">
                <MdmVoteButton
                    content={data.opinion1.opinion}
                    imageSource={data.opinion1.image}
                    isSelected={data.opinion1.myRatio && data.opinion1.myRatio >= 5 ? true : false}
                    handleClick={() => handleClick(10, 0)}
                />
                <MdmVoteButton
                    content={data.opinion2.opinion}
                    imageSource={data.opinion2.image}
                    isSelected={data.opinion2.myRatio && data.opinion2.myRatio >= 5 ? true : false}
                    handleClick={() => handleClick(0, 10)}
                />
            </div>
            <RangeInput
                min={0}
                max={100}
                step={10}
                value={rangeInputValue}
                handleProgress={(e) => handleProgress(parseInt(e.currentTarget.value))}
            />
        </StyledMdmVoteForm>
    );
};

const StyledMdmVoteForm = styled.div`
    width: 100%;
    padding-bottom: 18px;

    .mdm-vote_btns {
        margin-bottom: 8px;
        display: flex;
        gap: 16px;
    }
`;

export default MdmVoteForm;
