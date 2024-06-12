import React,{useState} from 'react'
import Products from '../../../../Products/Products.json'
import HomeStyle from '../Home.module.css'
import Card from './Card/Card'

function Product() {
  const [Items,setItems] = useState(Products) 
  return (
    <div className={HomeStyle.Cards}>
      {
        Items.map(item=> <Card key={item.Product_ID} Item={item}/>)
      }
    </div>
  )
}

export default Product
