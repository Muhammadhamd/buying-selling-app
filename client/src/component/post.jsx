import React,{useEffect ,useState , useRef} from 'react';
import { useParams , Link } from 'react-router-dom';
import oproductimg from "../img/productjeans1.jpg"
import dpimage from "../img/imgholder.jpg";
import axios from 'axios';
import LoadingComponent from './Loading';
import Errormsg from './errorcomponent';
import ProductPost from './LatestPost';
import SubmitBtn from './submitbtn';
import Navcomponent from './navbar';
function PostPage () {
  const [reviewOrDescription , setreviewOrDescription] =useState("description")
    const [data , setdata] = useState([])
    const [userdata , setuserdata] = useState([])
    const [Ratestar ,setRatestar] = useState([])
    const [islogin , setislogin] = useState()
    const  [reviewRateIs , setreviewRateIs] =useState(null)
    const reviewMessage = useRef(null)
    const [rerendercompoent , setRerenderComponent] =useState(false)
const  postId  = useParams().productid 
    const [changeId , setChangeId] = useState(postId)
    const [reviewStarIcon , setReviewStarIcon] = useState([])
        const [relatedPost , setRelatedPost]= useState([])
        const [isLoading , setIsLoading] = useState(true)
        const [addinngtocart , setaddinngtocart] = useState(false)
        const [isRelatedPostLoading , setIsRelatedPostLoading] = useState(true)
        const itemNumberRef = useRef(null)
        const [errorhandle ,setErrorHandle] = useState(false)
        const [ratingArray , setRatingArray] = useState([])
        const [rewiesArray , setReviewsArray] = useState([])
        const userLoginCheckHandler = async() =>{

          try {
            const res = await axios.get("/currentuser",{
              withCredentials: true,
            })
            setislogin(true)
            console.log(res)
            setuserdata(res.data)
          } catch (error) {
            console.log(error)
            setislogin(false)
          }
        }
      
const addToCartHandler = (id)=>{


  const newCartProduct = {
    Quantity:itemNumberRef.current.value,
    productid:id
  
  
  }

  axios.post("/addtocart",{
    isdata:newCartProduct
  },{
    withCredentials: true,
  })
  .then((res)=>{
    console.log(res)

  })
  .catch((e)=>console.log(e))
}

const addReviewHandle = async (e)=>{
  e.preventDefault()
  try {
    const res= await axios.post(`/post-rating/${postId}`,{
      rating:reviewRateIs,
      message: reviewMessage.current.value
    },{
      
        withCredentials: true,
      
    })
    console.log(res)
    setRerenderComponent(true)
   } catch (error) {
    console.log(error)
   }

}
const HandleRatingSubmit = async(e) =>{
  
  console.log(e)
  console.log('clciekd ajfaj')
  setreviewRateIs(e)
  
  
  }

  useEffect(()=>{
    console.log('rate is here' , reviewRateIs)
  },[reviewRateIs])
  

useEffect(()=>{
  setIsLoading(true)

  axios.get(`/post/${postId}`,{
    withCredentials: true,
  })
           
  .then((res)=>{
      setdata(res.data)
      console.log(res.data.rating)

      setTimeout(() => {
        
      },2000);
})
  .catch((e)=>{console.log(e)

    // ErrorRef.current(true)
    setErrorHandle(true)

  })
  .finally(()=>{
    setIsLoading(false)
    setRerenderComponent(false)

  })
  
},[postId , rerendercompoent ,changeId])


useEffect(()=>{
  setInterval(() => {
    axios.get(`/posts`)
           
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

useEffect(()=>{
   userLoginCheckHandler()
},[islogin])

const filterpost = relatedPost.filter((post)=>post._id !== postId)
const slicedRelatedPosts = filterpost.slice(0, 3);



useEffect(() => {
  if (data.rating) {
    setRatingArray(data.rating.map((rating) => rating.rating));
  setReviewsArray(data.rating.map((review)=> review))

  }
  else{
    setRatingArray([]);
    setReviewsArray([]);

  }

  console.log(data)
}, [data]);

useEffect(()=>{
  console.log(ratingArray)
  console.log(rewiesArray)
  const starIcons = [];
  const reviewStarIcons=[
          <i key={1} onClick={() => HandleRatingSubmit(1)} className="fa fa-star-o text-gold"></i>
        ,
        <i key={2} onClick={() => HandleRatingSubmit(2)} className="fa fa-star-o text-gold"></i>
      ,
      <i key={3} onClick={() => HandleRatingSubmit(3)} className="fa fa-star-o text-gold"></i>
,
      <i  key={4} onClick={() => HandleRatingSubmit(4)}  className="fa fa-star-o text-gold"></i>
,
  <i key={5} onClick={() => HandleRatingSubmit(5)} className="fa fa-star-o text-gold"></i>
  ];
  if (ratingArray.length) {
    const totalRating = ratingArray?.reduce((value , currentvalue)=> value + currentvalue)

    const averageRating = totalRating / ratingArray.length
    


    console.log(averageRating)
    for (let i = 1; i <= 5; i++) {
      if (i <= averageRating) {
        starIcons.push(
          
            <i className="fa fa-star text-gold"></i>
        
        ); // Filled star
      } else {
        starIcons.push(
          
            <i className="fa fa-star-o text-gold"></i>
        
        ); // Empty star
      }
    }
  
   
  }else{
    for (let i = 1; i <= 5; i++) {
      starIcons.push(
       
          <i className="fa fa-star-o text-gold"></i>
  
      );
      
    }
  }
  setRatestar(starIcons);

  setReviewStarIcon(reviewStarIcons)

},[ratingArray, data ])




  return (
  <>
     <Navcomponent islogin={islogin} img={userdata.image} changeCss={true}/>

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
    
    
     <div className="flex  gap-[6px] my-[25px] text-xl" >
      {Ratestar}
     </div>


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
  <div class="p-[3%] w-full  my-[5%]">
                <div class=" p-4">
                  <ul id="tabs-nav">
                    <li>
                      <a class=" uppercase text-base" href="#tab1"
                      onClick={(e)=>{
                        setreviewOrDescription("description")
                      }}>
                        Description
                      </a>
                    </li>
                    <li class="pl-2">
                      <a class=" uppercase text-base" href="#tab2"
                       onClick={(e)=>{
                        setreviewOrDescription("reviews")
                      }}
                      >
                        Reviews
                      </a>
                    </li>
                  </ul>
                  <div id="tabs-content"> 
                  {   
                    reviewOrDescription === "description" ? 
                          <div id="tab1" class="tab-content p-4">
                      <h5 class="">1983 Custom</h5>
                      <p class="">!!!! REDUCED BY $200,000.00 !!!! Motivated Seller !!! BRING ALL </p>
                      <p class="">MAGIC SPIRIT</p>
                      <h3 class=" xl:text-2xl 2xl:text-3xl pt-4 py-2 ">AMERICAN MADE HULL – CAN CHARTER IN </h3>
                      <p class=" text-sm lg:text-base 2xl:text-lg pt-2 pb-8">
                        Magic Spirit’ is the mother ship of her fleet, …consisting of 4 yachts varying in size that make up (Magic Yacht Charters) ‘MagicSpirit’ has an LOA of 133′ spread out across three decks, The
                        largest Carter “SHIP” currently on the west coast of Canada. She easily accommodate a large crowd totalling a whopping 415 persons at capacity, with dinning accommodations for 350
                        guests. a total of 4 Heads (bathrooms) (2Men) (2Ladies) A very large commercial grade gally & appliances. Each level is Bar station equipped, Her top ‘Open’ deck is 3000sqft. & equipped
                        with a Bar station, Fridge & removable shelter top.. currently undergoing a fresh paint job.
                      </p>
                      <h6 class=" text-sm lg:text-base 2xl:text-lg pb-4">A 2020 survey on file (condition& Value )</h6>
                      <p class=" text-sm lg:text-base 2xl:text-lg pb-6">
                        The Vancouver, BC based business (MAGIC YACHT CHARTERS) is also available should one wish to take over a well established, long standing Charter operation. (20 years strong) Located In the Heart of Vancouver in the (Westin Bayshore Marina) just off the Very popular Seawall & next to Coal Harbour Marina. Moored in a very desirable locations she rests just in front of the ver
                      </p>
                      <h6 class=" text-sm lg:text-base 2xl:text-lg pb-3"> Google rating of 4.3 out of 5 start</h6>
                      <p class=" text-sm lg:text-base 2xl:text-lg pb-4">(Website Quote) </p>
                      <p class=" text-sm lg:text-base 2xl:text-lg pb-3">
                        Magic Yacht Charters’ fleet is spectacularly located at the Westin Bayshore Marina in Coal Harbour; and all four of the yachts are uniquely suited to hosting an event that leaves a lasting impression, be it for business or pleasure.
                      </p>
                      <p class="text-white text-sm lg:text-base 2xl:text-lg pb-3" id="description"></p>
                    </div>
                    :
                    <div id="tab2" class="tab-content p-4">
                      <div class="">
                      <form onSubmit={addReviewHandle} class="w-full border p-[20px]">
                          <p class=" text-base font-semibold md:text-lg 2xl:text-xl pt-2 py-2  capitalize">Add a Review</p>
                          <p class=" text-base md:text-lg 2xl:text-xl pt-2 py-2  capitalize">
                            Your email address will not be published. Required fields are marked *
                          </p>
                          <p class=" text-base md:text-lg 2xl:text-xl pt-2 py-2  capitalize">Your review *</p>
                          <div className="flex gap-[6px] text-xl">{reviewStarIcon}</div>
                          <textarea class=" bg-white outline-none w-full  border border-solid h-[120px] rounded"
                          ref={reviewMessage}
                          ></textarea>
                         
                          <input type="submit" value="submit" class=" px-8 rounded py-2 bg-[#BFA888] uppercase text-base text-white" />
                        </form>
                        <div class="w-[100%] sm:w-[45%]">
                          <h3 class=" text-base md:text-lg lg:text-xl pt-4 py-2  uppercase">Reviews</h3>
                          <p class=" text-base pt-3">These are(328)</p>

                          <div id="review-div">
                            {
                              rewiesArray.map((review)=>[
                                <div className='border-b pb-[5px] py-[40px] w-full'>
                                <div className='flex items-center gap-[4px]'>
                                  <img src={review.userprofileImage || dpimage} alt="" className='w-[50px] h-[50px] rounded-full overflow-hidden' />
                                  <h1 className='font-semibold tracking-tight'>{review.currentUserName}</h1>
                                </div>
                                <div>
                                {Array.from({ length: 5 }, (_, index) => (
          <i
            key={index}
            className={`${
              index < review.rating ? 'fa fa-star ' : 'fa fa-star-o '
            }`}
          ></i>
        ))}

                                </div>
                                <p>{review.message}t.</p>
                              </div>
                              ])
                            }
                          

                          </div>
                        </div>

                      </div>
                    </div>
                    
                    }
                  </div>
                </div>
              </div>
      <div className='flex flex-wrap gap-[40px] items-center justify-center md:mx-[2%] my-[3%]'>
        {
          isRelatedPostLoading?(<LoadingComponent isLoading={isLoading?false:isRelatedPostLoading} />)
          :(slicedRelatedPosts.map((eachPost)=>[
           <ProductPost productid={eachPost._id} title={eachPost.title} price={eachPost.price} isSale={eachPost.salesDiscount} tag={eachPost.tag} ratings={eachPost.rat}/>
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
