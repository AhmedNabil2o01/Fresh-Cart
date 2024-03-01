import React from 'react'
import stayle from './ProtectedRout.module.css'
import { Navigate } from 'react-router'

export default function ProtectedRout(props) {


    if(localStorage.getItem('userToken')!==null)
    {
       return props.children
    }
    else{
        return<Navigate to={'/login'} />
    }

}
