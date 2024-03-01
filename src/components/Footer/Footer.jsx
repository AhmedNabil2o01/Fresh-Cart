import React from 'react'
import stayle from './Footer.module.css'

export default function Footer() {
    return <>
        <footer className="bg-main-light py-5">
            <div className="container">
                <h4>Get tha Frech Cart App</h4>
                <p>we will send you a link , ioen it on your phone to download the app</p>
                <div className="d-flex">
                    <div className="col-sm-10">
                        <input type="text" className="form-control py-2" placeholder='Email.....' name="" id="" />
                    </div>
                    <div className="col-sm-3 ps-3">
                        <button className="btn w-100 text-white bg-main">share App Link </button>
                    </div>
                </div>
                <div className="line border-bottom border-2 my-4"></div>
            </div>
        </footer>
    </>
}
