import { css } from '@emotion/css'
import React from 'react'

interface Props {
    children: React.ReactNode,
    style?: React.CSSProperties
}

const CenterTemplate = (props : Props) => {
  return (
    <div className={container} style={props.style}>
        {props.children}
    </div>
  )
}

export default CenterTemplate

const container = css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    /* background-color: pink; */
    height: calc(100vh - 75px);
`;