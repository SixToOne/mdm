import { useState } from 'react';
import styled from 'styled-components';
import MdmCard from '@/components/MdmCard';

export type IFeedType = 'mdm' | 'finance';

const Home = () => {
    const [feedType, setFeedType] = useState<IFeedType>('mdm');
    const [mdmData] = useState<number[]>(Array.from({ length: 10 }, () => 1));

    return (
        <StyledHome>
            <TabWrapper>
                <TabButton onClick={() => setFeedType('mdm')} selected={feedType === 'mdm'}>
                    유머
                </TabButton>
                <TabButton onClick={() => setFeedType('finance')} selected={feedType === 'finance'}>
                    금융
                </TabButton>
            </TabWrapper>
            {feedType === 'mdm' ? (
                <FeedMain>
                    {mdmData.map((data, index) => (
                        <MdmCard key={index} />
                    ))}
                </FeedMain>
            ) : (
                <>금융</>
            )}
        </StyledHome>
    );
};

const StyledHome = styled.div`
    width: 100%;
    height: 100%;
`;

const TabWrapper = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;
    margin-bottom: 10px;
`;

const TabButton = styled.button<{ selected: boolean }>`
    padding: 7px;
    font-size: 16px;
    font-weight: 600;
    ${({ theme, selected }) =>
        selected
            ? `border-bottom: 2px solid ${theme.PRIMARY}; color: ${theme.PRIMARY}`
            : `color: ${theme.DARK_BLACK}`}
`;

const FeedMain = styled.main`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 30px;
`;

export default Home;
