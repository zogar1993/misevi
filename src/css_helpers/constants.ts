export const SEPARATION = "4px"
export const INPUT_HEIGHT = "45px"
export const BORDER_RADIUS = "6px"

export const NAV_BAR_HEIGHT = "45px"
export const NAV_BAR_WITH_BORDER_HEIGHT = "46px"
export const NAV_BAR_COLOR = "whitesmoke"
export const NAV_BAR_BORDER_COLOR = "darkgrey"
export const NAV_BAR_HOVER_COLOR = "lightgrey"

export const PAGE_CONTENT_HEIGHT = `calc(100vh - ${NAV_BAR_WITH_BORDER_HEIGHT})`

export const PAGE_CONTENT_QUARTER_WIDTH = "255px"
export const PAGE_CONTENT_HALF_WIDTH = `calc((${PAGE_CONTENT_QUARTER_WIDTH} * 2) + (${SEPARATION} * 1))`
export const PAGE_CONTENT_WIDTH = `calc((${PAGE_CONTENT_QUARTER_WIDTH} * 4) + (${SEPARATION} * 3))`

export const SKELETON_ANIMATION_INFO = `
    cursor: wait;
    background-image: linear-gradient(-45deg, gainsboro 40%, white 50%, gainsboro 60%);
    animation: moving-box 1s reverse infinite;
    animation-timing-function: linear;
    background-size: 350% 350%;
    @keyframes moving-box {
        from {background-position: -30%;}
        to {background-position: 130%;}
    }
`