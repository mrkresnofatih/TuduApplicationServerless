import { css } from '@emotion/css'
import React from 'react'

interface Props {
    leftChildren: React.ReactNode,
    rightChildren: React.ReactNode,
}

const TwoColumnsTemplate = (props: Props) => {
  return (
    <div className={container}>
        <div className={column}>{props.leftChildren}</div>
        <div className={column}>{props.rightChildren}</div>
    </div>
  )
}

export default TwoColumnsTemplate

const container = css`
    padding: 24px 12px;
    display: flex;
`;

const column = css`
    flex: 1;
    display: flex;
    flex-direction: column;
    height: calc(100vh - 125px);
    overflow-y: auto;
    /* background-color: aqua; */

    margin: 0 12px;
`;