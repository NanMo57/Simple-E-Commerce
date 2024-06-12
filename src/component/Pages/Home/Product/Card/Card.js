import React, { useRef, useState, useEffect } from 'react';
import { Link,useSearchParams } from 'react-router-dom';
import Coloring from './Coloring/Coloring';

import { ShareData } from '../../../../../App';

import { FaCartPlus } from "react-icons/fa";
import { MdFavoriteBorder } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";

import HomeStyle from '../../Home.module.css'

function Card({ Item }) {
  const ImgRef = useRef();
  const [ColorInd, setColorInd] = useState(0);
  const [idProductSearch,setIdProductSearch] = useSearchParams({id:Item.Product_ID});

  useEffect(() => {
    if (ImgRef.current) {
      ImgRef.current.dataset.index = ColorInd;
    }
  }, [ColorInd]);

  const ChangeImg = (ind) => {
    if (ImgRef.current) {
      ImgRef.current.dataset.index = ind;
      ImgRef.current.src = Item.Product_Images[ind];
      setColorInd(ind);
    }
  };

  const AddToFavorite = (color, img, List, UpdateList) => {
    let Add_Data = {
      "Product_ID": Item.Product_ID,
      "Product_Name": Item.Product_Name,
      "Product_Price": Item.Product_Price,
      "Product_Images": img,
      "Product_Sizes": Item.Product_Sizes[0],
      "Product_Colors": color,
      "Product_Category": Item.Product_Category
    };

    UpdateList([...List, Add_Data]);
  };

  const RemoveFromFavorite = (color, img, List, UpdateList)=>{
    let Remove_Data = {
      "Product_ID": Item.Product_ID,
      "Product_Name": Item.Product_Name,
      "Product_Price": Item.Product_Price,
      "Product_Images": img,
      "Product_Sizes": Item.Product_Sizes[0],
      "Product_Colors": color,
      "Product_Category": Item.Product_Category
    };

    let UpdatedList = List.filter(item=>item.Product_Colors !== Remove_Data.Product_Colors);

    UpdateList(UpdatedList)
  }

  const AddToCart = (color, img, List, UpdateList,cart,setCart)=>{
    let Add_Data = {
      "Product_ID": Item.Product_ID,
      "Product_Name": Item.Product_Name,
      "Product_Price": Item.Product_Price,
      "Product_Images": img,
      "Product_Sizes": Item.Product_Sizes[0],
      "Product_Colors": color,
      "Product_Category": Item.Product_Category,
      "Product_Quantity":1
    };

    let itemExists = false;
    let updatedCart = List.map(cartItem => {
        if (cartItem.Product_ID === Add_Data.Product_ID && cartItem.Product_Colors === Add_Data.Product_Colors && cartItem.Product_Sizes === Add_Data.Product_Sizes) {
            itemExists = true;
            return { ...cartItem, Product_Quantity: cartItem.Product_Quantity + 1 };
        }
        return cartItem;
    });

    if (!itemExists) {
        updatedCart = [...updatedCart, Add_Data];
    }

    UpdateList(updatedCart);
    setCart(cart+Add_Data.Product_Quantity)
    
  }

  return (
    <ShareData.Consumer>
      {(data) => {
        return (
          <div key={Item.Product_ID} className={HomeStyle.card}>
            <div style={{width:'100%',height:'400px'}}>
              <img src={Item.Product_Images[0]} alt="Product" ref={ImgRef} data-index="0" style={{width:'100%',height:'250px'}}/>
              <div className={HomeStyle.productInfo}>
                <h3>{Item.Product_Name}</h3>
                <div className={HomeStyle.Coloring}>
                  {Item.Product_Colors.map((color, ind) => (
                    <Coloring key={ind} index={ind} colorVal={color} funImg={() => ChangeImg(ind)} />
                  ))}
                </div>
                <h5><span>{Item.Product_Price}</span><span>JOD</span></h5>
              </div>
            </div>
            <div className={HomeStyle.Icons}>
              <FaCartPlus onClick={() => AddToCart(Item.Product_Colors[ColorInd], Item.Product_Images[ColorInd], data.CartProducts, data.setCartProducts,data.CartItemNum , data.setCartItemNum)}/>
              {data.FavoriteProducts.some(
                  (item) => item.Product_ID === Item.Product_ID && item.Product_Colors === Item.Product_Colors[ColorInd]
                )
                ? <FaHeart onClick={() => RemoveFromFavorite(Item.Product_Colors[ColorInd], Item.Product_Images[ColorInd], data.FavoriteProducts, data.setFavoriteProducts)}/>
                : <MdFavoriteBorder onClick={() => AddToFavorite(Item.Product_Colors[ColorInd], Item.Product_Images[ColorInd], data.FavoriteProducts, data.setFavoriteProducts)} />}
              <Link to={"/"+Item.Product_Name+"?id="+idProductSearch.get('id')} style={{color:'bisque'}}><FaEye /></Link>
            </div>
          </div>
        );
      }}
    </ShareData.Consumer>
  );
}

export default Card;
