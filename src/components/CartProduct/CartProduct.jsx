import React from 'react'

export default function CartProduct({ cartProduct, RemoveProductFromCart, updatCartProductCount }) {
    return (
        <div className="cart-product shadow rounded-2 my-3">
            <div className="row align-items-center">
                <div className="col-md-2">
                    <img src={cartProduct.product.imageCover} className='w-100' alt="" />

                </div>
                <div className="col-8">
                    <h2>{cartProduct.product.title}</h2>
                    <h5>{cartProduct.product.category.name}</h5>
                    <p className="d-flex justify-content-between">

                        <span> {cartProduct.price} EGP</span>
                        <span>
                            <i className="fas fa-star rating-color me-1"></i>{cartProduct.product.ratingsAverage}
                        </span>

                    </p>
                    <p><span className="fw-bolder">total price:</span>{cartProduct.price * cartProduct.count} EGP </p>
                </div>
                <div className="col-md-2">
                    <button onClick={() => RemoveProductFromCart(cartProduct.product._id)} className="btn text-danger">Remove</button>
                    <div className="d-flex align-items-center">
                        <button onClick={() => updatCartProductCount(cartProduct.product._id, cartProduct.count - 1)} className="btn bg-main text-white mx-2">-</button>
                        <span>{cartProduct.count}</span>
                        <button onClick={() => updatCartProductCount(cartProduct.product._id, cartProduct.count + 1)} className="btn bg-main text-white mx-2">+</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
