import { css } from 'styled-components'

export const SKELETON_ANIMATION_CSS = css`
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
