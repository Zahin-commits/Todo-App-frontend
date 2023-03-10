import React, { useEffect, useState } from 'react';
import {Navigate,useNavigate } from 'react-router-dom';
import {BiLogOut,BiTrash,BiPlus} from 'react-icons/bi'
export const Home = () => {
  const navigate = useNavigate();
   const [auth,setAuth] = useState();
 const [todos,setTodos] = useState([]);
 const [popupActive, setPopupActive] = useState(false);
 const [logoutPopup, setLogoutPopup] = useState(false);
 const [newTodo, setNewTodo] = useState("");
 const api = 'https://todoappbackend-iqk3.onrender.com';
   useEffect(()=>{(
      async()=>{
         const res = await fetch(`${api}/auth/isLoggedIn`,{
          credentials: 'include'
        });
         const data = await res.json()
        setAuth(data)
      }
     )()
     getTodos()
   },[])

/*  const auth = async()=>{
   const res = await fetch('/api/auth/isLoggedIn');
   const data = await res.json()
   return data
 } */
  
 
   console.log(auth)

 const getTodos = async()=>{
  const res = await fetch(`${api}/task`,{
    credentials: 'include'
  });
  const data = await res.json();
  console.log(data)
  setTodos(data)
 /*  setTodos(await res.json()); */
 };

 const addNewTodo = async()=>{  
   const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        title:newTodo
       })
    };
    const res = await fetch(`${api}/task/new`, requestOptions);

    const data = await res.json();
    setTodos([...todos,data]);
    setPopupActive(false)
    setNewTodo('')
 };

 const completeTodo =async(id)=>{
 const res = await fetch(`${api}/task/complete/${id}`);

 const data = await res.json();

 setTodos(todos=> todos.map(todo =>{
   if(todo._id===data._id){
    todo.completed = data.completed;
   }
   return todo
  }))
 }

 const deleteTodo = async(id)=>{
   const res = await fetch(`${api}/task/delete/${id}`, {method:'DELETE'});
   const data =await res.json();

   setTodos(todos=> todos.filter(todo=> todo._id !== data._id));  
 };

 const logout = async()=>{
 const res = await fetch(`${api}/auth/logout`);

 const data = await res;
 console.log(data.status)
 if(data.status == 200) navigate('/register');
 }

 if(auth === undefined){
 return 'LOADDING...'
 }

/*  useEffect(()=>{
 getTodos()
 },[]) */

 

 return auth === true ? 
  (  <div id='container'>
        <h1>TODO LIST</h1>

 <p>Your Tasks</p>

<button className='logout_btn' onClick={()=>setLogoutPopup(true)} ><BiLogOut/></button>   
  <div className="todolist">
  { 
 
 todos.map(todo=>(
   <div className={"todo " + (todo.completed? 'completeTodo': '')} key={todo._id}>
      <button className='checkbox' onClick={()=>completeTodo(todo._id)}></button>
    <p className='text'>{todo.title}</p>
    <button className='delete_todo' onClick={()=>deleteTodo(todo._id)} ><BiTrash/></button>
    </div>
 ))
}  </div> 

<button className='plus_btn' onClick={()=>setPopupActive(true)}><BiPlus/></button>

{popupActive? <div className='popup'>
   <button className="closePopup" onClick={()=>setPopupActive(false)} ><BiPlus/></button>

   <div className="content">
   <h3>ADD TASK</h3>
    <input className="add-todo-input" type="text" onChange={(e)=> setNewTodo(e.target.value)} value={newTodo} />
    <button className="button" onClick={addNewTodo} >Create Task</button>
 </div>
   </div> : ''
   }


{logoutPopup? <div className='popup logoutPopup'>
   <button className="closePopup" onClick={()=>setLogoutPopup(false)} ><BiPlus/></button>

   <div className="content">
   <h3>ARE YOU SURE YOU WANT TO LOGOUT?</h3>
    <button className="button" onClick={logout} >Logout</button>
 </div>
   </div> : ''
   }
    </div>)
 : <Navigate to='/register'/>
}