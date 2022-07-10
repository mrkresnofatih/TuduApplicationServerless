import React from 'react'
import { history } from '../App'
import BaseButton from './BaseButton'
import BaseHeader from './BaseHeader'

const AuthHeader = () => {
    const HomeButton = () => (
        <BaseButton
            text='home'
            onClick={() => history.push('/')}
        />
    )
    return (
        <BaseHeader
            button={<HomeButton/>}
        />
    )
}

export default AuthHeader