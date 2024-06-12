import React from 'react'

import HeaderStyle from './Header.module.css'

import logo from '../../image/Logo.png'
import NavLinks from './NavLinks/NavLinks'
import Icons from './Icons/Icons'

function Header() {
  return (
    <header>
      <div className={HeaderStyle.Title}>
        <img src={logo} alt=''/>
        <div className={HeaderStyle.subTitle}><hr /><span>Shoping</span><hr/></div>
      </div>
      <NavLinks/> 
      <Icons/>
    </header>
  )
}

export default Header
