import React from 'react'
import { loginAPI } from '../api/login'
import { signupAPI } from '../api/signup'
import AuthHeader from '../components/AuthHeader'
import BaseButton from '../components/BaseButton'
import BaseTextField from '../components/BaseTextField'
import { AuthSetAccessToken, AuthSetFullName, AuthSetOccupation, AuthSetUsername } from '../states/authActionCreators'
import textStyles from '../styles/textStyles'
import CenterTemplate from '../templates/CenterTemplate'

const Auth = () => {
    const [username, setUsername] = React.useState<string>("")
    const [password, setPassword] = React.useState<string>("")
    const [fullName, setFullName] = React.useState<string>("")
    const [occupation, setOccupation] = React.useState<string>("")
    const [isLogin, setIsLogin] = React.useState<boolean>(false)
    
    const onUsernameChange: React.ChangeEventHandler<HTMLInputElement> = 
        (e) => setUsername(e.target.value)
    const onPasswordChange: React.ChangeEventHandler<HTMLInputElement> = 
        (e) => setPassword(e.target.value)
    const onFullNameChange: React.ChangeEventHandler<HTMLInputElement> = 
        (e) => setFullName(e.target.value)
    const onOccupationChange: React.ChangeEventHandler<HTMLInputElement> = 
        (e) => setOccupation(e.target.value)

    const toggleAuthMode = () => {
        setIsLogin(prev => !prev);
        setUsername("");
        setPassword("");
        setFullName("");
        setOccupation("");
    }

    const onClickSignupButton = () => signupAPI({ username, fullName, password, occupation }, (res) => [])

    const onClickLoginButton = () => loginAPI({ username, password }, (res) => [
        AuthSetUsername(res.username), AuthSetFullName(res.fullName), 
        AuthSetAccessToken(res.accessToken), AuthSetOccupation(res.occupation)
    ])

    return (
        <>
            <AuthHeader/>
            <CenterTemplate>
                <h2 className={textStyles.title}>Login / Signup</h2>
                <h2 className={textStyles.subtitle}>Login or signup for an account!</h2>
                <div style={{height: 30}}/>
                {!isLogin && (
                    <>
                        <BaseTextField
                            placeholder='fullname'
                            type='text'
                            value={fullName}
                            onChange={onFullNameChange}
                        />
                        <BaseTextField
                            placeholder='occupation'
                            type='text'
                            value={occupation}
                            onChange={onOccupationChange}
                        />
                    </>
                )}
                <BaseTextField
                    placeholder='username'
                    type='text'
                    value={username}
                    onChange={onUsernameChange}
                />
                <BaseTextField
                    placeholder='password'
                    type='password'
                    value={password}
                    onChange={onPasswordChange}
                />
                {!isLogin ? (
                    <>
                        <BaseButton
                            text='signup >'
                            onClick={onClickSignupButton}
                            style={{width: 206}}
                        />
                        <div style={{height: 16}} />
                        <p 
                            className={textStyles.link}
                            onClick={toggleAuthMode}
                        >Got an account? login!</p>
                    </>
                ): (
                    <>
                        <BaseButton
                            text='login >'
                            onClick={onClickLoginButton}
                            style={{width: 206}}
                        />
                        <div style={{height: 16}} />
                        <p 
                            className={textStyles.link}
                            onClick={toggleAuthMode}
                        >First time? Signup here!</p>
                    </>
                )}
            </CenterTemplate>
        </>
    )
}

export default Auth