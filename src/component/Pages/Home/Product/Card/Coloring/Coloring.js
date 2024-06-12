import React from 'react'

function Coloring({colorVal,index,funImg}) {
    let backgroundColor;
    switch(colorVal) {
      case "Navy Blazer": 
        backgroundColor = '#171927';
        break;
      case "Black": 
        backgroundColor = '#000000';
        break;
      case "Dewshine": 
        backgroundColor = '#c4cbcf';
        break;
      case "Radient Watermelon": 
        backgroundColor = '#d33a2f';
        break;
      case "White": 
        backgroundColor = '#eae9ee';
        break;
      case "Olive Burnt": 
        backgroundColor = '#988660';
        break;
      case "Grey Ultimate":
        backgroundColor = '#a9a9ab';
        break;
      case "Tan Desert":
        backgroundColor = '#cdc4b7';
        break;
      case "Olive Mayfly":
        backgroundColor = '#6c683f';
        break;
      case "Blue":
        backgroundColor = '#cdd8e9';
        break;
      case "Black Full Grain":
        backgroundColor = '#404040';
        break;
      case "Tan Oiled Full Grain":
        backgroundColor = '#8e674d';
        break;
      case "Green Frozen":
        backgroundColor = '#d1ddcd';
        break;
      case "Blue Sailor":
        backgroundColor = '#06547e';
        break;
      case "Pink":
        backgroundColor = '#ebdbd5';
        break;
      case "Coral Cedar":
        backgroundColor = '#d99577';
        break;
      case "Night Sky":
        backgroundColor = '#d99577';
        break;
      case "Whimsy":
        backgroundColor = '#21354f';
        break;
      default:
        backgroundColor = ''; 
    }
  return (
      <li key={index} style={{backgroundColor:backgroundColor,borderRadius: '50%', width: '20px', height: '20px'}} onClick={()=>funImg(index)}></li>
  )
}

export default Coloring
