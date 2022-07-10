import { css } from '@emotion/css'
import React from 'react'

interface Props {
    type: 'text' | 'password',
    placeholder: string,
    value: string | number,
    onChange: React.ChangeEventHandler<HTMLInputElement>,
    style?: React.CSSProperties
}

const BaseTextField = (props: Props) => {
  return (
    <input 
        placeholder={props.placeholder}
        className={container}
        type={props.type}
        value={props.value}
        onChange={props.onChange} 
        style={props.style}
    />
  )
}

export default BaseTextField

const container = css`
    padding: 12px;
    font-size: 16px;
    color: #06283D;
    margin: 2px;
`;