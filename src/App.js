import logo from './logo.svg';
import './App.css';
import { RouterProvider, createBrowserRouter, createHashRouter } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Products from './components/Products/Products';
import Categories from './components/Categories/Categories';
import Cart from './components/Cart/Cart';
import Brands from './components/Brands/Brands';
import NotFound from './components/NotFound/NotFound';

import UserContextProvider from './components/Context/UserContext';
import ProtectedRout from './components/ProtectedRout/ProtectedRout';
import ForgetPassword from './components/ForgetPassword/ForgetPassword';
import ResetPassword from './components/ResetPassword/ResetPassword';
import ProductDetails from './components/ProductDetails/ProductDetails';
import { ToastContainer } from 'react-toastify';
import Address from './components/Address/Address';
import Orders from './components/Orders/Orders';
import CartContextProvider from './components/Context/cartContext';
import Product from './components/Product/Product';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';



let routers = createHashRouter([
  {
    path: '/', element: <Layout />, children: [
      { path: 'home', element: <ProtectedRout><Home /></ProtectedRout> },
      { index: true, element: <Login /> },
      { path: 'register', element: <Register /> },
      { path: 'forgetPassword', element: <ForgetPassword /> },
      { path: 'resetPassword', element: <ResetPassword /> },
      { path: 'address/:cartId', element: <ProtectedRout><Address /></ProtectedRout> },
      { path: 'allorders', element: <ProtectedRout><Orders /></ProtectedRout> },
      { path: 'products', element: <ProtectedRout><Products /></ProtectedRout> },
      { path: 'product', element: <ProtectedRout><Product /></ProtectedRout> },
      { path: 'categories', element: <ProtectedRout><Categories /></ProtectedRout> },
      { path: 'cart', element: <ProtectedRout><Cart /></ProtectedRout> },
      { path: 'brands', element: <ProtectedRout><Brands /></ProtectedRout> },
      { path: 'productDetails/:id', element: <ProtectedRout><ProductDetails /></ProtectedRout> },
      { path: '*', element: <NotFound /> },
    ]
  }
])
export default function App() {
  const queryClient = new QueryClient()
  return <>

    
      <QueryClientProvider client={queryClient}>
        <UserContextProvider>
          <CartContextProvider>
            <RouterProvider router={routers}></RouterProvider>
          </CartContextProvider>
        </UserContextProvider>
        <ReactQueryDevtools />
      </QueryClientProvider>
  



    <ToastContainer />

  </>

}

