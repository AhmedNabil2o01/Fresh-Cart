import React, { useContext, useEffect, useState } from 'react'
import stayle from './Cart.module.css'
import axios from 'axios'
import CartProduct from '../CartProduct/CartProduct'
import Swal from 'sweetalert2'
import { Link } from 'react-router-dom'
import { cartContext } from '../Context/cartContext'

export default function Cart() {
    const [cart, setCart] = useState({})
    const [cartId, setCartId] = useState()
    let { setCart:contextSetCart } = useContext(cartContext);

    async function getLoggedUserCart() {
        try {
            const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/cart', {
                headers: {
                    token: localStorage.getItem('userToken')
                }
            })
            console.log(data);
            setCart(data)
            setCartId(data?.data._id)
        } catch (error) {
            console.log(error);
        }
    }

    function RemoveProductFromCart(productId) {

        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: "btn btn-success",
                cancelButton: "btn btn-danger"
            },
            buttonsStyling: false
        });
        swalWithBootstrapButtons.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "No, cancel!",
            reverseButtons: true
        }).then(async (result) => {
            if (result.isConfirmed) {
                const { data } = await axios.delete('https://ecommerce.routemisr.com/api/v1/cart/' + productId, {
                    headers: {
                        token: localStorage.getItem('userToken')
                    }
                })
                console.log(data)
                contextSetCart(data)
                setCart(data)
                swalWithBootstrapButtons.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success"
                });
            } else if (
                /* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel
            ) {
                swalWithBootstrapButtons.fire({
                    title: "Cancelled",
                    text: "Your imaginary file is safe :)",
                    icon: "error"
                });
            }
        });

    }

    async function clearCart() {
        const { data } = await axios.delete('https://ecommerce.routemisr.com/api/v1/cart', {
            headers: {
                token: localStorage.getItem('userToken')
            }
        })
        console.log(data)
        contextSetCart({})
        setCart(data)
    }

    useEffect(() => {
        getLoggedUserCart()
    }, [])

    async function updatCartProductCount(productId, count) {
        if (count == 0) {
            RemoveProductFromCart(productId)
        }
        else {
            const { data } = await axios.put('https://ecommerce.routemisr.com/api/v1/cart/' + productId, {
                count
            }, {
                headers: {
                    token: localStorage.getItem('userToken')
                }
            })
            console.log(data)
            setCart(data)
        }

    }
    return <>

        {cart.data?.products.length > 0 ? <div className='my-5'>
            <button onClick={clearCart} className="btn btn-outline-danger d-block ms-auto">Clear Cart</button>

            {cart.data?.products.map((cartProduct, index) => {
                return <CartProduct updatCartProductCount={updatCartProductCount} RemoveProductFromCart={RemoveProductFromCart} key={index} cartProduct={cartProduct} />
            })}

            <div className="d-flex justify-content-between">
                <Link to={'/address/' + cartId} className="btn bg-main text-white">CheckOut</Link>
                <p>total cart price:{cart.data?.totalCartPrice} EGP</p>

            </div>


        </div> : <h2 className="alert alert-warning text-center py-5"> No Product In Your Cart</h2>}





    </>
}
