import react , {useEffect, useState} from "react"
import axios from 'axios';
import {useNavigate} from "react-router-dom"
// import UseToken from './token.jsx'
import SubmitBtn from "./submitbtn.js";


function Adminlogin (){
  const navigate = useNavigate()
    const [ email , setEmail] = useState("")
    const [islogin , setislogin] = useState(false)
    const [ password , setpassword] = useState("")
    const [ checkToken , setcheckToken] = useState("")
    const [ serverMessege , setServerMessege] = useState("")
    const [isPosting , setisPosting] = useState(false)
    const usercheckHandler = async() =>{
      try {
       const res =  await  axios.get("https://tame-teal-sockeye-fez.cyclic.app/Admincheck",{
        withCredentials: true,
       })
      .then((res)=>{
        console.log(res)
        setislogin(true)
        navigate('/dashboard')
      })
  
      .catch((e)=>{
        console.log(e)
      })
      console.log(res)
      } catch (error) {
        console.log(error)
      }
    }
    useEffect(()=>{
      usercheckHandler()
    },[islogin])
    const login = async(e)=>{
      e.preventDefault()
      setisPosting(true)

     await axios.post("https://tame-teal-sockeye-fez.cyclic.app/Adminlogin",{
        email:email,
        password:password
      },{
         withCredentials: true,
      })
      .then((res)=>{
          //  localStorage.setItem("Token", res.data)
    setisPosting(false)

       setServerMessege("you are login now")
       navigate('/dashboard')

      })
      .catch((e)=>{
    setisPosting(false)

        // setServerMessege(e)
        console.log(e)
      })
      
    }
   const logoutFunction =async(e)=>{
    e.preventDefault()
      await axios.get("https://tame-teal-sockeye-fez.cyclic.app/logout",{
        withCredentials: true,
     })
    .then((res)=>{console.log(res.data)
    setServerMessege(res.data)
  

    })
    .catch((e)=>{console.log(e)
      setServerMessege(e.response.data)
    })
  }

  useEffect(()=>{

  },[serverMessege])
    return(
     
        <div className="flex w-full flex-col items-center">
         
           
                <>
                <form onSubmit={login} className='my-10 shadow-[0px_0px_5px_#00000042] rounded-md px-[50px] py-[20px] w-full max-w-[700px]'
              
              >
                          <div className="flex"> <h1 className='font-semibold text-4xl my-8'>Admin login <i className="fa fa-lock"></i></h1></div>
     
                          <input className='my-[10px] w-full px-3 py-2 border-[3px] rounded-lg border-violet-300 outline-none' type="text" placeholder='heading..'
                value={email}
                onChange={
                  (e)=>{
                    setEmail(e.target.value)
                  }
                } />
     
     <input className='my-[10px] w-full px-3 py-2 border-[3px] rounded-lg border-violet-300 outline-none' type="text" placeholder='heading..'
                value={password}
                onChange={
                  (e)=>{
                    setpassword(e.target.value)
                  }
                } />
     
      
        <SubmitBtn value='Admin Only' valueOnUpload="LoggingIn..." Requirments={[email , password]} isProcessing={isPosting} />
         
            
              </form>
              <div className="text-center text-red font-semibold" >
                {serverMessege}
              </div></>
                  
             
        </div>
    )
}

export default Adminlogin;