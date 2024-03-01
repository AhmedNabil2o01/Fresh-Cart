import React from 'react'
import stayle from './NotFound.module.css'
import img from '../../finalProject assets/error.svg'
export default function NotFound() {
    return <>
        <div className="vh-100">
            <img src={img} alt="" className='w-100'/>
        </div>
    </>
}
