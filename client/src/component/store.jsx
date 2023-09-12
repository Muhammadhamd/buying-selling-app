import React, { useState, useRef, useEffect } from 'react';
import app from '../firebaseConfig.mjs'
import {  getStorage, ref, uploadBytes , getDownloadURL  } from "firebase/storage";
import axios from 'axios';
import ProductPost from './LatestPost';
import SubmitBtn from './submitbtn';
import { useNavigate, useLocation } from 'react-router-dom';
import LoadingComponent from './Loading';
function Store(){
const [searchInput , setSearchInput] = useState('')
const [isloading , setisloading] = useState(false)
const [products , setProducts]= useState([])
const [found404 , setfound404]= useState(false)
const navigate = useNavigate();
const location = useLocation();
const womentag = useRef([]);
const mentag = useRef([]);
const childrentag = useRef([]);
const SearchHandler = (e) => {
  e.preventDefault();
  
  setisloading(true)

  const encodedSearchInput = encodeURIComponent(searchInput);
  navigate(`/store?s=${encodedSearchInput}`);
  axios.get(`http://localhost:2344/posts?s=${searchInput}`)
    .then((res) => {
      setProducts(res.data);
      console.log(res.data)
  setfound404(false)

      // Update the URL without triggering a full page reload
    })
    .catch((e) =>{ console.log(e)
    setfound404(e.message)
    console.log(found404)
    })
    .finally(()=>{
  setisloading(false)

    })
}


const searchQuery = new URLSearchParams(location.search).get('s');

useEffect(()=>{
  console.log(searchQuery)
  setSearchInput(searchQuery)

  setisloading(true)
axios.get(`http://localhost:2344/posts?s=${searchQuery || ""}`)
.then((res)=>{
  console.log(res.data)
  setProducts(res.data)
  console.log(products)
  setfound404(false)
})
.catch((e)=>{console.log(e)
  setfound404(e.messege)
})
.finally(()=>{
  setisloading(false)

})
},[])

useEffect(()=>{
  const mentags = products.filter((product)=>product.tag === 'Men').map((product)=>product.tag)
  const womentags = products.filter((product)=>product.tag === 'Women').map((product)=>product.tag)
  const childrentags = products.filter((product)=>product.tag === 'children').map((product)=>product.tag)


  mentag.current = mentags
  womentag.current = womentags
  childrentag.current = childrentags
},[SearchHandler])


    return(

      <div className='bg-[#f5f7f9] flex justify-around md:py-[70px] py-[50px]'>
        <div>
          <div>
            <form className=' md:max-w-[300px]' onSubmit={SearchHandler}>
             <div className='flex border border-violet-500 justify-between overflow-hidden rounded-[3px]'>
             <input type="text" value={searchInput} className='outline-none'
              onChange={
                (e)=>
                  {setSearchInput(e.target.value)}
                  }/>
              <SubmitBtn value="search" edit='my-[0px] rounded-[0px] shadow-none' valueOnUpload="..." Requirments={[searchInput]} />
             </div>
            </form>
          </div>
          <div>
            <h1>Catogries</h1>
            <div>
              <ul>
                <li>Men({mentag.current.length})</li>
                <li>Women({womentag.current.length})</li>
                <li>Children({childrentag.current.length})</li>
              </ul>
            </div>
          </div>
        </div>
        <div className='pt-[100px] bg-white max-w-[1000px] w-[95%] px-[5%] flex flex-col items-center ' >
         <div className=' px-[13px] w-full flex  justify-start pb-[2em]'>
          <h1 className='text-[#777] '>{searchQuery || searchInput ? (`Home/Store/ ${searchQuery}`) :'Home/Store'}</h1>
         </div>
         <div className='pb-[2em] px-[13px] flex w-full justify-between'>
          <h1 className='text-xl'>Showing 1-{products.length || 0} of {products.length ||0} result</h1>
          <select name="" id="" className='outline-none px-3 py-2 w-[200px] text-slate-500'>
            <option className='px-3 py-2' value="">Default sorting</option>
            <option className='px-3 py-2' value="">sort by name</option>
            <option className='px-3 py-2' value="">Default sorting</option>
            <option className='px-3 py-2' value="">Default sorting</option>
          </select>
         </div>
         
         <div className='flex flex-wrap justify-center gap-[20px]'>

          {
           isloading? (<LoadingComponent isLoading={isloading} />)         
          :
            found404?(<div>{found404}</div>):
            (products.length > 0 &&
              products.map((product)=>[
                <ProductPost  key={product._id} title={product.title} price={product.price} isSale={product.salesDiscount} ratings={[0,3,4]} tag={product.tag}  />
              ]))
          
          }
  
         </div>
        </div>
      </div>
  
    )
}

export default Store