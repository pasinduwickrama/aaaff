import React, { useState } from 'react'
import {BiRegistered } from "react-icons/bi";
import { Link,useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { SET_LOGIN, SET_NAME } from "../../redux/features/auth/authSlice";
import { registerUser, validateEmail } from "../../services/authService";

import { toast } from "react-toastify"


const initialState = {
    name: "",
    email: "",
    password: "",
    password2: "",
  };


const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setformData] = useState(initialState);
  const { name, email, password, password2 } = formData;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setformData({ ...formData, [name]: value });
  };

  const register = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      return toast.error("All fields are required");
    }
    if (password.length < 6) {
      return toast.error("Passwords must be up to 6 characters");
    }
    if (!validateEmail(email)) {
      return toast.error("Please enter a valid email");
    }
    if (password !== password2) {
      return toast.error("Passwords do not match");
    }

    const userData = {
      name,
      email,
      password,
    };
    setIsLoading(true);
    try {
      const data = await registerUser(userData);
      // console.log(data);
      await dispatch(SET_LOGIN(true));
      await dispatch(SET_NAME(data.name));
      navigate("/home");
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  return (
    <div className='login-body'>
   
        <div className='logi-card'>

            <div className='logo-lo'>
           <div>
           <BiRegistered size={55} color="rgb(243, 252, 212)" /> 
           Register
           </div>
            </div>
            
            <form onSubmit={register} >

            <input
              type="text"
              placeholder="Name"
              required
              name="name"
              value={name}
              onChange={handleInputChange}
           
            />
            <input
              type="email"
              placeholder="Email"
              required
              name="email"
              value={email}
              onChange={handleInputChange}
            />
            <input
              type="password"
              placeholder="Password"
              required
              name="password"
              value={password}
              onChange={handleInputChange}
            />
            <input
              type="password"
              placeholder="Confirm Password"
              required
              name="password2"
              value={password2}
              onChange={handleInputChange}
            />
           
                 <button type="submit" className='btn-log'>   Register</button>

            </form>
            <span className='rig-word'>
            
            <p> &nbsp; Don't have an account?  <Link to="/">Login</Link> &nbsp;</p>
           
          </span>
        </div>
      
    </div>
  )
}

export default Register
