import MdmCard from '@/components/MdmCard';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

const MDM = () => {
    const { id } = useParams();
    return (
        <StyledMDM>
            MDM {id}
            <MdmCard />
        </StyledMDM>
    );
};

const StyledMDM = styled.div`
    width: 100%;
    height: 100%;
`;

export default MDM;
