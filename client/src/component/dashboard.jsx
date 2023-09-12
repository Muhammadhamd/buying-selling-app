import react,{useEffect, useState} from 'react'
import SubmitBtn from './submitbtn'
import axios from 'axios';


function Dashboard() {
    const [title ,settitle] = useState('')
    const [price ,setprice] = useState('')
    const [tag ,settag] = useState('')
    const [salesDecsount ,setsalesDecsount] = useState('')
    const [description ,setdescription] = useState('')
    const [ProductsArray , setProductsArray] = useState([])

    
    const AddProducthandler = (e)=>{
        e.preventDefault();

        const newAdd = {
            title:title,
            description:description,
            price:price,
            tag:tag
        }

        setProductsArray((ProductsArray)=>[...ProductsArray , newAdd])

        axios.post("http://localhost:2344/post", {
            title:title,
            description:description,
            price:price,
            tag:tag,
            salesDecsount:salesDecsount
          })
          .then((res)=>{
            console.log(res)
          })
          .catch( (e)=>{
            console.log(e);
      
          })
    }
    useEffect(()=>{
        console.log(ProductsArray)

    },[ProductsArray])
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
        </div>
    )
}

export default Dashboard