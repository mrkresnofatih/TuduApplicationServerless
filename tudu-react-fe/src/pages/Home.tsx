import React from 'react'
import { history } from '../App'
import BaseButton from '../components/BaseButton'
import HomeHeader from '../components/HomeHeader'
import textStyles from '../styles/textStyles'
import CenterTemplate from '../templates/CenterTemplate'

const Home = () => {
    const GetStartedButton = () => (
        <BaseButton 
            text='Get Started >' 
            onClick={() => history.push('/dashboard')}
        />
    )
  return (
    <>
        <HomeHeader/>
        <CenterTemplate>
            <h2 className={textStyles.title}>Welcome to Tudu.</h2>
            <h3 className={textStyles.subtitle}>Your favorite todo list app!</h3>
            <div style={{height: 24}} />
            <GetStartedButton/>
        </CenterTemplate>
    </>
  )
}

export default Home