import React from 'react'
import SplashScreenImg from '../../assets/Images/SplashScreenImg.svg'

const SplashScreen = ({ isLoaded, onClick }) => {
  return (
    <div
      id="slider"
      className={isLoaded ? 'slide-out' : 'slide-in'}
      onClick={onClick}
    >
      <img
        className="splash-screen-img"
        src={SplashScreenImg}
        alt="Splash Screen"
      ></img>
    </div>
  )
}

export default SplashScreen
