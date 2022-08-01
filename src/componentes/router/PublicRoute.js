import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
 
const PublicRoute = ({children}) => {
    const {id} = useSelector(state => state.auth)
  
    return ( !!id
        ? <Navigate to="/" />
        : children 
        
        )
        
}
 
export default PublicRoute;