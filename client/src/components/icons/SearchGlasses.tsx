interface SearchGlasses {
    width?: number;
    height?: number;
    color?: string;
}

const SearchGlasses = ({ width, height, color }: SearchGlasses) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={width || 18}
            height={height || 18}
            fill="none"
        >
            <path
                fill={color || '#000'}
                d="m16.6 18-6.3-6.3A6.096 6.096 0 0 1 6.5 13c-1.817 0-3.354-.63-4.612-1.888C.63 9.853.001 8.316 0 6.5c0-1.817.63-3.354 1.888-4.612C3.147.63 4.684.001 6.5 0c1.817 0 3.354.63 4.613 1.888C12.372 3.147 13.001 4.684 13 6.5a6.096 6.096 0 0 1-1.3 3.8l6.3 6.3-1.4 1.4ZM6.5 11c1.25 0 2.313-.437 3.188-1.312S11.001 7.751 11 6.5c0-1.25-.437-2.312-1.312-3.187S7.751 2.001 6.5 2c-1.25 0-2.312.438-3.187 1.313S2.001 5.251 2 6.5c0 1.25.438 2.313 1.313 3.188S5.251 11.001 6.5 11Z"
            />
        </svg>
    );
};

export default SearchGlasses;
