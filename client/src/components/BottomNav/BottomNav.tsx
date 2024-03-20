import { Link } from 'react-router-dom';

export default function BottomNav() {
    return (
        <nav className="flex justify-evenly">
            {/* 추후 버튼마다 routing 연결해주기, 아이콘은 변경해도 무방 */}
            {/* 첫번째 아이콘은 어디로 연결? */}
            {/* <Link to="/mdm"> */}
            <button>
                <img src="/images/Menu.png" />
            </button>
            {/* </Link> */}

            <div className="rounded-full p-6 border-4 border-stone-200">
                <Link to="/">
                    <button>
                        <img src="/images/Logo.png" />
                        {/* 중앙 홈 아이콘은 큰 원형 안에 넣어서 살짝 위로 띄우기 */}
                    </button>
                </Link>
            </div>
            <button>
                <img src="/images/Search.png" />
            </button>
        </nav>
    );
}
