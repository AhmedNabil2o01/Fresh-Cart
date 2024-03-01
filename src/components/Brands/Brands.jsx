import React from 'react'
import stayle from './Brands.module.css'

import axios from 'axios';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';

export default function Brands() {

    function getAllBrands() {
        return axios.get('https://ecommerce.routemisr.com/api/v1/brands')

    }
    const { data } = useQuery("Brands", getAllBrands, {
        cacheTime: 20000,
        staleTime: 500,
        refetchOnMount: true,
        refetchOnWindowFocus: true
    })
    console.log(data);

    return <>
        <div className="text-center my-5"> <h2 className="text-main fw-bolder">All Brandes</h2></div>
        <div className="row g-2">
            {data?.data.data.map((Brands, index) => {
                return <> <div className="col-md-3">
                        <div className="Brands border border-2 overflow-hidden px-2 rounded-2  py-3 cursor-pointer">


                            <Link data-bs-toggle="modal" data-bs-target={"#exampleModal-1" + Brands._id}>
                                <img src={Brands.image} className='w-100' alt="" />
                                <h2 className="text-main text-center">{Brands.name}</h2>
                            </Link>

                        </div>
                    </div>

                    <div className="modal fade bg-dark bg-opacity-75" id={"exampleModal-1" + Brands._id}
                        aria-labelledby={"exampleModalLabel-1" + Brands._id} aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content ">
                                <div className="modal-body p-0 ">

                                    <img src={Brands.image} className='w-100' alt="Brand" />

                                </div>
                            </div>
                        </div>
                    </div>
                </>

            })}

        </div>


    </>
}

