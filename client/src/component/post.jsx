import React,{useEffect ,useState , useRef} from 'react';
import { useParams , Link } from 'react-router-dom';
<<<<<<< HEAD
import oproductimg from "../img/productjeans1.jpg"

=======
>>>>>>> 9f9c6fabc1e3ba9e9e09418d7a04b65ef84bb195
import axios from 'axios';
import oproductimg from "../img/productjeans1.jpg"

import LoadingComponent from './Loading';
import Errormsg from './errorcomponent';
import ProductPost from './LatestPost';
import SubmitBtn from './submitbtn';
function PostPage () {
    const [data , setdata] = useState([])
<<<<<<< HEAD
const  postId  = useParams().productid
=======
const  postId  = useParams().postid;
>>>>>>> 9f9c6fabc1e3ba9e9e09418d7a04b65ef84bb195
        const [relatedPost , setRelatedPost]= useState([])
        const [isLoading , setIsLoading] = useState(true)
        const [addinngtocart , setaddinngtocart] = useState(false)
        const [isRelatedPostLoading , setIsRelatedPostLoading] = useState(true)
        const itemNumberRef = useRef(null)
        const [errorhandle ,setErrorHandle] = useState(false)

const addToCartHandler = (id)=>{


  const newCartProduct = {
    Quantity:itemNumberRef.current.value,
    productid:id
  
  
  }

  axios.post("http://localhost:2344/addtocart",{
    isdata:newCartProduct
  })
  .then((res)=>{
    console.log(res)

  })
  .catch((e)=>console.log(e))
}


useEffect(()=>{
  setIsLoading(true)
  console.log(postId
    )

  axios.get(`http://localhost:2344/post/${postId}`)
           
  .then((res)=>{
      setdata(res.data)
      console.log(data)

      setTimeout(() => {
        
      },2000);
})
  .catch((e)=>{console.log(e)

    // ErrorRef.current(true)
    setErrorHandle(true)

  })
  .finally(()=>{
    setIsLoading(false)

  })
  
},[postId])
useEffect(()=>{
  setInterval(() => {
    axios.get(`http://localhost:2344/posts`)
           
  .then((res)=>{

    
    
  
      setRelatedPost(res.data)
    

      
})
  .catch((e)=>{console.log(e)
  setErrorHandle(true)

  }).finally(()=>{
    setIsRelatedPostLoading(false)


  })
  }, 5000);

},[])
const filterpost = relatedPost.filter((post)=>post._id !== postId)
const slicedRelatedPosts = filterpost.slice(0, 3);
  return (
  <>
   {isLoading ?
   (
    <LoadingComponent isLoading={isLoading}/>
   )
   :
   (
   <>  
  { errorhandle?
   (<Errormsg isError={errorhandle} note='network error please check your Internet connection or try again' /> )
   :
  ( <div className='flex flex-col items-center bg-[#f5f7f9]'>
    
<<<<<<< HEAD
    <div className='flex w-full justify-center mt-[100px]'>
    <div className='max-w-[700px] w-full'>
      <img className='w-full' src={data.image || oproductimg} alt="" />
    </div>
    <div className='text-[19px] md:ml-[50px] pt-[15px]'>
      <h3 className='text-[#777]  mb-[.8em]'>Home/women/{data.title}</h3>
      <h2 className='mb-[.8em]'>{data.tag}</h2>
      <h1 className='text-4xl'>{"Basic Gray Jeans"||data.title}</h1>
      <h1 className='text-3xl text-slate-700 font-semibold my-[.6em]'>${data.price}</h1>
      <p className='max-w-[600px] text-[18px] leading-[1.8rem] text-[#766] w-full'>{"Nam nec tellus a odio tincidunt auctor a ornare odio. Sed non mauris vitae erat consequat auctor eu in elit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Mauris in erat justo. Nullam ac urna eu felis dapibus condimentum sit amet a augue. Sed non neque elit sed ." || data.description}</p>
=======
     <div className='mx-[4%] w-[95%]  my-16 max-w-[1100px]'>
     <h1 className='font-bold text-[34px] mb-3'>{data.title}</h1>
     <h3 className='text-slate-500 text-[19px] mt-[15px]'>
            {new Date(data.timeStamp).toLocaleString('en-US', { month: 'long' })}
            {' '}
            { new Date(data.timeStamp).getDay()} , {new Date(data.timeStamp).getFullYear()}
            
            </h3>
      <div className='h-[500px]  flex justify-center items-center w-full'>
        <img className='h-[inherit]' src={data.image ''} alt="" />
      </div>
>>>>>>> 9f9c6fabc1e3ba9e9e09418d7a04b65ef84bb195
    
    
    
     <form onSubmit={(e)=> {
      e.preventDefault()
      addToCartHandler(data._id)}} className='flex gap-[15px] mt-[20px] items-center'>
     <input 
     className='w-[50px] h-[50px] outline-none text-slate-700 pl- ' 
     ref={itemNumberRef} 
     defaultValue={1} 
     type="number" 
     onChange={()=>{
      let inputValue = parseFloat(itemNumberRef.current.value);
    inputValue = isNaN(inputValue) || inputValue <= 1 ? 1 : inputValue;
    itemNumberRef.current.value = inputValue;
     }}
     />
      <button className='h-[40px] max-w-[300px] w-full rounded shadow  tracking-[.04rem] text-violet-5  font-semibold text-[17px] text-white bg-violet-500'>ADD TO CART</button>
     </form>
    </div>
  </div>
      <div className='flex flex-wrap gap-[40px] items-center justify-center md:mx-[2%] my-[3%]'>
        {
          isRelatedPostLoading?(<LoadingComponent isLoading={isLoading?false:isRelatedPostLoading} />)
          :(slicedRelatedPosts.map((eachPost)=>[
           <ProductPost productid={eachPost._id} title={eachPost.title} price={eachPost.price} isSale={eachPost.salesDiscount} tag={eachPost.tag} ratings={[0,3,2]}/>
          ]))
            
        }
        </div>
    </div>)
    }
   </> 
   )
    
    
    }
  </>
  );
}

export default PostPage;
