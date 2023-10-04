import react, { useRef, useState } from 'react'
import Navcomponent from './navbar'

import axios from 'axios'
function UserRegister(){

    const [image , setdpimage] = useState(null)
    const passwordref = useRef(null)
    const emailref = useRef(null)
    const nameref = useRef(null)

    const submitHandler = async(e)=>{
        e.preventDefault();
console.log('eee')
        try {
          const response = await axios.post(
            'http://localhost:2344/userregister',
            {
              email: emailref.current.value,
              password: passwordref.current.value,
              name: nameref.current.value,
            },
            {
              withCredentials: true, // Use withCredentials instead of withCredential
            }
          )
          .then((res)=>{
            console.log(res)
          })
          .catch((e)=>{
            console.log(e)
          })
    
          // Handle response as needed
          console.log(response);
        } catch (error) {
          // Handle errors
          console.error(error);
        }
      };
    return(
        <>
        <Navcomponent />
        <div className='w-full flex flex-col items-center'>
        <h1 className='font-bold text-6xl my-[20px]'>Register</h1>

            <form onSubmit={submitHandler} className='max-w-[600px] w-full  shadow p-[20px]'>
                <div className='flex justify-center h-[60px] my-[10px]'>
                    <img src={image} alt="" />
                </div>
                <input type="text"  className='px-4 py-3 rounded border w-full my-[7px] '
                
                ref={nameref}
                
                />
                <input type="email"  className='px-4 py-3 rounded border w-full my-[7px] '
               
                ref={emailref}
                
                />
                <input type="password"  className='px-4 py-3 rounded border w-full my-[7px] '
                ref={passwordref}
                />
                <input type="submit" value="login" className='bg-violet-500 rounded shadow px-5 py-3 text-white font-semibold' />

            </form>
        </div>
        </>
    )
}
export default UserRegister