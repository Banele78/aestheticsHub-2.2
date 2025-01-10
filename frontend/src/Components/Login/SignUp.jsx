import React, { useState } from 'react'

import {Formik, Form, Field, ErrorMessage, validateYupSchema} from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {axiosInstance} from '../../helper/axiosConfig';

function SignUp() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState(''); 

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const initialValues={
    name:"",
    lastName:"",
    email:"",
    password:"",
    cPassword:"",
  };

  const validationSchema=Yup.object().shape({     
   name:Yup.string().min(3).max(15).required("Name is required"),

    lastName:Yup.string().min(3).max(15).required("Last name is required"),
    
    email: Yup.string()
      .email('Invalid email address') // Email validation
      .required('Email is required'),

      password: Yup.string()
      .min(3, 'Password must be at least 3 characters')
      .max(15, 'Password cannot exceed 15 characters')
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{3,}$/, 'Password must include uppercase, lowercase, and a number')
      .required('Password is required'),

      cPassword: Yup.string()
      .oneOf([Yup.ref('password')], 'Passwords must match')
      .required('Confirm password is required'),
  });

const onSubmit = async (data, { resetForm }) => {
  try {
    const response = await axiosInstance.post('/register', data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    navigate('/login');
    setErrorMessage('');
    resetForm(); // Reset form after successful submission
  } catch (error) {
    if(error.response.status ==409)
    setErrorMessage(error.response.data);
  }
};

  return (
    <div>
        <div className='nav'>
        <img src="Group 20.png" className="logo"/>
        </div>

        <div className="bd sign">

          <h1>Sign Up</h1>

          <p>Please fill in this form to create an account!</p>

          <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema} >

          <Form>
          <div className="field name">
  {/* First Name Field */}
  <div >
    <ErrorMessage name="name" component="span" className="error"/>
    <Field type="text" name="name" placeholder="First Name" />
  </div>

  {/* Last Name Field */}
  <div >
    <ErrorMessage name="lastName" component="span" className="error"/>
    <Field type="text" name="lastName" placeholder="Last Name" />
  </div>
</div>
    
            <div className="field">
              {errorMessage ? <span className='error'>{errorMessage}</span>
              
            :
            <ErrorMessage name="email" component="span" className='error'/>
            }
            
            <Field type="text" name="email" placeholder='Email or Phone number'/>
            </div>

            <div className="field ">
            <ErrorMessage name="password" component="span"  className='error'/>
            <Field   type={showPassword ? 'text' : 'password'} name="password" placeholder='Password'  />
            <span
        onClick={togglePasswordVisibility}
        style={{ cursor: 'pointer' }}
      >
       
        </span>
            </div>

            <div className="field">
            <ErrorMessage name="cPassword" component="span"  className='error'/>
            <Field type="password" name="cPassword" placeholder='Conform Password'/>
            </div>

            <div className="checkbox-container">
    <input type="checkbox" id="customCheckbox"/>
    <label className="custom-checkbox" htmlFor="customCheckbox"></label>
    <label > I accept the <span className="Register">Terms of Use & Privacy Policy</span>.</label>
</div>


<div className="field button-container">
          <button type="submit" >Sign up</button>
            </div>

            </Form>
            </Formik>
          
        </div>
    </div>
  )
}

export default SignUp
