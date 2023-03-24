

export interface SimpleToggleProps {
    clickHandler: any;
}


export const SimpleToggle = ( { clickHandler }: SimpleToggleProps ) => {
    return (
        <div onClick={clickHandler}>
            <svg width="42" height="44" viewBox="0 0 42 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="6" width="36" height="24" rx="12" fill="#A0A7BA" />
                <g filter="url(#filter0_d_1_247)">
                    <circle cx="18" cy="12" r="10" fill="white" />
                </g>
                <defs>
                    <filter id="filter0_d_1_247" x="0" y="2" width="36" height="42" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                        <feFlood floodOpacity="0" result="BackgroundImageFix" />
                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                        <feMorphology radius="16" operator="erode" in="SourceAlpha" result="effect1_dropShadow_1_247" />
                        <feOffset dy="14" />
                        <feGaussianBlur stdDeviation="12" />
                        <feComposite in2="hardAlpha" operator="out" />
                        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.05 0" />
                        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1_247" />
                        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1_247" result="shape" />
                    </filter>
                </defs>
            </svg>
        </div>
    )
}