// src/useToken.js
import { useState, useEffect } from 'react';
import axios from 'axios';

function UseToken(){
  const [token, setToken] = useState(null);

  useEffect(() => {
    // Fetch the token when the component mounts
      axios
      .get("https://tame-teal-sockeye-fez.cyclic.app/token",{
        withCredentials: true,
      })
      .then((res) => {
        setToken(res.data.Tokenis);
        console.log("token state is",token);
      })
      .catch((e) => {
        console.log(e);
      });

      
  },[token]);

  return token

};

export default UseToken;
