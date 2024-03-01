import React, { useState } from 'react'
import stayle from './Register.module.css'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { useNavigate } from 'react-router'

export default function Register() {

    let Navigate= useNavigate();
    let [errMessage, setErrMessage] = useState('');
    let [loading, setLoading] = useState(true);


    let validationSchema = Yup.object({
        name: Yup.string().min(3, 'name min 3').max(15, 'name max 15').required('name is required'),
        email: Yup.string().email('email is invalid').required('email is required'),
        phone: Yup.string().required('phone is required'),
        password: Yup.string().required('password is required'),
        rePassword: Yup.string().oneOf([Yup.ref('password')], 'rePassword not match').required('password is required')
    })


    async function RegisterForme(value) {
        setLoading(false)
        let req = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, value).catch(function (err) {
            setErrMessage(err.response.data.message);
            setLoading(true);
           
        })
        if (req?.data.message === "success") {
            setLoading(true)
            Navigate('/login');
        }
        console.log(req);
        console.log(value);
    }
    let formik = useFormik({
        initialValues: {
            name: '',
            phone: '',
            email: '',
            password: '',
            rePassword: ''
        },
        onSubmit: RegisterForme, 
        validationSchema
    })

    return <>
        <h2>Register Now...........</h2>
        {errMessage !== '' ? <div className='alert alert-danger'>{errMessage}</div> : ''}

        <form onSubmit={formik.handleSubmit}>
            <div>
                <label htmlFor="name">Name</label>
                <input onBlur={formik.handleBlur} onChange={formik.handleChange} name='name' className='mb-3 form-control' type="text" id='name' />
                {(formik.errors.name && formik.touched.name) ? <div className="alert alert-danger">{formik.errors.name}</div> : ''}
            </div>
            <div>
                <label htmlFor="phone">Phone</label>
                <input onBlur={formik.handleBlur} onChange={formik.handleChange} name='phone' className='mb-3 form-control' type="tel" id='phone' />

                {(formik.errors.phone && formik.touched.phone) ? <div className="alert alert-danger">
                    {formik.errors.phone}
                </div> : ''}
            </div>

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


            <div>
                <label htmlFor="rePassword">rePassword</label>
                <input onBlur={formik.handleBlur} onChange={formik.handleChange} name='rePassword' className='mb-3 form-control' type="password" id='rePassword' />
                {(formik.errors.rePassword && formik.touched.rePassword) ? <div className="alert alert-danger">
                    {formik.errors.rePassword}
                </div> : ''}
            </div>

            {loading ? <button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn btn-success' >Register</button> : <button type='button' className='btn btn-success' >
                <i className="fa-solid fa-spinner fa-spin"></i>
            </button>}



        </form>
    </>
}
