import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import app from '../firebaseConfig.mjs'
import oproductimg from "../img/productjeans1.jpg"
import {  getStorage, ref, uploadBytes , getDownloadURL  } from "firebase/storage";
import "../css/product.css"
import axios from 'axios';


function ProductPost({productImg , title , price ,tag , ratings ,isSale , productid}) {
  const [rateingarray , setratingarray] =useState([])
  useEffect(() => {
    if (ratings && ratings.length > 0) {
      const totalRating = ratings.reduce((sum, ratingObj) => sum + ratingObj.rating, 0);
      const averageRating = totalRating / ratings.length;
      const starIcons = [];
  
      for (let i = 1; i <= 5; i++) {
        if (i <= averageRating) {
          starIcons.push(
          
              <i key={i} className="fa fa-star text-gold"></i>
           
          ); // Filled star
        } else {
          starIcons.push(
         
              <i key={i} className="fa fa-star-o text-gold"></i>
           
          ); // Empty star
        }
      }
  
      setratingarray(starIcons);
    } else {
      // If there are no ratings, display empty stars
      
        
          <i className="fa fa-star-o text-gold"></i>
    }
     
     
    
  }, [ratings]);
  

const discountedPrice =  Math.floor(price - (isSale * price / 100 ))
    return (
      <div className='relative max-w-[260px] h-[420px]'>
       <div className='product'>
       <div className='absolute top-[10px] right-[15px] bg-white h-[40px] text-xl text-violet-500 flex justify-center items-center w-[40px] shadow rounded-full cartbtn'>
    <i class="fa fa-cart-plus"></i>
        </div>
        {isSale &&
        <div className='absolute top-[10px] left-[15px] bg-white shadow rounded-full px-3 py-1'>Sale</div>
      }
       <Link to={`/product/${productid}`}> <div className='w-full mb-[1em] '>
          <img src={oproductimg|| productImg} alt="" />
        </div></Link>
       </div>
        <div className='font-bold mb-[.5em] text-[19px] tracking-[0rem]'><h1>{title}</h1></div>
        <div className='text-slate-500 mb-[.5em] '><h3>{tag}</h3></div>
        {
          isSale?(
          <div className='flex gap-[10px]'>
            <div className='font-semibold mb-[.5em] text-slate-500 line-through'>${price}</div>
            <div className='font-semibold mb-[.5em]'>${discountedPrice}</div>
            </div>

          ):(
            <div className='font-semibold mb-[.5em]'>{price}</div>

          )
        }
        <div className='flex'>
        
        {rateingarray}

        </div>
      </div>
    )
}

export default ProductPost