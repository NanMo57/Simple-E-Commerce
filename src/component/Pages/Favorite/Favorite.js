import React from 'react';
import { ShareData } from '../../../App';
import CartStyle from '../Cart/Cart.module.css';
import { MdDelete } from "react-icons/md";
import { FaCartPlus } from "react-icons/fa";
import { FaEye } from "react-icons/fa";

function Favorite(){

  const getColorStyle = (color) => {
    const colorMap = {
      "Navy Blazer": '#171927',
      "Black": '#000000',
      "Dewshine": '#c4cbcf',
      "Radient Watermelon": '#d33a2f',
      "White": '#eae9ee',
      "Olive Burnt": '#988660',
      "Grey Ultimate": '#a9a9ab',
      "Tan Desert": '#cdc4b7',
      "Olive Mayfly": '#6c683f',
      "Blue": '#cdd8e9',
      "Black Full Grain": '#404040',
      "Tan Oiled Full Grain": '#8e674d',
      "Green Frozen": '#d1ddcd',
      "Blue Sailor": '#06547e',
      "Pink": '#ebdbd5',
      "Coral Cedar": '#d99577',
      "Night Sky": '#d99577',
      "Whimsy": '#21354f',
    };
    const backgroundColor = colorMap[color];
    return backgroundColor
      ? <span style={{ backgroundColor, borderRadius: '50%', width: '20px', height: '20px', display: 'inline-block' }}></span>
      : null;
  };

  const deleteCartItem = (item, FavoriteProducts, setFavoriteProducts) => {
    const updatedCart = FavoriteProducts.filter((items) => items !== item);
    setFavoriteProducts(updatedCart);
  };


const AddToCart = (Item, List, UpdateList,cart,setCart)=>{
    let Add_Data = {
      "Product_ID": Item.Product_ID,
      "Product_Name": Item.Product_Name,
      "Product_Price": Item.Product_Price,
      "Product_Images": Item.Product_Images,
      "Product_Sizes": Item.Product_Sizes,
      "Product_Colors": Item.Product_Colors,
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
    <div className={CartStyle.cart}>
      <ShareData.Consumer>
        {(data) => (
          <div style={{margin:'150px 5% 0 5%'}}>
            <div style={{display:'flex',gap:'30px', flexWrap:'wrap',justifyContent:'center'}}>
              {data.FavoriteProducts.length ? (
                data.FavoriteProducts.map((item, ind) => (
                  <div key={ind}>
                    <div style={{width:'270px',height:'450px',boxShadow: '2px 2px 7px 2px #44332c82'}}>
                      <div className={CartStyle.Image} style={{width:'100%',height:'280px'}}>
                        <img src={item.Product_Images} alt='' />
                      </div>
                      <div style={{display:'flex',flexDirection:'column',justifyContent:'space-between',height:'173px'}}>
                        <div style={{padding:'5px 8px 0px'}}>
                          <div className={CartStyle.TopInfo}>
                            <h3>{item.Product_Name}</h3>
                            <div>
                              <h4 style={{ display: 'flex', gap: '5px' }}>
                                <span style={{ marginRight: '8px' }}>Color: </span>
                                {getColorStyle(item.Product_Colors)}
                                <span>{item.Product_Colors}</span>
                              </h4>
                            </div>
                          </div>
                        </div>
                        <div style={{display:'flex',justifyContent:'space-between',backgroundColor:'#44332c',padding:'20px 20px',color:'#a7a498',fontSize:'20px'}}>
                          <FaCartPlus onClick={() => AddToCart(item, data.CartProducts, data.setCartProducts,data.CartItemNum , data.setCartItemNum)}/>
                          <MdDelete onClick={() => deleteCartItem(item, data.FavoriteProducts, data.setFavoriteProducts)} />
                          <FaEye />
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className={CartStyle.EmptyCart}><span>Favorite List Is Empty</span></div>
              )}
            </div>
          </div>
        )}
      </ShareData.Consumer>
    </div>
  );
}

export default Favorite;
