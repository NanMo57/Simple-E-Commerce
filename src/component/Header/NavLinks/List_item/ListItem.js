import React from 'react'
import { NavLink } from 'react-router-dom'
import NavLinksStyle from '../NavLinks.module.css'


function ListItem({page,path}) {
  return (
    <li><NavLink to={path} className={NavLinksStyle.NavLink}>{page}</NavLink></li>
  )
}

export default ListItem
