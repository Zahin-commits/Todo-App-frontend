import React from 'react'
import { useState } from 'react';
import {Link, useNavigate } from 'react-router-dom';
import {CiLock,CiMail} from 'react-icons/ci'
import {BiLogIn} from 'react-icons/bi'
 
/**/
export const Login = () => { 
 const navigate = useNavigate();
 /* const [name,setName] = useState(''); */
 const [email,setEmail] = useState('');
 const [password,setPassword] = useState('');

const postLogin =async (e)=>{
 e.preventDefault()
/* login({name,email,password}); */
 
const requestOptions = {
 method: 'POST',
 headers: { 'Content-Type': 'application/json' },
 body: JSON.stringify({ 
  /*  name, */
   email,
   password })
};
//const res = await fetch('/api/auth/login', requestOptions);
const res = await fetch('http://localhost:3000/auth/login', requestOptions);

const resdata = await res;
console.log(resdata.status)

if(resdata.status == 202){
 navigate('/')
}else(
console.log('something went wrong')
)

/*    try { 
    axios.defaults.withCredentials = true; 
    await axios.post('/api/auth/login', {
      name:user,
      email:email,
      password:password
    }, { withCredentials: true });
   } catch (error) {
    console.log(error)
   } */
}
 return (
    <div id='login'>
        <h1>Welcome Back</h1>
        <p>Please Enter Your Email And Password <br /> to login</p>
        <form id='login_form' onSubmit={postLogin}>

       <div className="input-box">
        <CiMail/>
        <input className='input' type="email" placeholder='Emial' onChange={(e)=>setEmail(e.target.value)} value={email}/>
       </div>

       <div className="input-box">
        <CiLock/>
        <input className='input' type="text" placeholder='Password'onChange={(e)=>setPassword(e.target.value)} value={password}/>
       </div>
     <button className='login_btn' type="submit">Login <BiLogIn/></button>
     </form>
     
     <span>don't have an accout?<Link to={'/register'}> sign in</Link></span>
    </div>
  )
}