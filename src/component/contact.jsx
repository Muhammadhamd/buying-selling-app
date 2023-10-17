import react, { useEffect, useState } from "react"
import css from '../css/contact.css'
import axios from "axios"

import Navcomponent from "./navbar"
function ContactComponent (){
    const [islogin , setislogin] = useState(null)
    const [userdata ,setuserdata] =useState([])
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
      useEffect(()=>{
        userLoginCheckHandler()
      },[])
    return(
        <div>
              <div className=" relative bgimg">
              <Navcomponent islogin={islogin} img={userdata.image}/>

        <div className="about-overlay"></div>
       <div className="h-[100%] w-[100%] flex justify-center items-center">
       <h1 className="text-7xl font-semibold text-white mb-[130px] max-[480px]:text-5xl  max-[400px]:text-4xl">Contact Us</h1>
       </div>
        </div>
        <div className="bg-[#f5f7f9] flex flex-col items-center pt-[80px]">
            <h3 className="font-semibold text-xl max-[340px]:text-base">Have any queries?</h3>
            <h1 className="font-semibold text-5xl max-[340px]:text-3xl max-[440px]:text-4xl">We're here to help.​</h1>
            <div className="bg-black w-[50px] h-[2px] my-[20px]"></div>
            <div className="flex flex-wrap w-full gap-[20px] justify-center">
                <div className="bg-white  max-[310px]:w-[90%] rounded-lg shadow flex flex-col items-center max-w-[300px] p-[15px] gap-[16px]">
                    <h1 className="text-2xl font-semibold mt-[14px]" >Complaints</h1>
                    <p className="text-center leading-[1.5rem]">Vestibulum ante ipsum primis in faucibus orci luctus.</p>
                    <h2 className="text-[#0084d6] font-semibold text-xl">+92 3251452080</h2>
                </div>
                <div className="bg-white  max-[310px]:w-[90%] rounded-lg shadow flex flex-col items-center max-w-[300px] p-[15px] gap-[16px]">
                    <h1 className="text-2xl font-semibold mt-[14px]" >Complaints</h1>
                    <p className="text-center leading-[1.5rem]">Vestibulum ante ipsum primis in faucibus orci luctus.</p>
                    <h2 className="text-[#0084d6] font-semibold text-xl">+92 3251452080</h2>
                </div>
                 <div className="bg-white max-[310px]:w-[90%] rounded-lg shadow flex flex-col items-center max-w-[300px] p-[15px] gap-[16px]">
                    <h1 className="text-2xl font-semibold mt-[14px]" >Complaints</h1>
                    <p className="text-center leading-[1.5rem]">Vestibulum ante ipsum primis in faucibus orci luctus.</p>
                    <h2 className="text-[#0084d6] font-semibold text-xl">+92 3251452080</h2>
                </div>
                <div className="bg-white  max-[310px]:w-[90%] rounded-lg shadow flex flex-col items-center max-w-[300px] p-[15px] gap-[16px]">
                    <h1 className="text-2xl font-semibold mt-[14px]" >Complaints</h1>
                    <p className="text-center leading-[1.5rem]">Vestibulum ante ipsum primis in faucibus orci luctus.</p>
                    <h2 className="text-[#0084d6] font-semibold text-xl">+92 3251452080</h2>
                </div>
                
            </div>
            <div className="flex max-[1000px]:flex-col  min-[1000px]:px-[40px] max-[1000px]:items-center min-[1000px]:justfy-center gap-[40px] min-[1000px]:gap-[50px] min-[950px]:gap-[60px] min-[1000px]:gap-[80px] mt-[60px]">
                <div className="max-w-[500px] max-[510px]:w-[80%] flex flex-col justify-center min-[1000px]:h-[400px]">
                    <h4 className="font-semibold text-sm">Don't be a stranger!</h4>
                    <h1 className="font-semibold text-5xl max-[480px]:text-4xl max-[340px]:text-3xl">You tell us. We listen.</h1>
                    <p className="text-slate-700 leading-[1.5rem] mt-[50px]">Cras elementum finibus lacus nec lacinia. Quisque non convallis nisl, eu condimentum sem. Proin dignissim libero lacus, ut eleifend magna vehicula et. Nam mattis est sed tellus.</p>
                </div>
                <form className="bg-white rounded-lg  py-[20px] px-[40px] max-w-[600px] w-full ">
                    <input type="text" placeholder="Name" className="border rounded w-full px-6 py-3 mt-[20px] text-[18px]" />
                    <input type="text" placeholder="Subject" className="border rounded w-full px-6 py-3 mt-[20px] text-[18px]" />
                    <input type="text" placeholder="Email" className="border rounded w-full px-6 py-3 mt-[20px] text-[18px]" />
                    <textarea name="" id="" rows="5" placeholder="Message" className="border rounded w-full px-6 py-3 mt-[20px] text-[18px]"></textarea>
                    <button className="px-6 py-3 bg-[#0084d6] text-white font-semibold text-sm my-2">SEND MESSAGE</button>
                 </form>
            </div>
        </div>
        </div>
    )
}

export default ContactComponent