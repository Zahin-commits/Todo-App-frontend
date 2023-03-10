import React from 'react'
import { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import {CiUser,CiLock,CiMail} from 'react-icons/ci'
import {BiLogIn} from 'react-icons/bi'
export const Register = () => { 
 const navigate = useNavigate();
 const [user,setUser] = useState('');
 const [email,setEmail] = useState('');
 const [password,setPassword] = useState('');

const postRegister =async ()=>{
    const res = await fetch(`http://localhost:3000/auth/register`,{method:'POST',
    headers:{
     'Content-Type':"application/json"
    },
    body:JSON.stringify({
        name:user,
        email:email,
        password:password
    })
    })
 const data = await res;
console.log(data.status)
 if(data.status === 201) navigate('/login')
}
 return (
    <div id='register'>
        <h1>Sign in</h1>
        <p>plan your day to day tasks in<br/> an organized way</p>
   <div className='register_form'>
    
    <div className='input-box'>
        <CiUser/>
<input id='name' placeholder='Name' className='input' type="text" onChange={(e)=>setUser(e.target.value)} value={user} />
    </div>
  
    <div className='input-box'>
        <CiMail/>
<input id='email' placeholder='Email' className='input' type="email" onChange={(e)=>setEmail(e.target.value)} value={email}/>
    </div>
  
    <div className='input-box'>
        <CiLock/>
<input id='password' placeholder='Password' className='input' type="text" onChange={(e)=>setPassword(e.target.value)} value={password}/>
    </div>
             
     <button className='signin_btn' onClick={postRegister}>Sign In <BiLogIn/></button>
   </div>

   <span>Already have an account?  <Link to={'/login'}>login</Link></span>
    </div>
  )
}