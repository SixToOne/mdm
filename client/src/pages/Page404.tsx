import { Link } from 'react-router-dom';

const Page404 = () => {
    return (
        <div className="text-center">
            <p className="mt-28 my-8 font-bold text-2xl">404 Error</p>
            <p className="my-8 text-2xl">Page Not Found</p>
            <Link to="/">
                <button className="my-12 py-2 rounded-md bg-PRIMARY text-WHITE w-48 text-lg">
                    홈으로
                </button>
            </Link>
        </div>
    );
};

export default Page404;
