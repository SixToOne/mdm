import { Link } from 'react-router-dom';

const Page404 = () => {
    return (
        <div className="text-center">
            <p className="my-8">404 NOT FOUND</p>
            <Link to="/">
                <button className="rounded-md bg-PRIMARY text-WHITE w-32">홈으로</button>
            </Link>
        </div>
    );
};

export default Page404;
