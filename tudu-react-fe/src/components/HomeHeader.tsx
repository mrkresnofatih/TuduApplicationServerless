import React from 'react'
import { history } from '../App'
import BaseButton from './BaseButton'
import BaseHeader from './BaseHeader'


const HomeHeader = () => {
    const AuthButton = () => (
        <BaseButton
            text='login/signup'
            onClick={() => history.push('/dashboard')}
        />
    )
    
  return (
    <BaseHeader
        button={<AuthButton/>}
    />
  )
}

export default HomeHeader