const RightCard = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="36" fill="none">
            <g filter="url(#a)">
                <path fill="#0064FF" d="M18 14 4.5 27.856V.144L18 14Z" />
            </g>
            <defs>
                <filter
                    id="a"
                    width="21.5"
                    height="35.713"
                    x=".5"
                    y=".144"
                    colorInterpolationFilters="sRGB"
                    filterUnits="userSpaceOnUse"
                >
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feColorMatrix
                        in="SourceAlpha"
                        result="hardAlpha"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    />
                    <feOffset dy="4" />
                    <feGaussianBlur stdDeviation="2" />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                    <feBlend in2="BackgroundImageFix" result="effect1_dropShadow_280_4387" />
                    <feBlend in="SourceGraphic" in2="effect1_dropShadow_280_4387" result="shape" />
                </filter>
            </defs>
        </svg>
    );
};

export default RightCard;
