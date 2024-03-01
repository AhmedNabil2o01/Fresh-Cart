import React from 'react'
import stayle from './Categories.module.css'
import axios from 'axios';
import { useQuery } from 'react-query';

export default function Category() {

    function getAllCategory() {
        return axios.get('https://ecommerce.routemisr.com/api/v1/categories')

    }
    const { data } = useQuery("category", getAllCategory, {
        cacheTime: 20000,
        staleTime: 500,
        refetchOnMount: true,
        refetchOnWindowFocus: true
    })
    console.log(data);

    return <>
        <div className="row">
            {data?.data.data.map((category ,index) => {
                return <div key={index} className="col-md-4">
                    <div className="product category overflow-hidden px-2 rounded-2  py-3 cursor-pointer">

                        <img src={category.image} className='w-100' alt="" />
                        <h2 className="text-main text-center">{category.name}</h2>



                    </div>
                </div>
            })}
        </div>

    </>
}

