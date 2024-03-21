import { Link } from 'react-router-dom';

export default function BottomNav() {
    return (
        <div className="mt-auto border-2 border-stone-200">
            <nav className="flex justify-evenly">
                {/* 첫번째 아이콘은 어디로 연결? */}
                {/* <Link to="/mdm"> */}
                <button>
                    <img src="/images/Menu.png" />
                </button>
                <div className="rounded-full p-6 border-4 border-stone-200">
                    <Link to="/">
                        <button>
                            <img src="/images/Logo.png" />
                            {/* 중앙 홈 아이콘은 더 위로 띄워야 함 */}
                        </button>
                    </Link>
                </div>
                <button>
                    <img src="/images/Search.png" />
                </button>
            </nav>
        </div>
    );
}
