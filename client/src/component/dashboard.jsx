import react,{useEffect, useState} from 'react'
import SubmitBtn from './submitbtn'
import axios from 'axios';
import {useNavigate} from "react-router-dom"
import {Link} from "react-router-dom"

function Dashboard() {
  const navigate = useNavigate()
  const [productItems , setProductItem] = useState([])
    const [title ,settitle] = useState('')
    const [islogin ,setislogin] = useState('')
    const [rerenderOnPost , setrerenderOnPost] = useState(false)
    const [rerender , setrerender] = useState(false)
    const [image , setdpimage] = useState(null)
    const [price ,setprice] = useState('')
    const [img , setImg] = useState()
    const [tag ,settag] = useState('')
    const [salesDecsount ,setsalesDecsount] = useState('')
    const [description ,setdescription] = useState('')
    const [ProductsArray , setProductsArray] = useState([])
    const AdmincheckingHandler = async() =>{
        try {
         const res =  await  axios.get("/Admincheck",{
          withCredentials: true,
         })
        .then((res)=>{
          console.log(res)
          setislogin(true)
        })
    
        .catch((e)=>{
          console.log(e)
          navigate('/admin-login')

        })
        console.log(res)
        } catch (error) {
          console.log(error)
          navigate('/admin-login')

        }
      }
    const deleteProductHandler = async(id)=>{
      try {
        const res = await axios.delete(`/delete-product/${id}`)
        console.log(res.data)
        setrerenderOnPost(true)
      } catch (error) {
        console.log(error)
        
      }
    }
    const AddProducthandler = (e)=>{
         e.preventDefault();

        const newAdd = {
            title:title,
            description:description,
            price:price,
            tag:tag
        }

        setProductsArray((ProductsArray)=>[...ProductsArray , newAdd])
        const formdata = new FormData()
        formdata.append('title',title)
        formdata.append('description',description)
        formdata.append('price',price)
        formdata.append('tag',tag)
        formdata.append('salesDecsount',salesDecsount)
        formdata.append('image',img)
        axios.post("/post", formdata , {
            withCredentials: true, 
        })
          .then((res)=>{
            console.log(res)
            setrerenderOnPost(true)
          })
          .catch( (e)=>{
            console.log(e);
      
          })
    }
    const productsHandler = async()=>{

      try {
        const res = await axios.get('/posts')
        console.log(res.data)
        setProductItem((productItems) => [...productItems , res.data])
       setrerender(true)
      } catch (error) {
        console.log(error)
      }
    }
    useEffect(()=>{
      productsHandler()
    },[rerenderOnPost])
    useEffect(()=>{
      console.log(productItems)
    },[productItems])
    useEffect(()=>{
        console.log(ProductsArray)

    },[ProductsArray])
    useEffect(()=>{
        AdmincheckingHandler()
    },[islogin])
    return(
        <div className='flex flex-col items-center gap-[60px]'>
            <div className='max-w-[1000px] w-full p-[40px] bg-[white] border-rounded shadow-xl'>
                <h1 className='text-4xl font-semibold'>Sales</h1>
            </div>
            <div className='max-w-[1000px] w-full p-[40px] bg-[white] border-rounded shadow-xl'>
                <h1 className='text-4xl font-semibold'>Orders done</h1>
            </div>
            <div className='max-w-[1000px] w-full p-[40px] bg-[white] border-rounded shadow-xl'>
                <h1 className='text-4xl font-semibold'>order to Deliver</h1>
            </div>
            <div className='max-w-[1000px] w-full p-[40px] bg-[white] border-rounded shadow-xl'>
                <h1 className='text-4xl font-semibold'>add product</h1>
                <form onSubmit={AddProducthandler}>
                <div className='flex justify-center h-[80px] my-[10px] w-[40px]'>
                    <img className=' w-full' src={image} alt=""onClick={(e)=>{
                      document.getElementById("inputimage").click()
}} />
                    <input type="file" id='inputimage' hidden onChange={(e)=>{
                      setdpimage(URL.createObjectURL(e.target.files[0]))
                      setImg(e.target.files[0])
                    }

                    }
                    
                     />
                </div>
                <input type="text" value={title} 
                    onChange={(e)=>{settitle(e.target.value)}} placeholder='title....'/>
                     <input type="text" value={price} 
                    onChange={(e)=>{setprice(e.target.value)}} placeholder='price'/>
                     <input type="text" value={salesDecsount} 
                    onChange={(e)=>{setsalesDecsount(e.target.value)}} placeholder='salesdiscount in percentage'/>

                     <input type="text" value={description} 
                    onChange={(e)=>{setdescription(e.target.value)}} placeholder='description'/>
                    <select name="tag" id=""
                    value={tag}
                    onChange={(e)=>{
                        settag(e.target.value)
                    }}
                    >
                        <option value="" selected>Not choosen</option>
                        <option value="Men">Men</option>
                        <option value="children">Children</option>
                        <option value="women">Women</option>
                    </select>
                    <SubmitBtn value="add new Product" valueOnUpload="addingg" Requirments={[title , description , tag , price]} />
                </form>
            </div>
            <div className='max-w-[1000px] w-full p-[40px] bg-[white]'>
                <h1 className='text-4xl font-semibold'>products</h1>
                <table className="w-full border-collapse border border-gray-300 px-[20px]">
        <thead>
          <tr className="bg-gray-100">
            <th className='w-[100px]'></th>
            <th className="p-2">Product</th>
            <th className="p-2">Price</th>
            <th className="p-2"></th>
          </tr>
        </thead>
        <tbody className=''>



        {
  productItems.length > 0 && 
  productItems.map((item) => (
    <tr key={item._id} className='text-center border-b border-gray-500 my-[40px]'>
      <Link to={`/product/${item._id}`}>
        <td className='w-[100px]'>
          {/* <img src={item.img} alt="" /> */}
        </td>
      </Link>
      <td className="p-2">{item.title}</td>
      <td className="p-2">${item.price}</td>
      <td className="p-2">
        <i className='bi bi-three-dots-vertical' onClick={() => deleteProductHandler(item._id)}></i>
      </td>
    </tr>
  ))
}
        </tbody>
      </table>
            </div>
        </div>
    )
}

export default Dashboard