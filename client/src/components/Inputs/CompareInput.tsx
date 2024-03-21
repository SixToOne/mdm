// 1 input 첨부아이콘, 2 input 첨부아이콘, 하단에 이미지 이미지 그 아래 이름 이름 미리보기
import { useState } from 'react';

const CompareInput = () => {
    const [firstValue, setFirstValue] = useState('');
    const [secondValue, setSecondValue] = useState('');

    const handleFirstChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFirstValue(e.target.value);
    };
    const handleSecondChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSecondValue(e.target.value);
    };

    return (
        <section>
            <div className="flex justify-around my-2">
                <span className="font-bold mr-4">1</span>
                <span>
                    <input
                        type="text"
                        onChange={handleFirstChange}
                        placeholder="첫 번째 선택지를 입력해주세요"
                    />
                </span>
                <span>
                    {/* 아이콘에 onClick했을 때 첨부 실행되도록 바꾸기, img src의 url을 가져다 아래로 보내야 하나? */}
                    <img src="/images/FileAdd.png" />
                </span>
            </div>
            <div className="flex justify-around my-2">
                <span className="font-bold mr-4">2</span>
                <span>
                    <input
                        type="text"
                        onChange={handleSecondChange}
                        placeholder="두 번째 선택지를 입력해주세요"
                    />
                </span>
                <span>
                    {/* 아이콘에 onClick했을 때 첨부 실행되도록 바꾸기, img src의 url을 가져다 아래로 보내야 하나? */}
                    <img src="/images/FileAdd.png" />
                </span>
            </div>

            <div>
                <p className="font-bold my-2">몇대몇 미리보기</p>
                <table className="my-2">
                    <tr>
                        {/* 위에서 첨부한 이미지 미리보기, 추후 table로 바꾸는 게 좋을 지도? */}
                        <td>
                            <img className="border-2 w-1/2" src="" />
                        </td>
                        <td>
                            <img className="border-2 w-1/2" src="" />
                        </td>
                        {/* <span>
                            <img className="border-2 w-1/2" src="" />
                        </span>
                        <span>
                            <img className="border-2 w-1/2" src="" />
                        </span> */}
                    </tr>
                    <tr className="text-center">
                        <td>{firstValue}</td>
                        <td>{secondValue}</td>
                        {/* <span>{firstValue}</span>
                        <span>{secondValue}</span> */}
                    </tr>
                </table>
            </div>
        </section>
    );
};

export default CompareInput;
