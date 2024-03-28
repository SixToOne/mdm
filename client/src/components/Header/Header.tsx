import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
// import { postNewMDM } from '@/apis/post-newMDM';
// import { WriteRequest } from '@/apis/types/post-newMDM';

// interface HeaderProps {
//     writtenData?: WriteRequest;
// }

// /mdm/1 -> mdm
export const getPath = (location: string): string => {
    return location.split('/')[1];
};
const RightButton = () => {
    // const RightButton = ({ writtenData }: HeaderProps) => {
    // console.log('작동??');
    // console.log(writtenData);
    const location = useLocation();

    const uploadArticle = () => {
        // if (writtenData) {
        //     console.log('데이터 있네');
        //     console.log(writtenData);
        //     postNewMDM(writtenData);
        // } else {
        //     console.log('데이터 없네');
        //     console.log(writtenData);
        // }
    };

    if (getPath(location.pathname) !== 'write') {
        return <Link to="/write">글쓰기</Link>;
    } else {
        return <button onClick={uploadArticle}>등록</button>;
    }
};

// const Header = ({ writtenData }: HeaderProps) => {
const Header = () => {
    return (
        <StyledHeader>
            <AppName to="/">
                <span>ㅁ</span>
                <span style={{ color: '#0064FF' }}>ㄷ</span>
                <span>ㅁ</span>
            </AppName>
            <RightButton />
            {/* <RightButton writtenData={writtenData} /> */}
        </StyledHeader>
    );
};

const StyledHeader = styled.div`
    position: sticky;
    width: 100%;
    height: 56px;
`;

const AppName = styled(Link)`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 24px;
    font-weight: bold;
`;

export default Header;
