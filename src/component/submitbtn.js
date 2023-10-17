

function SubmitBtn({isProcessing  , valueOnUpload, value , Requirments ,edit}){

  let Inputs;

  
   Inputs = Requirments.some((value)=>  value.trim() === '')
   


 const isAnyEmpty = Inputs

    return(

        
          <input type="submit" value={isProcessing?valueOnUpload:value} 
          disabled={isAnyEmpty || isProcessing} 
           className={`px-4 py-2 rounded shadow my-3 text-white font-bold ${
            isAnyEmpty || isProcessing ? 'bg-violet-300' : 'bg-violet-500'
          } ${edit}`}
          />
        
    )
}
export default SubmitBtn