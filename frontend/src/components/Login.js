import React, { useEffect } from 'react'
import axios from 'axios';
import '../login.css'
import { Nav,Navbar,Container } from 'react-bootstrap';

import { login } from '../config/Myservice';
import { useNavigate,NavLink } from 'react-router-dom'
import { useRef,useState } from 'react';
export const Login = (props) => {
    const [state,setState]=useState({email:'',password:'',name:'',age:''});
    const[flag,setFlag]=useState(false)
    const navigate=useNavigate()
    const handler=(event)=>{
        const {name,value}=event.target;
        setState({...state,[name]:value})
    }
    const postRegis=(event)=>{
        event.preventDefault();
        login(state)
        .then(res=>{
            if(res.data.err==0){
            localStorage.setItem('_token',res.data.token)
           setFlag(true)
           alert('login successfully')
            }
            if(res.data.err==1){
                console.log(res.data)
            }
        })
    }
  
   return (
        <>
        <header id="header" >
    <img src="./Images/pizzalogo.jpg" width="100px" height="100px" />
    <Navbar  >
        <Container>
        
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto"  >
            <li>  <Nav.Link as={NavLink} to="/" style={{marginLeft:'700px',marginRight:'50px',fontSize:'20px',fontFamily:'bold'}}  >Home</Nav.Link>
           <Nav.Link as={NavLink} to="/signup" style={{marginRight:'50px',fontSize:'20px',fontFamily:'bold'}}  >SignUp</Nav.Link>
           <Nav.Link   style={{fontSize:'20px',fontFamily:'bold',color:'white',marginRight:'10px'}} as={NavLink} to="/login" >SignIn</Nav.Link></li>
                {/* {flag? navigate('/login'):null} */}
            </Nav>
            </Navbar.Collapse>
        </Container>
        </Navbar> 
  
</header>
       <section>
            <div class="center" >
    
                <form method="post" onSubmit={postRegis} >
                  
                    <div class="txt">
                        <input type="text" name="email" placeholder="Enter Email"  onChange={handler} required />
                    </div>
                 
                    
                      <div class="txt">
                        <input type="password" name="pass" placeholder="Enter Password" onChange={handler}  required />
                    </div>
                
                        <button  class="btn">Register</button>
                        {flag? navigate('/'):null}  
                      
                       
                  
                </form>
            </div>
        </section>

     
        
      
            
        </>
    )
}
