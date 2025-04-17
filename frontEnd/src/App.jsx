import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './Components/Header/Header'
import Footer from './Components/Footer/Footer'
import Main from './Components/Pages/Main/Main'
import Iphone from './Components/Pages/Iphone/Iphone'
import Ipad from './Components/Pages/Ipad/Ipad'
import Watch from './Components/Pages/Watch/Watch'
import Tv from './Components/Pages/Tv/Tv'
import Music from './Components/Pages/Music/Music'
import Support from './Components/Pages/Support/Support'
import Cart from './Components/Pages/Cart/Cart'
import Mac from './Components/Pages/Mac/Mac'
import YoutubeVideos from './Components/YoutubeVideos/YoutubeVideos'
import './App.css'
import './assets/css/bootstrap.css'
import './assets/css/styles.css'
import FO4 from './Components/Pages/FuorOFuor/FO4'
import SingleProduct from './Components/Pages/singleProduct/SingleProduct'

function App() {

  return (
    <>
    <Header/>
    <Routes>
      <Route path="/" element={<Main/>}/>
      <Route path='/mac' element={<Mac/>}/>
      <Route path='/iphone' element={<Iphone/>}/>
      <Route path='/iphone/:productID' element={<SingleProduct/>}/>
      <Route path='/ipad' element={<Ipad/>}/>
      <Route path='/watch' element={<Watch/>}/>
      <Route path='/tv' element={<Tv/>}/>
      <Route path='/music' element={<Music/>}/>
      <Route path='/support' element={<Support/>}/>
      <Route path='/cart' element={<Cart/>}/>
      <Route path='*' element={<FO4/>}/>
      {/* <YoutubeVideos/>   */}
    </Routes>
    <Footer/>

    </>
  )
}

export default App
