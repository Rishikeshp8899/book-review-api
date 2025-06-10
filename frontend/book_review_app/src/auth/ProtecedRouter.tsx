import {useAuth} from './Auth'
import { Navigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';


interface ProtectedRouterProps{
    children:React.ReactElement;
}

export const ProtectedRoute:React.FC<ProtectedRouterProps>=({children})=>{
    const {user}=useAuth();
     const location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
}