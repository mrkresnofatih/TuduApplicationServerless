import React from 'react'
import { useSelector } from 'react-redux'
import { authIsLoggedInSelector } from '../states/authSelectors'

interface Props {
    authPage: React.ReactNode,
    page: React.ReactNode
}

const BaseAuthenticatedPage = (props: Props) => {
    const isLoggedIn = useSelector(authIsLoggedInSelector)
    
    if (isLoggedIn) {
        return (
            <>{props.page}</>
        )
    }

    return (
        <>{props.authPage}</>
    )
}

export default BaseAuthenticatedPage