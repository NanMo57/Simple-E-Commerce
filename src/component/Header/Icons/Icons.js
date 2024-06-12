import React, { useState } from 'react'
import { Link } from 'react-router-dom';

import {ShareData} from '../../../App';
import'./Icons.Module.css'

import { FaCartShopping } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa";



function Icons() {
  return (
    <div className="icons">
     <Link to="/SignIn" className="Sign">SignIn</Link>
     <div style={{position:'relative', marginTop:'7px'}}>
         <div className='NumItemCart'><b>
          <ShareData.Consumer>
            {
              (data)=>data.CartItemNum
            }
          </ShareData.Consumer>
         </b></div>
         <Link to="/Favorite" className="favorite"><span>{<FaHeart />}</span></Link>
         <Link to="/Cart" className="cart"><span>{<FaCartShopping />}</span></Link>
     </div>
    </div>
  )
}

export default Icons
