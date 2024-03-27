import styled from 'styled-components';
import { Logo } from '@/components/icons';

export default function BottomNav() {
    return (
        <StyledBottomNav>
            <HomeButton>
                <Logo />
            </HomeButton>
        </StyledBottomNav>
    );
}

const StyledBottomNav = styled.nav`
    position: sticky;
    bottom: 0;
    width: 100%;
    height: 48px;
    display: flex;
    align-items: center;
    border-top: 1px solid ${({ theme }) => theme.BORDER_LIGHT};
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
`;

const HomeButton = styled.button`
    position: absolute;
    left: 50%;
    transform: translate(-50%, 0);
    bottom: 12px;
    padding: 18px;
    border-radius: 100%;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.12);
    background-color: white;
`;
