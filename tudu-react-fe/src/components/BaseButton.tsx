import { css } from '@emotion/css'
import React from 'react'

interface Props {
    text: string,
    onClick?: () => void,
    style?: React.CSSProperties
}

const BaseButton = (props: Props) => {
  return (
    <label 
        className={container} 
        onClick={props.onClick}
        style={props.style}
    >{props.text}</label>
  )
}

export default BaseButton

const container = css`
    padding: 12px 16px;
    text-align: center;
    margin: 2px;
    color: white;
    font-size: 16px;
    font-weight: 400;
    background-color: #1363DF;

    &:hover {
        cursor: pointer;
        background-color: #47B5FF;
    }
`;