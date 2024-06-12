import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';

import { FaCartPlus } from "react-icons/fa";
import { MdFavoriteBorder } from "react-icons/md";
import { FaHeart } from "react-icons/fa";

function View() {
  const [searchParams] = useSearchParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const productId = searchParams.get('id');

  useEffect(() => {
    axios.get('/Products.json')
      .then(response => {
        const product = response.data.filter(product => product.Product_ID == productId);
        setItem(product[0]);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, [productId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!item) {
    return <div>Product not found</div>;
  }

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


  return (
    <>
    <div style={{marginTop: '130px', display:'flex',gap:'30px',justifyContent:'center'}}>
      <div style={{display:'flex',justifyContent:'center',flexDirection:'column',alignItems:'center',gap:'20px'}}>
        <img src={item.Product_Images} alt="Product" style={{width:'100%', height:'405px'}}/>
        <div>
            {item.Product_Images.map((img, index) => (
              <img src={img} alt='images' style={{width:'50px', height:'50px',marginRight:'10px'}}/>
            ))}
          </div>
      </div>
      <div style={{display:'flex',justifyContent:'space-between',flexDirection:'column',height:'498px'}}>
        <div style={{display:'flex',gap:'20px',flexDirection:'column'}}>
            <h1>{item.Product_Name}</h1>
            <p>{item.Product_Category}</p>
            <h2>{item.Product_Price}<span> JOD</span></h2>
        </div>
        <div style={{display:'flex',justifyContent:'space-evenly',flexDirection:'column',height:'350px'}}>
          <div style={{display:'flex',gap:'50px'}}>
            {item.Product_Colors.map((color, index) => (
              getColorStyle(color)
            ))}
          </div>
          <div style={{display:'flex',gap:'50px'}} >
            {item.Product_Sizes.map((size, index) => (
              <button>{size}</button>
            ))}
          </div>
        </div>
      </div>
    </div>
    <div style={{display:'flex',padding:'8px 5%',backgroundColor:'var(--DarkBrown)',position:'fixed',width:'100%',bottom:'0',alignItems:'center',color:'var(--WhiteBrown)',gap:'30px'}}>
        <div style={{fontSize:'30px',textAlign:'center',height:'100%'}}>
            <MdFavoriteBorder style={{textAlign:'center'}}/>
        </div>
        <button style={{display:'flex',flexDirection:'column',gap:'10px',width:'100%',justifyContent:'flex-end',alignItems:'center'}}>
            <h4 style={{fontSize:'30px'}}>Add To Cart</h4>
            <p style={{fontSize:'15px'}}>Total : {item.Product_Price}<span style={{fontSize:'15px'}}>JOD</span></p>
        </button>
    </div>
    </>
  );
}

export default View;
