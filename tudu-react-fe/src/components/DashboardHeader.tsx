import React from 'react'
import { AuthReset } from '../states/authActionCreators'
import { batchDispatch } from '../states/batchDispatch'
import { DbReset } from '../states/dbActionCreators'
import BaseButton from './BaseButton'
import BaseHeader from './BaseHeader'

const DashboardHeader = () => {
    const logoutAction = () => {
        batchDispatch([
            DbReset(),
            AuthReset()
        ])
    }
    const LogoutButton = () => (
        <BaseButton
            text='logout'
            onClick={logoutAction}
        />
    )
    return (
        <BaseHeader
            button={<LogoutButton/>}
        />
  )
}

export default DashboardHeader