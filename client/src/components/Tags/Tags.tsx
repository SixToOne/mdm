const Tags = () => {
    return (
        <>
            <span>
                {/* 태그가 정해진 폭을 넘어가면 더보기에 자동으로 들어가도록 구현해보자 */}
                <button className="mr-4 rounded-2xl border-2 border-stone-200 px-4 py-1">
                    태그_가길어지면어떻게나올까
                </button>
                <button className="mr-4 rounded-2xl border-2 border-stone-200 px-4 py-1">
                    태그
                </button>
                <button className="mr-4 rounded-2xl border-2 border-stone-200 px-4 py-1">
                    태그
                </button>
            </span>
        </>
    );
};

export default Tags;
