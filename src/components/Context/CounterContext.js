import { Children, createContext, useState } from "react";





export let CounterContext=createContext();

export default function CounterContextProvider(props){
   useState()
    return<CounterContext.Provider value={{}}>
        {props.Children}
    </CounterContext.Provider>
}