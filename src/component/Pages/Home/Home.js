import React, { useState } from 'react'
import HomeStyle from './Home.module.css'
import Product from './Product/Product'

function Home() {
  return (
    <div className={HomeStyle.HomePage}>
      <h2>Recent Products</h2>
      <Product/>
    </div>
  )
}

export default Home
