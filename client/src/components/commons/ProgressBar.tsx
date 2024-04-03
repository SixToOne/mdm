import styled from 'styled-components';

interface ProgressBarProps {
    max: number;
    value: number;
    reverse: boolean;
}

const ProgressBar = ({ max, value, reverse }: ProgressBarProps) => {
    return <Progress max={max} value={value} $reverse={reverse} />;
};

const Progress = styled.progress<{ value: number; $reverse: boolean }>`
    width: 100%;
    height: 24px;
    font-size: 14px;
    position: relative;
    ${({ $reverse }) => $reverse && `direction: rtl`};

    &::-webkit-progress-bar {
        background-color: ${({ theme }) => theme.BACKGROUND_LIGHT_GRAY};
        border-radius: 3px;
    }

    &::-webkit-progress-value {
        background-color: ${({ theme }) => theme.PRIMARY};
        border-radius: 3px;
    }

    &::before {
        content: '${({ value, $reverse }) => ($reverse ? 100 - value + '%' : value + '%')}';
        position: absolute;
        bottom: 1px;
        left: ${({ value, $reverse }) =>
            $reverse ? `calc(${100 - value}% / 2 - 14px)` : `calc(${value}% / 2 - 14px)`};
        color: ${({ theme, $reverse }) => ($reverse ? theme.LIGHT_BLACK : 'white')};
        font-weight: 600;
    }

    &::after {
        content: '${({ value, $reverse }) => ($reverse ? value + '%' : 100 - value + '%')}';
        position: absolute;
        bottom: 1px;
        left: ${({ value, $reverse }) =>
            $reverse
                ? `calc(${100 - value}% + (${value}%) / 2 - 5px)`
                : `calc(${value}% + (${100 - value}%) / 2 - 14px)`};
        color: ${({ theme, $reverse }) => ($reverse ? 'white' : theme.LIGHT_BLACK)};
        font-weight: 500;
    }
`;

export default ProgressBar;
