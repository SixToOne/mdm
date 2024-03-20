import {
    ArticleInput,
    CompareInput,
    ImageInput,
    Toggle,
    UserInput,
} from '@/components/ArticleWrite';
import TagInput from '@/components/ArticleWrite/TagInput';
import Tags from '@/components/Tags';

const ArticleWrite = () => {
    return (
        <section>
            {/* 헤더 (뒤로가기 버튼 + 등록 버튼)_컴포넌트 가져오기 */}

            {/* 토글(유머/금융) */}
            <Toggle />

            {/* 제목 입력란_한줄 (필수/선택) */}
            {/* 내용 입력란_여러줄 (필수/선택) */}
            <ArticleInput></ArticleInput>

            {/* 이미지 첨부 미리보기_컴포넌트화 + 이미지 첨부 버튼_컴포넌트화 */}
            <ImageInput />

            {/* 태그 작성란 */}
            <TagInput />
            {/* 태그 목록_컴포넌트 가져오기 */}
            <Tags />

            {/* 몇대몇 비교 대상 작성란 + 각각 이미지 첨부 버튼_컴포넌트화 */}
            {/* 몇대몇 비교 대상 이미지 미리보기_컴포넌트화 & 이름 미리보기 */}
            <CompareInput />

            {/* 닉네임 입력란_한줄_컴포넌트 내보내기 */}
            {/* 비밀번호 입력란_한줄_컴포넌트 내보내기 */}
            <UserInput></UserInput>
        </section>
    );
};

export default ArticleWrite;
