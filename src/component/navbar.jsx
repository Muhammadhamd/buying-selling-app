import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from "../img/image-removebg 1.png"
import logodark from "../img/logo@2x.png"

import axios from 'axios';
import imgholder  from "../img/imgholder.jpg"
import css from "../css/Navcomponent.css"
function Navcomponent({islogin , img  ,changeCss}) {

  const [isResponsiveNavOpen ,setisResponsiveNavOpen] =useState(false)
  // const [isLogin , setIslogin] = useState(false)
// const userlogincheckhnadler = async() =>{

//   try {
//     const res = await axios.get("http://localhost:2344/currentuser",{
//       withCredentials: true,
//     })
//     .then((res)=>{
//       setIslogin(true)
//     })
//     .catch((e)=>{
//       console.log(e)
//     })
//     console.log(res)
//   } catch (error) {
//     console.log(error)
//   }
// }

// useEffect(()=>{
//   userlogincheckhnadler()
// },[isLogin])

    return (
      <nav className={`flex items-center justify-between px-[3%] py-[30px] ${changeCss ? "bg-white text-black" : ' bg-[#0000001c] text-white'}`}>
        <div className='flex items-center '>
            <div>
              <Link to='/'>
              {changeCss ? 
                <img className='w-[90%]' src={logodark} alt="" />
              :
              <img className='w-[90%]' src={logo} alt="" />

            }

              </Link>
             
            </div>
            <ul className='flex items-center  gap-[30px] text-[17px] right-ul'>
                <li className=''><Link to="/Store" className='hover:text-violet-500'>EVERYTHING</Link></li>
                <li className='max-[600px]:hidden'><Link to='/Store/Women' className='hover:text-violet-500'>WOMEN</Link></li>
                <li className='max-[650px]:hidden'><Link to='/store/Men' className='hover:text-violet-500'>MEN</Link></li>
                <li className='max-[700px]:hidden'><Link to="/store/Children" className='hover:text-violet-500'>CHILDREN</Link></li>
            </ul>
        </div>
        <div className='leftul'>
<ul className='flex items-center gap-[30px]  text-[17px]'>
<li className=''><Link to='/About' className='hover:text-violet-500'>ABOUR</Link></li>
<li className=''><Link to='/contact' className='hover:text-violet-500'>CONTACT</Link></li>
{ islogin ?
  (<>
  <li className='text-[20px]'><Link to='/cart' className='hover:text-violet-500'><i className='fa fa-cart-plus'></i></Link></li>
  <Link to='/profile'>
  <div className='w-[70px] h-[70px] overflow-hidden rounded-full'>
  <img src={img || imgholder} className='' alt="" />
  </div>
  </Link>
  </>)
:
(
  <>
  <li className=''><Link to='/register' className='text-violet-500'>Signup</Link></li>
<li className=''><Link to="/login" className='text-violet-500'>login</Link></li></>
)
}


</ul>
        </div>
        <div className='min-[1100px]:hidden block' >
        <i className={`text-xl hover:text-violet-500 fa ${isResponsiveNavOpen ? 'fa-times' : 'fa-bars'}`}
        onClick={(e)=>{
          isResponsiveNavOpen ? setisResponsiveNavOpen(false) :  setisResponsiveNavOpen(true) 
        }}
        ></i>
      
        </div>
      { isResponsiveNavOpen &&  <ul className=' min-[1100px]:hidden flex text-black z-[100] fixed bg-white p-[20px] shadow flex-col items-center gap-[30px] font-semibold top-[0px] right-[0px] w-[100%] min-[700px]:w-[500px] text-[18px] ulis'>

        <div className='relative w-full'><i className='absolute top-[3px] l-[3px] fa fa-times'
        onClick={(e)=>{
         setisResponsiveNavOpen(false)
        }}
        ></i></div>
        <li className='max-[600px]:block hidden'><Link to='/Store/Women'>WOMEN</Link></li>
                <li className='max-[650px]:block hidden'><Link to='/Store/Men' >MEN</Link></li>
                <li className='max-[700px]:block hidden'><Link to='/Store/Children'>CHILDREN</Link></li>
<li className=''><Link>ABOUR</Link></li>
<li className=''><Link>CONTACT</Link></li>
{ islogin ?
  (<>
  <li className='text-[20px]'><Link to='/cart'><i className='fa fa-cart-plus'></i></Link></li>
  <Link to='/profile'>
  <div className='w-[70px] h-[70px] overflow-hidden rounded-full'>
  <img src={img || imgholder} className='' alt="" />
  </div>
  </Link>
  </>)
:
(
  <>
  <li className=''><Link to='/register'>Signup</Link></li>
<li className=''><Link to="/login">login</Link></li></>
)
}


</ul>}
      </nav>
    )
}

export default Navcomponent 