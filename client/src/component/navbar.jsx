import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from "../img/image-removebg 1.png"
import axios from 'axios';


function Navcomponent() {




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
<li className=''><Link>CR</Link></li>
<li className=''><Link to="/dashboard">ACC</Link></li>

</ul>
        </div>
      </nav>
    )
}

export default Navcomponent