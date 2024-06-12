import React, { createContext,useState } from "react";
import { BrowserRouter, Route, Routes} from "react-router-dom";
import Header from "./component/Header/Header"
import Home from './component/Pages/Home/Home'
import Men from './component/Pages/Men/Men'
import Women from './component/Pages/Women/Women'
import Kids from './component/Pages/Kids/Kids'
import Contact from './component/Pages/Contact/Contact'
import NotFound from "./component/Pages/NotFound/NotFound";
import SignIn from "./component/Pages/SignIn/SignIn";
import Cart from "./component/Pages/Cart/Cart";
import Favorite from "./component/Pages/Favorite/Favorite"
import './App.css'
import View from "./component/Pages/View/View";

export const ShareData = createContext();

function App() {
  const [CartItemNum , setCartItemNum] = useState(0);
  const [CartProducts , setCartProducts] = useState([])
  const [FavoriteProducts , setFavoriteProducts] = useState([])


  return (
    <ShareData.Provider value={{CartItemNum,setCartItemNum,CartProducts,setCartProducts,FavoriteProducts , setFavoriteProducts}}>
      <BrowserRouter>
          <Header/>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/Men" element={<Men/>}/>
            <Route path="/Women" element={<Women/>}/>
            <Route path="/Kids" element={<Kids/>}/>
            <Route path="/Contact" element={<Contact/>}/>
            <Route path="/SignIn" element={<SignIn/>}/>
            <Route path="/Cart" element={<Cart/>}/>
            <Route path="/Favorite" element={<Favorite/>}/>
            <Route path="/:Product_Name" element={<View />} />


            <Route path='*' element={<NotFound/>}/>
          </Routes>
      </BrowserRouter>
    </ShareData.Provider>

)}
export default App