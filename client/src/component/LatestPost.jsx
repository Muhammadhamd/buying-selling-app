import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import app from '../firebaseConfig.mjs'
import oproductimg from "../img/productjeans1.jpg"
import {  getStorage, ref, uploadBytes , getDownloadURL  } from "firebase/storage";
import "../css/product.css"

import axios from 'axios';


<<<<<<< HEAD
function ProductPost({productImg , title , price ,tag , ratings ,isSale , productid}) {
=======
function ProductPost({productImg , title , price ,tag , ratings ,isSale , postid}) {
>>>>>>> 9f9c6fabc1e3ba9e9e09418d7a04b65ef84bb195

  const totalRating = ratings.reduce((value , currentvalue)=> value + currentvalue)

  const averageRating = totalRating / ratings.length
    
  const maxRating = 5; // Maximum rating value

  // Create an array of stars based on the averageRating
  const starIcons = [];
  for (let i = 1; i <= maxRating; i++) {
    if (i <= averageRating) {
      starIcons.push(<i key={i} className="fa fa-star"></i>); // Filled star
    } else {
      starIcons.push(<i key={i} className="fa fa-star-o"></i>); // Empty star
    }
  }

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
<<<<<<< HEAD
       <Link to={`/product/${productid}`}> <div className='w-full mb-[1em] '>
=======
       <Link to={`/post/${postid}`}>
       <div className='w-full mb-[1em] '>
>>>>>>> 9f9c6fabc1e3ba9e9e09418d7a04b65ef84bb195
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
        
        {starIcons}

        </div>
      </div>
    )
}

export default ProductPost