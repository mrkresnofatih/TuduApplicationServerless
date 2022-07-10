import { css } from '@emotion/css'
import React from 'react'
import { history } from '../App'

interface Props {
    button: React.ReactNode
}

const BaseHeader = (props: Props) => {
  const onLogoClick = () => history.push('/')
  return (
    <div className={container}>
        <div className={logo} onClick={onLogoClick}>tudu.</div>
        <div>{props.button}</div>
    </div>
  )
}

export default BaseHeader

const container = css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #06283D;
    padding: 16px;
`;

const logo = css`
    color: #47B5FF;
    font-weight: 600;
    font-size: 24px;

    &:hover {
      cursor: pointer;
    }
`;