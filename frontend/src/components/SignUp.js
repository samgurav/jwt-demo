import React, { useEffect } from 'react'
import axios from 'axios';
import '../login.css'
import { Nav,Navbar,Container } from 'react-bootstrap';

import { addPost, getPosts } from '../config/Myservice';
import { useNavigate,NavLink } from 'react-router-dom'
import { useRef,useState } from 'react';
const regForName = RegExp(/^[A-Za-z]{3,10}$/);
const regForAddresss = RegExp(/^[A-Za-z]{2,50}$/);
const regForEmail = RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
const regForPhone = RegExp(/^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/);
const regForPass = RegExp(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/);

export const SignUp = () => {
    const NameInput = useRef(null);
    const addressInput = useRef(null);
    const emailInput = useRef(null);
    const PhoneInput=useRef(null)
    const PassInput=useRef(null)
    const navigate=useNavigate()
    const[postdata,setpostdata]=useState([])
 
    const[flag,setFlag]=useState(false)
    const [select,setSelect]=useState()
    const [Errors,SetError]=useState({
        name:'',
        email:'',
        address:'',
        phone:'',
        pass:''
      })

      const handler=(e)=>{
        const {name,value}= e.target;
        switch(name){
          case 'name':
            Errors.name= regForName.test(value)?'':' name should be between 2 to 10 letters';
            break;
            case 'phone':
              Errors.phone= regForPhone.test(value)?'':'Phone Number should be valid';
         break;
       
                 case 'email':
                  Errors.email= regForEmail.test(value)?'':'invalid email';
             break;
             case 'address':
                Errors.address= regForAddresss.test(value)?'':'Address  should be between 2 to 50 letters';
                break;
                case 'pass':
                    Errors.pass= regForPass.test(value)?'':'Password must be between 6 to 16 characters and must contain one number and one special character';
                    break;
              
           
          
        }
        setSelect({Errors,[name]:value},()=>{
          console.log(Errors)
        })
        
      }
      const validate=(errors)=>{
        let valid = true;
        Object.values(errors).forEach((val)=> 
            val.length>0 && (valid = false));
            return valid;
            }
  
    useEffect(()=>{
        getPosts()
           .then(res=>{
               console.log(res.data)
               if(res.data.err==0){
                   setpostdata(res.data.pdata)
               }
           }
            )
            
    },[])
    const submit=()=>{
      setFlag(true)
      if(validate(Errors)){
         addPost({name:NameInput.current.value,email:emailInput.current.value,address:addressInput.current.value,phone:PhoneInput.current.value,pass:PassInput.current.value,data:[]})
          .then(res=>{
            if(res.data.err===0){
              setpostdata(res.data.pdata)
            }
          })
   
         alert('data saved')
      
        }
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
    
                <form method="post" onSubmit={submit}>
                    <div class="txt">
                        <input type="text"  placeholder="Enter Name" name='name'  required class="form-control my-1 p-2"ref={NameInput} onChange={handler}/>
                        <span></span>
                    </div>
                    {Errors.name.length>0 &&
                  <span style={{color:"red"}}>{Errors.name}</span>}   
                    <div class="txt">
                        <input type="text" name="email" placeholder="Enter Email" ref={emailInput} onChange={handler} required />
                    </div>
                    {Errors.email.length>0 &&
                  <span style={{color:"red"}}>{Errors.email}</span>} 
                      <div class="txt">
                        <input type="text" name="address" placeholder="Enter Address" ref={addressInput} onChange={handler} required />
                    </div>
                    {Errors.address.length>0 &&
                  <span style={{color:"red"}}>{Errors.address}</span>} 
                      <div class="txt">
                        <input type="text" name="phone" placeholder="Enter Phone Number" ref={PhoneInput} onChange={handler} required />
                    </div>
                    {Errors.phone.length>0 &&
                  <span style={{color:"red"}}>{Errors.phone}</span>} 
                      <div class="txt">
                        <input type="password" name="pass" placeholder="Enter Password" ref={PassInput} onChange={handler} required />
                    </div>
                    {Errors.pass.length>0 &&
                  <span style={{color:"red"}}>{Errors.pass}</span>} 
                        <button  class="btn">Register</button>
                        {flag? navigate('/login'):null}  
                        <div class="signup">Already Member?<a href="http://localhost:3002/login">Login</a>  </div>
                  
                </form>
            </div>
        </section>

     
        
      
            
        </>
    )
}
