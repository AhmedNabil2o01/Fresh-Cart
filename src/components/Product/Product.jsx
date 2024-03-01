import axios from 'axios';
import React from 'react'
import Products from '../Products/Products';
import { useQuery } from 'react-query';

export default function Product() {

    function getAllProduct() {
        return axios.get('https://ecommerce.routemisr.com/api/v1/products')
    }
    const { data } = useQuery("Product", getAllProduct, {
        cacheTime: 20000,
        staleTime: 500,
        refetchOnMount: true,
        refetchOnWindowFocus: true
    })


    return <>
        <div className="row">
            {data?.data.data.map((product) => {
                return <div key={product.id} className="col-md-3">
                    <Products product={product} />
                </div>
            })}
        </div>

    </>
}
