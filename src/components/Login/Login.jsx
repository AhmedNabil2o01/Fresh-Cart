import React, { useContext, useState } from 'react'
import stayle from './Login.module.css'
import { ErrorMessage, useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { useNavigate } from 'react-router'
import { UserContext } from '../Context/UserContext'
import { Link } from 'react-router-dom'
export default function Login() {   
    let {setUserToken} =useContext(UserContext);
    let Navigate= useNavigate();
    let [errMessage, setErrMessage] = useState(""); 
    let [loading, setLoading] = useState(true)
    let validationSchema = Yup.object({
        email: Yup.string().email('email is invalid').required('email is required'),
        password: Yup.string().required('password is required'),
    })

async function LoginForme(value) {
    setLoading(false)
    let req = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin', value).catch(function (err) {
        setErrMessage(err.response.data.message);
        setLoading(true);  
    })
    if (req?.data.message === 'success') {
        setLoading(true)
        localStorage.setItem('userToken',req.data.token)
        setUserToken(req.data.token)
        Navigate('/home')

    }
    console.log(req);    
   
    }
    let formik = useFormik({
        initialValues: {
          
            email: '',
            password: ''
        }, validationSchema,
        onSubmit: LoginForme
    })

    return <>
        <h2>Login Now...........</h2>
        {errMessage !== "" ? <div className="alert alert-danger">{errMessage}</div> : ""}

        <form onSubmit={formik.handleSubmit}>
          
            <div>
                <label htmlFor="email">Email</label>
                <input onBlur={formik.handleBlur} onChange={formik.handleChange} name='email' className='mb-3 form-control' type="email" id='email' />
                {(formik.errors.email && formik.touched.email) ? <div className="alert alert-danger">
                    {formik.errors.email}
                </div> : ''}
            </div>

            <div>
                <label htmlFor="password">Password</label>
                <input onBlur={formik.handleBlur} onChange={formik.handleChange} name='password' className='mb-3 form-control' type="password" id='password' />
                {(formik.errors.password && formik.touched.password) ? <div className="alert alert-danger">
                    {formik.errors.password}
                </div> : ''}
            </div>

        <div className="d-flex justify-content-between">
            <div>
               <Link to="/forgetPassword">ForgetPassowrd?</Link>
            </div>
        <div>
            
            {loading ? <button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn btn-success' >Login</button> : <button type='button' className='btn btn-success' >
                  <i className="fa-solid fa-spinner fa-spin"></i>
              </button>}
            </div>
        </div>
            
        </form>
    </>
}
