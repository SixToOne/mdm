import { FormEvent } from 'react';
import styled from 'styled-components';

interface RangeInputProps {
    min: number;
    max: number;
    step: number;
    value: number;
    handleProgress: (e: FormEvent<HTMLInputElement>) => void;
}

const RangeInput = ({ min, max, step, value, handleProgress }: RangeInputProps) => {
    return (
        <StyledRangeInput className="range-slider">
            <input
                type="range"
                className="transparent h-1 w-full cursor-pointer appearance-none rounded-lg border-transparent bg-neutral-200"
                min={min}
                max={max}
                value={value}
                step={step}
                onInput={handleProgress}
            />
            <ul className="flex justify-between w-full px-[10px]">
                {Array.from({ length: (max - min) / 10 + 1 }).map((_, index) => (
                    <li className="flex justify-center relative" key={`range_input_${index}`}>
                        <span className="absolute text-xs text-LIGHT_BLACK">
                            {Math.abs(index - 5) + min}
                        </span>
                    </li>
                ))}
            </ul>
        </StyledRangeInput>
    );
};

const StyledRangeInput = styled.div``;

export default RangeInput;
