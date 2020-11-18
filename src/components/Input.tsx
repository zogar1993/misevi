import styled from 'styled-components'
import {BORDER_RADIUS, SKELETON_ANIMATION_INFO} from 'css_helpers/constants'
import {paddings, PaddingsProps} from 'css_helpers/paddings'
import {dimensions, DimensionsProps} from 'css_helpers/dimensions'
import {border_radius, BorderRadiusProps} from 'css_helpers/border_radius'

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

const Input = styled.input<InputProps>`
    padding: 5px 5px 5px 8px;
    background-color: whitesmoke;
    border-radius: ${BORDER_RADIUS};
    border: 1px solid lightgray;
    font-size: 16px;
    font-family: ${({font}) => font ? `${font}, ` : ''}Times, serif;
    height: 30px;

    ${({'text-align': align}) => align ? `text-align: ${align};` : ''};
    font-family: ${({font}) => font ? `${font}, ` : ''}Times, serif;
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

    ${paddings};
    ${dimensions};
    ${border_radius};
`

export default Input

export interface InputProps extends PaddingsProps, DimensionsProps, BorderRadiusProps {
    font?: string
    'hide-placeholder'?: boolean
    width?: string
    skeleton?: boolean
    'animation-seed'?: number
    'text-align'?: 'center'
}
