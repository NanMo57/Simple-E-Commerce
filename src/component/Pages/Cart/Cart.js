import React, { useState } from 'react';
import { ShareData } from '../../../App';
import Products from '../../../Products/Products.json';
import CartStyle from './Cart.module.css';
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { MdFavoriteBorder } from "react-icons/md";
import { FaHeart } from "react-icons/fa";
import { IoIosCloseCircle } from "react-icons/io";

const Cart = () => {
  const [editingIndex, setEditingIndex] = useState(null);

  const totalPrice = (items) =>
    items.reduce((acc, item) => acc + item.Product_Quantity * item.Product_Price, 0).toFixed(2);

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

  const updateCartItem = (index, quantity, CartProducts, setCartProducts, CartNum, setCartNum) => {
    function Update(){  
    const updatedCart = CartProducts.map((item, i) =>
        i === index ? { ...item, Product_Quantity: item.Product_Quantity + quantity } : item
      );
      setCartProducts(updatedCart);
    }

    quantity == 1 ? Update() : CartProducts[index].Product_Quantity > 1 && Update()
     
    quantity==-1 && CartNum==1 ? setCartNum(CartNum):setCartNum(CartNum + quantity)
    
  };

  const deleteCartItem = (index, CartProducts, setCartProducts, CartItemNum, setCartItemNum) => {
    const itemToDelete = CartProducts[index];
    const updatedCart = CartProducts.filter((_, i) => i !== index);
    setCartProducts(updatedCart);
    setCartItemNum(CartItemNum - itemToDelete.Product_Quantity);
  };

  const toggleEditItems = (index) => {
    setEditingIndex(editingIndex === index ? null : index);
    document.querySelectorAll(`.${CartStyle.EditItems}`).forEach((el, i) => {
      el.style.visibility = (Math.floor(i / 2) === index && editingIndex !== index) ? 'visible' : 'hidden';
    });
  };

  const saveEdit = (property, value, item, items, setCartProducts, index=0, product_id=1) => {
    const updatedCart = items.map((ele) =>
      ele === item ? { ...item, [property]: value, Product_Images: Products[product_id - 1].Product_Images[index] } : ele
    );
    setCartProducts(updatedCart);
    handleDuplicates(updatedCart, setCartProducts);
  };

  const handleDuplicates = (cartItems, setCartProducts) => {
    const duplicates = cartItems.reduce((acc, item, index, array) => {
      const duplicateIndex = array.findIndex(
        (ele, idx) =>
          idx !== index &&
          item.Product_ID === ele.Product_ID &&
          item.Product_Sizes === ele.Product_Sizes &&
          item.Product_Colors === ele.Product_Colors
      );
      if (duplicateIndex !== -1 && !acc.includes(array[duplicateIndex])) {
        acc.push(array[duplicateIndex]);
      }
      return acc;
    }, []);

    if (duplicates.length > 0) {
      const [eleDelete, ...remainingDuplicates] = duplicates;
      remainingDuplicates[0].Product_Quantity += eleDelete.Product_Quantity;

      const newCart = cartItems.filter(
        item =>
          !(
            item.Product_ID === eleDelete.Product_ID &&
            item.Product_Sizes === eleDelete.Product_Sizes &&
            item.Product_Colors === eleDelete.Product_Colors &&
            item.Product_Quantity === eleDelete.Product_Quantity
          )
      );

      setCartProducts(newCart);
    }
  };

   const AddToFavorite = (Item, List, UpdateList) => {
    let Add_Data = {
      "Product_ID": Item.Product_ID,
      "Product_Name": Item.Product_Name,
      "Product_Price": Item.Product_Price,
      "Product_Images": Item.Product_Images,
      "Product_Sizes": Item.Product_Sizes,
      "Product_Colors": Item.Product_Colors,
      "Product_Category": Item.Product_Category
    };

    UpdateList([...List, Add_Data]);
  };

  const RemoveFromFavorite = (Item, List, UpdateList)=>{
    let Remove_Data = {
      "Product_ID": Item.Product_ID,
      "Product_Name": Item.Product_Name,
      "Product_Price": Item.Product_Price,
      "Product_Images": Item.Product_Images,
      "Product_Sizes": Item.Product_Sizes,
      "Product_Colors": Item.Product_Colors,
      "Product_Category": Item.Product_Category
    };

    let UpdatedList = List.filter(item=>item.Product_Colors !== Remove_Data.Product_Colors);

    UpdateList(UpdatedList)
  }





  return (
    <div className={CartStyle.cart}>
      <ShareData.Consumer>
        {(data) => (
          <div>
            <div>
              {data.CartProducts.length ? (
                data.CartProducts.map((item, ind) => (
                  <div key={ind}>
                    <div className={CartStyle.card}>
                      <div className={CartStyle.Image}>
                        <img src={item.Product_Images} alt='' />
                      </div>
                      <div className={CartStyle.RightBlock}>
                        <div className={CartStyle.cardInfo}>
                          <div className={CartStyle.TopInfo}>
                            <h3>{item.Product_Name}</h3>
                            <div>
                              <h4 style={{ display: 'flex', gap: '5px' }}>
                                <span style={{ marginRight: '8px' }}>Color: </span>
                                {getColorStyle(item.Product_Colors)}
                                <span>{item.Product_Colors}</span>
                              </h4>
                              <div
                                style={{ display: editingIndex === ind ? 'flex' : 'none', gap: '10px', position: 'absolute', top: '40px', right: '75px' }}
                                className={CartStyle.EditItems}
                              >
                                {Products.find(p => p.Product_ID === item.Product_ID)?.Product_Colors.map((color, index) => (
                                  <div
                                    key={index}
                                    onClick={() => saveEdit('Product_Colors', color, item, data.CartProducts, data.setCartProducts, index,item.Product_ID)}
                                    style={{ cursor: 'pointer' }}
                                  >
                                    {getColorStyle(color)}
                                  </div>
                                ))}
                              </div>
                            </div>
                            <div>
                              <h4 style={{ display: 'flex', gap: '5px' }}>
                                <span style={{ marginRight: '8px' }}>Size: </span>
                                <span>{item.Product_Sizes}</span>
                              </h4>
                              <div
                                style={{ display: editingIndex === ind ? 'flex' : 'none', gap: '10px', position: 'absolute', top: '95px', right: '75px' }}
                                className={CartStyle.EditItems}
                              >
                                {Products.find(p => p.Product_ID === item.Product_ID)?.Product_Sizes.map((size, index) => (
                                  <div
                                    key={index}
                                    onClick={() => saveEdit('Product_Sizes', size, item, data.CartProducts, data.setCartProducts)}
                                    style={{ cursor: 'pointer' }}
                                  >
                                    {size}
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                          <div className={CartStyle.quanPriceItem}>
                            <span>Total: <b>{(item.Product_Quantity * item.Product_Price).toFixed(2)}</b>JOD</span>
                            <span className={CartStyle.quantity}>
                              <button onClick={() => updateCartItem(ind, -1, data.CartProducts, data.setCartProducts, data.CartItemNum, data.setCartItemNum)}>-</button>
                              {item.Product_Quantity}
                              <button onClick={() => updateCartItem(ind, 1, data.CartProducts, data.setCartProducts, data.CartItemNum, data.setCartItemNum)}>+</button>
                            </span>
                          </div>
                        </div>
                        <div className={CartStyle.Icon}>
                          <MdDelete onClick={() => deleteCartItem(ind, data.CartProducts, data.setCartProducts, data.CartItemNum, data.setCartItemNum)} />
                          {editingIndex === ind
                            ? <IoIosCloseCircle onClick={() => toggleEditItems(ind)} />
                            : <FaEdit onClick={() => toggleEditItems(ind)} />}
                          {data.FavoriteProducts.some(
                              (Item) => item.Product_ID === Item.Product_ID && item.Product_Colors === Item.Product_Colors
                            )
                            ? <FaHeart onClick={() => RemoveFromFavorite(item, data.FavoriteProducts, data.setFavoriteProducts)}/>
                            : <MdFavoriteBorder onClick={() => AddToFavorite(item, data.FavoriteProducts, data.setFavoriteProducts)} />}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className={CartStyle.EmptyCart}><span>Cart Is Empty</span></div>
              )}
            </div>
            <div className={CartStyle.checkout}>
              <p>Total: <b>{totalPrice(data.CartProducts)} JOD</b></p>
              <button>Checkout ({data.CartItemNum})</button>
            </div>
          </div>
        )}
      </ShareData.Consumer>
    </div>
  );
}

export default Cart;
