import React, { useState, useRef, useEffect } from 'react';
import {Link} from "react-router-dom"
import banner1 from './img/image 1.jpg'
import "./App.css"
import app from './firebaseConfig.mjs'
import lockimg from "./img/lock-free-img.png"
import globeimg from "./img/globe-free-img.png"
import qualityimg from "./img/quality-free-img.png"
import tagimg from "./img/tag-free-img.png"
// import lockimg from "./img/lock-free-img.png"
import {  getStorage, ref, uploadBytes , getDownloadURL  } from "firebase/storage";


import axios, { toFormData } from 'axios';
import Navcomponent from './component/navbar';
import ProductPost from './component/LatestPost';
import Footercomponent from './component/footer';


function Home() {
  const [isLogin , setIslogin] = useState(false)
  const [userdata , setUserData] = useState([])

const userlogincheckhnadler = async() =>{

  try {
    const res = await axios.get("http://localhost:2344/currentuser",{
      withCredentials: true,
    })
      setIslogin(true)
      setUserData(res.data)
    console.log(res)
  } catch (error) {
    console.log(error)
  }
}
useEffect(()=>{
  userlogincheckhnadler()
  console.log(userdata)
},[isLogin])

  return (
   <div>
     <div className='service-div'>
  <Navcomponent islogin={isLogin} img={userdata.image} />

  <div className=' overlay'>

<div className='h-full flex flex-col justify-center gap-[40px] ml-[5%]'>
<h1 className=' max-w-[600px] leading-[1.2em] font-[600] text-white max-[600px]:text-5xl text-7xl tracking-tight'>Raining Offers For Hot Summer!</h1>
<h3 className='text-4xl max-[600px]:text-3xl text-white font-semibold tracking-tight'>25% Off On All Products</h3>
<div className='flex max-[400px]:flex-col gap-[20px] '>
  <button className='font-bold max-[500px]:w-[90%] text-base text-black max-[500px]:px-5 max-[500px]:py-3 px-8 py-4 bg-white hover:bg-black hover:text-white transition ease-in-out'><Link to='/store'>SHOP NOw</Link></button>
  <button className='font-bold max-[500px]:w-[90%]  max-[500px]:px-5 max-[500px]:py-3 text-base text-white px-8 py-4 bg-transparent border-4 border-white hover:bg-white hover:text-black transition ease-in-out'><Link to='/store'>FIND MORE</Link></button>
</div>
</div>
  </div>
    </div>
    <div className='bg-[#f5f7f9] pt-20 mb-20 flex flex-col items-center my-[50px]'>
      <h1 className='text-5xl font-semibold text-center mt-[20px]'>Featured Products</h1>
      <div className='max-w-[160px] w-full border-2 border-[#0084d6] my-[25px]'></div>

      <div className='flex flex-wrap gap-[20px] justify-center mt-[40px]'>
        <ProductPost title="Basic Gray Jeans" ratings={[4]} isSale={33} tag="Men" price={1500} />
        <ProductPost title="Basic Gray Jeans" ratings={[2,3,4,5,4,2,1,4,3]} tag="Men" price={1500} />
        <ProductPost title="men jeans" tag="Men" ratings={[2,3,4,5,4,2,1,4,3]} price={1500} />
        <ProductPost title="men jeans" tag="Men" ratings={[2,3,4,5,4,2,1,4,3]} price={1500} />
        <ProductPost title="men jeans" tag="Men" ratings={[2,3,4,5,4,2,1,4,3]} price={1500} />
        <ProductPost title="men jeans" tag="Men" ratings={[2,3,4,5,4,2,1,4,3]} price={1500} />
        <ProductPost title="men jeans" tag="Men" ratings={[2,3,4,5,4,2,1,4,3]} price={1500} />
        <ProductPost title="men jeans" tag="Men" ratings={[2,3,4,5,4,2,1,4,3]} price={1500} />
        <ProductPost title="men jeans" tag="Men" ratings={[2,3,4,5,4,2,1,4,3]} price={1500} />
      </div>
    </div>
    <div className='service-div2'>
    <div className='h-full flex flex-col justify-center gap-[30px] ml-[6%] text-white'>
      <h3 className=' max-[500px]:text-base font-semibold text-xl'>Limited Time Offer</h3>
      <h1 className=' max-[500px]:text-4xl font-semibold text-5xl'>Special Edition</h1>
      <p className=' max-[500px]:text-[16px] font-regular text-[18px] max-w-[600px]'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.</p>
      <h3 className='max-[500px]:text-base font-semibold text-xl'>Buy This T-shirt At 20% Discount, Use Code OFF20</h3>
  <div>
  <button className='max-[500px]:w-[90%]  max-[500px]:px-5 max-[500px]:py-3  font-bold text-base text-black px-8 py-4 bg-white hover:bg-black hover:text-white transition ease-in-out'><Link to='/store'>SHOP NOw</Link></button>
  </div>
      
    </div>
    </div>
    <div className='flex gap-[30px] justify-center flex-wrap'>
    <div className='flex  gap-[20px] flex-col items-center max-w-[300px] text-center'>
        <img className='w-[100px] md:w-[30%]'  src={globeimg} alt="" />
        <h1 className='font-semibold text-xl'>Secure Payments</h1>
        <p className='leading-[1.25em]'>It elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.</p>
      </div>
      <div className='flex gap-[20px]  flex-col items-center max-w-[300px] text-center'>
        <img  className='w-[100px] md:w-[30%]' src={qualityimg} alt="" />
        <h1 className='font-semibold text-xl'>Secure Payments</h1>
        <p className='leading-[1.25em]'>It elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.</p>
      </div>
      <div className='flex gap-[20px]  flex-col items-center max-w-[300px] text-center'>
        <img  className='w-[100px] md:w-[30%]' src={tagimg} alt="" />
        <h1 className='font-semibold text-xl'>Secure Payments</h1>
        <p className='leading-[1.25em]'>It elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.</p>
      </div>
      <div className='flex gap-[20px]  flex-col items-center max-w-[300px] text-center'>
        <img  className='w-[100px] md:w-[30%]' src={lockimg} alt="" />
        <h1 className='font-semibold text-xl'>Secure Payments</h1>
        <p className='leading-[1.25em]'>It elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.</p>
      </div>
    </div>
   </div>
  );
}

export default Home;
