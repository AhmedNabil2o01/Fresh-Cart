import React, { useContext } from 'react'
import stayle from './Navbar.module.css'
import { Link, useNavigate } from 'react-router-dom'
import img from '../../finalProject assets/freshcart-logo.svg'
import { UserContext } from '../Context/UserContext'
import { cartContext } from '../Context/cartContext'

export default function Navbar() {
    let { cart } = useContext(cartContext);
    console.log(cart);
    let { userToken, setUserToken } = useContext(UserContext);
    let Navigate = useNavigate();

    function logOut() {
        localStorage.removeItem('userToken');
        setUserToken(null);
        Navigate('/login')
    }

    return <>
        <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top">
            <div className="container-fluid">
                <Link className="navbar-brand" to="#"><img src={img} className='w-100' alt="" /></Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0 text-main">

                        {userToken !== null ? <> <li className="nav-item">
                            <Link className="nav-link" to="home">Home</Link>
                        </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="categories">Categories</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="product">Products</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="cart">Cart</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="brands">Brands</Link>
                            </li></> : ''}



                    </ul>



                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li className="nav-item d-flex align-items-center">
                       <Link to={'/cart'}>
                       <i className="fa-solid fa-cart-shopping fa-2x position-relative">
                            <span className="position-absolute top-0 start-100 translate-middle bg-main p-2 rounded-circle font-sm text-white">{cart?.numOfCartItems||0}</span>

                        </i></Link>
                            <i className="fa-brands fa-facebook mx-2"></i>
                            <i className="fa-brands fa-twitter mx-2"></i>
                            <i className="fa-brands fa-youtube mx-2"></i>
                            <i className="fa-brands fa-instagram mx-2"></i>
                        </li>
                        {userToken !== null ? <>  <li className="nav-item">
                            <span onClick={() => logOut()} className="nav-link cursor-pointer">LogOut</span>
                        </li></> : <>
                            <li className="nav-item">
                                <Link className="nav-link" to="register">Register</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/">Login</Link>
                            </li></>
                        }


                    </ul>

                </div>

            </div>
        </nav>
    </>
}
