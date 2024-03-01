import React, { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { useParams } from 'react-router';

export default function Address() {

    let [errMessage, setErrMessage] = useState("");
    let [loading, setLoading] = useState(true)
    let { cartId } = useParams()


    let validationSchema = Yup.object({
        details: Yup.string().required('Details is required'),
        phone: Yup.string().required('phone is required').matches(/^01[0125][0-9]{8}$/, 'Enter Valid Egyptian Phone'),
        city: Yup.string().required('city is required')
    })

    async function AddrwessForme(value) {

        setLoading(false)
        setErrMessage('');
        console.log(value);
        try {
            let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}`, {
                shippingAddress: value
            }, {
                headers: {
                    token: localStorage.getItem('userToken')
                },
                params: {
                    url: 'http://localhost:3000'
                }
            })
            console.log(data);
           window.open(data.session.url, '_self')
        } catch (error) {
            setErrMessage(error.response.data.message);

        }
        setLoading(true);
    }

    let formik = useFormik({
        initialValues: {

            details: '',
            phone: '',
            city: ''
        }, validationSchema,
        onSubmit: AddrwessForme
    })

    return <>
        <h2>Address:</h2>
        {errMessage !== "" ? <div className="alert alert-danger">{errMessage}</div> : ""}

        <form onSubmit={formik.handleSubmit}>

            <div>
                <label htmlFor="details">details</label>
                <input onBlur={formik.handleBlur} onChange={formik.handleChange} name='details' className='mb-3 form-control' type="text" id='details' />
                {(formik.errors.details && formik.touched.details) ? <div className="alert alert-danger">
                    {formik.errors.details}
                </div> : ''}
            </div>

            <div>
                <label htmlFor="city">city</label>
                <input onBlur={formik.handleBlur} onChange={formik.handleChange} name='city' className='mb-3 form-control' type="text" id='city' />
                {(formik.errors.city && formik.touched.city) ? <div className="alert alert-danger">
                    {formik.errors.city}
                </div> : ''}
            </div>
            <div>
                <label htmlFor="phone">phone</label>
                <input onBlur={formik.handleBlur} onChange={formik.handleChange} name='phone' className='mb-3 form-control' type="text" id='phone' />
                {(formik.errors.phone && formik.touched.phone) ? <div className="alert alert-danger">
                    {formik.errors.phone}
                </div> : ''}
            </div>

            <div>

                {loading ? <button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn btn-success' >CheckOut</button> : <button type='button' className='btn btn-success' >
                    <i className="fa-solid fa-spinner fa-spin"></i>
                </button>}
            </div>


        </form>
    </>
}
