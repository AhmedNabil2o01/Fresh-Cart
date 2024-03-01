import axios from "axios";
import { createContext, useEffect, useState } from "react";




export let cartContext = createContext();

export default function CartContextProvider({children}) {
    const [cart, setCart] = useState({})
    async function getLoggedUserCart() {
        try {
            const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/cart', {
                headers: {
                    token: localStorage.getItem('userToken')
                }
            })
     
            setCart(data)
    
        } catch (error) {
            console.log(error);
        }
    }
useEffect(()=>{
    getLoggedUserCart()
},[])
    return <cartContext.Provider value={{cart,setCart}}>
        {children}
    </cartContext.Provider>
}