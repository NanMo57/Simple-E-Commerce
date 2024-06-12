import React from 'react'
import './NavLinks.module.css'

import ListItem from './List_item/ListItem'

function NavLinks() {
    const Pages = [
        {
            Name:'Home',
            Path:'/'
        },
        {
            Name:'Men',
            Path:'/Men'
        },
        {
            Name:'Women',
            Path:'/Women'
        },
        {
            Name:'Kids',
            Path:'/Kids'
        },
        {
            Name:'Contact',
            Path:'/Contact'
        }
    ]
  return (
    <nav>
      <ul>
        {Pages.map((page,ind)=>
          <ListItem path={page.Path} page={page.Name} key={ind}/>
        )}
      </ul>
    </nav>
  )
}

export default NavLinks
