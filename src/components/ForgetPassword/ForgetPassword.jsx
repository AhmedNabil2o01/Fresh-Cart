import React, { useContext, useState } from 'react'

import { ErrorMessage, useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { useNavigate } from 'react-router'
import { UserContext } from '../Context/UserContext'

export default function ForgetPassword() {
    let { setUserToken } = useContext(UserContext);
    let Navigate = useNavigate();
    let [errMessage, setErrMessage] = useState("");
    let [formStat, setFormStat] = useState(true)

    let [loading, setLoading] = useState(true)
    let validationSchema = Yup.object({
        email: Yup.string().email('email is invalid').required('email is required'),

    })

    let validationSchema2 = Yup.object({
        resetCode: Yup.string().required('resetCode is required').matches(/^[0-9]{5,6}$/)

    })

    async function ForgetPasswordForme(value) {
        setLoading(false)
        let req = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords', value).catch(function (err) {
            setErrMessage(err.response.data.message);
            setLoading(true);
        })
        if (req?.data.statusMsg === 'success') {

            setFormStat(false)
            setLoading(true);

        }
        console.log(req);

    }
    let formik = useFormik({
        initialValues: {

            email: '',

        }, validationSchema,
        onSubmit: ForgetPasswordForme
    })

    let formik2 = useFormik({
        initialValues: {
            resetCode: ""
        },
        onSubmit: verifyResetCode,
         validationSchema: validationSchema2
    })

    async function verifyResetCode(value) {
        let req = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode', value).catch(function (err) {
            setErrMessage(err.response.data.message);
        })
        if (req.data.status === 'Success') {
            Navigate('/resetPassword')
        }
        console.log(req);
    }

    return <>

        {errMessage !== "" ? <div className="alert alert-danger">{errMessage}</div> : ""}
        {formStat ? <form onSubmit={formik.handleSubmit}>

            <div>
                <label htmlFor="email">Enter Email</label>
                <input onBlur={formik.handleBlur} onChange={formik.handleChange} name='email' className='mb-3 form-control' type="email" id='email' />
                {(formik.errors.email && formik.touched.email) ? <div className="alert alert-danger">
                    {formik.errors.email}
                </div> : ''}
            </div>

            {loading ? <button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn btn-success' >Send</button> : <button type='button' className='btn btn-success' >
                <i className="fa-solid fa-spinner fa-spin"></i>
            </button>}

        </form>
            : <form onSubmit={formik2.handleSubmit}>

                <div>
                    <label htmlFor="resetCode">Enter Reset Code</label>
                    <input value={formik2.values.resetCode} onBlur={formik2.handleBlur} onChange={formik2.handleChange} name='resetCode' className='mb-3 form-control' type="text" id='resetCode' />
                    {(formik2.errors.resetCode && formik2.touched.resetCode) ? <div className="alert alert-danger">
                        {formik2.errors.resetCode}
                    </div> : ''}
                </div>

                {loading ? <button disabled={!(formik2.isValid && formik2.dirty)} type='submit' className='btn btn-success' >Vriefy code</button> : <button type='button' className='btn btn-success' >
                    <i className="fa-solid fa-spinner fa-spin"></i>
                </button>}
 
            </form>}




    </>
}
