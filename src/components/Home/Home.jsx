import React, { useEffect, useState } from 'react'
import stayle from './Home.module.css'
import axios from 'axios'
import Products from '../Products/Products'
import img1 from '../../finalProject assets/images/slider-image-2.jpeg'
import img2 from '../../finalProject assets/images/slider-image-1.jpeg'
import img3 from '../../finalProject assets/images/slider-image-3.jpeg'
import Slider from "react-slick";
import CategoriesSlider from '../CategoriesSlider/CategoriesSlider'


export default function Home() {

    const [products,setProducts]=useState([])
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        
    };


    async function getAllProduct(){
        const {data} =await axios.get('https://ecommerce.routemisr.com/api/v1/products')

        setProducts(data.data);
        console.log(data.data);
    }
    useEffect(()=>{
        getAllProduct()
    },[])
    return <>
    <header>
        <div className="row g-0">
            <div className="col-md-9">
            <Slider {...settings}>
                       <div>
                       <img src={img3} className='w-100' alt="" />
                       </div>
                       <div>
                       <img src={img2} className='w-100' alt="" />
                       </div>
                       <div>
                       <img src={img1} className='w-100' alt="" />
                       </div>
                      
                    </Slider>
 

            </div>
            <div className="col-md-3">
                <img src={img1} className='w-100' alt="" />
                <img src={img2} className='w-100' alt="" />
                <img src={img3} className='w-100' alt="" />
            </div>
            
        </div>
        <div className="categories-slider">
<CategoriesSlider/>
        </div>
    </header>
        <div className="row">
           {products.map((product)=>{
          return   <div key={product.id} className="col-md-3">
            <Products product={product}/>
         </div>
           })}
        </div>
    </>
}
