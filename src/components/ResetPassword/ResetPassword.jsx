import React from 'react'
import stayle from './ResetPassword.module.css'
import { useFormik, yupToFormErrors } from 'formik'
import * as Yup from 'yup'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function ResetPassword() {

    let Navigate = useNavigate();
    let validationSchema = Yup.object({
        email: Yup.string().email('email is invalid').required('email is required'),
        newPassword: Yup.string().required('newPassword is required'),
    })

    let formik = useFormik({
        initialValues: {
            email: '',
            newPassword: ''
        }, onSubmit: ResetPasswordApi,
        validationSchema
    })

    async function ResetPasswordApi(val) {
        let req = await axios.put('https://ecommerce.routemisr.com/api/v1/auth/resetPassword', val)
        console.log(req);
        if (req.data.token) {
            Navigate('/login')
        }
    }
    return <>
        <h2>ResetPassword</h2>
        <form onSubmit={formik.handleSubmit}>

            <div>
                <label htmlFor="email">Email</label>
                <input onBlur={formik.handleBlur} onChange={formik.handleChange} name='email' className='mb-3 form-control' type="email" id='email' />
                {(formik.errors.email && formik.touched.email) ? <div className="alert alert-danger">
                    {formik.errors.email}
                </div> : ''}
            </div>

            <div>
                <label htmlFor="newPassword">newPassword</label>
                <input onBlur={formik.handleBlur} onChange={formik.handleChange} name='newPassword' className='mb-3 form-control' type="password" id='newPassword' />
                {(formik.errors.newPassword && formik.touched.newPassword) ? <div className="alert alert-danger">
                    {formik.errors.newPassword}
                </div> : ''}
            </div>



            <div>

                <button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn btn-success' >Updat Password</button>
            </div>


        </form>
    </>
}
