import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from "../img/image-removebg 1.png"
import axios from 'axios';
import imgholder  from "../img/imgholder.jpg"

function Navcomponent({islogin , img}) {
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
      <nav className='flex items-center justify-between px-[3%] py-[30px] bg-[#0000001c]'>
        <div className='flex items-center '>
            <div>
                <img className='w-[90%]' src={logo} alt="" />
            </div>
            <ul className='flex items-center  gap-[30px] font-semibold text-white text-[18px]'>
                <li className=''><Link to="/Store">EVERYTHING</Link></li>
                <li className=''><Link>WOMEN</Link></li>
                <li className=''><Link>MEN</Link></li>
                <li className=''><Link>ACCESSORIES</Link></li>
            </ul>
        </div>
        <div>
<ul className='flex items-center gap-[30px] font-semibold text-white text-[18px]'>
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


</ul>
        </div>
      </nav>
    )
}

export default Navcomponent