import { Link } from 'react-router-dom';
import styled from 'styled-components';

export default function BottomNav() {
    return (
        <div className="w-full">
            <nav className="flex justify-around">
                {/* 첫번째 아이콘은 어디로 연결? */}
                <button>
                    <img src="/images/Menu.png" />
                </button>
                <Wrapper className="rounded-full p-6 border-4 bg-stone-50 border-stone-200">
                    <Link to="/">
                        <button>
                            <img src="/images/Logo.png" />
                        </button>
                    </Link>
                </Wrapper>
                <button>
                    <img src="/images/Search.png" />
                </button>
            </nav>
        </div>
    );
}

const Wrapper = styled.div`
    position: absolute;
    bottom: 1px;
`;
