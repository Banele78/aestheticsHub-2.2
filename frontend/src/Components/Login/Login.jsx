import React, { useContext, useState } from 'react'
import "./Login.css"

import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import {Formik, Form, Field, ErrorMessage, validateYupSchema} from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { UserProfileContext } from '../../helper/UserProfileContext';

function Login() {
  const navigate = useNavigate();
  const [emailError, setEmailError] = useState();
  const [passwordError, setPasswordError] = useState();

  const {setIsAuthenticated } = useContext(UserProfileContext);

  const handleNavigation = () => {
    navigate('/signup'); 
  };

  const initialValues={
    email:"",
    password:"",
  };

  const validationSchema=Yup.object().shape({     
    email: Yup.string()
      .email('Invalid email address') // Email validation
      .required('Email is required'),
      password: Yup.string().required('Wrong password'),
  });

  const onSubmit = async (data, { resetForm }) => {
    try {
      const response = await axios.post('http://localhost:8080/api/login', data, {
        headers: {
          'Content-Type': 'application/json',
          
        },
        withCredentials: true,
       
      });
      navigate('/');
      setEmailError('');
      setPasswordError(' ');
      if(response.status ==200){
        setIsAuthenticated(true);
      }
     console.log(response.data);
    
      resetForm(); // Reset form after successful submission
    } catch (error) {
      //if(error.response.status ==409)
      //setErrorMessage(error.response.data);
      if(error.response.status == 404)
      setEmailError(error.response.data);
      setIsAuthenticated(false);

      if(error.response.status == 401)
        setPasswordError(error.response.data);
    }
  };

  return (
    <div>
       
        <div className='nav'>
        <img src="Group 20.png" className="logo"/>
        </div>

        <div className="bd">

          <h1>Welcome back!</h1>
 <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema} >
          <Form>
            <div className="field">
              {emailError && <span className='error'> {emailError}</span>}
            <ErrorMessage name="email" component="span" className="error"/><br/>
            <Field type="text" name="email" placeholder='Username'/>
            </div>
           
            <div className="field">
            {passwordError && <span className='error'> {passwordError}</span>}
            <ErrorMessage name="password" component="span" className="error"/><br/>
            <Field type="text" name="password" placeholder='Password'/>
            </div>

           
            <label className="checkbox-container">
  <input type="checkbox"/>
  <span className="custom-checkbox"></span> Remember me!
</label>
            <div className="field">
          <button type="submit" >Log in</button>
            </div>

           
          </Form>
          </Formik>

          <p>Don't have an account ? <span onClick={handleNavigation}className="Register">Register</span></p>
        </div>
      
    </div>
  )
}

export default Login
