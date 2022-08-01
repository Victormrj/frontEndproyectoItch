import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
 
 
 
const PrivateRoute = ({children}) => {
    
const {id} = useSelector(state => state.auth)
    return (
        !!id
        ?   children  
        :  <Navigate to="/login" />
    )              
}
 
 
export default PrivateRoute;