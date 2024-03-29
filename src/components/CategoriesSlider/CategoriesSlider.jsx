import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Slider from "react-slick";


export default function CategoriesSlider() {

    let [Category, setCategory] = useState([])
    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 7,
        slidesToScroll: 7,
    };
    async function getAllCategories() {

        const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/categories')
        setCategory(data.data)
    }
    useEffect(() => {
        getAllCategories()
    }, [])

    return <>
        <Slider {...settings}>
{Category.map((category , index)=>{
    return <div key={index}>
        <img style={{height:200}} src={category.image} className='w-100' alt="" />
        <h5>{category.name}</h5>
    </div>
})}
        </Slider>

    </>
}
