import styled from 'styled-components'
import {BORDER_RADIUS} from 'components/css/Dimensions'
import "components/font/Caveat.css"
import {NoStyleInput} from "components/inner_components/NoStyleInput"
import {SKELETON_ANIMATION_INFO} from "components/css/Skeleton"

const animation = '{ from {font-size:150%} to {font-size:100%} }'

const getAnimation = (seed?: number) => {
    if (seed === undefined) return
    if (seed === 0) return 'none'
    return seed % 2 ? 'animation1' : 'animation2'
}

export const onValueChangeAnimation = ({'animation-seed': seed}: { 'animation-seed'?: number }) => {
    if (seed === undefined) return ''
    return `
        animation-name: ${getAnimation(seed)};
        animation-timing-function: ease-out;
        animation-duration: 0.3s;

        @keyframes animation1 ${animation}
        @keyframes animation2 ${animation}
    `
}

const Input = styled<any>(NoStyleInput)`
    padding: 5px 5px 5px 8px;
    background-color: whitesmoke;
    border-radius: ${BORDER_RADIUS};
    border: 1px solid lightgray;
    font-size: 18px;
    font-family: Caveat, Times, serif;
    height: 30px;

    ${({'text-align': align}) => align ? `text-align: ${align};` : ''};
    -moz-appearance: textfield;

    ::placeholder {
        opacity: ${props => props['hide-placeholder'] ? '0' : '1'};
    }

    ${onValueChangeAnimation};

    ${props => props.skeleton ? SKELETON_ANIMATION_INFO : ''};
    :disabled {
        background-color: whitesmoke;
        border: 1px solid transparent;
    }
`
export default Input

export interface InputProps {
    'hide-placeholder'?: boolean
    skeleton?: boolean
    'animation-seed'?: number
    'text-align'?: 'center'
}