import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({children}) => {
    const navigate = useNavigate();
    useEffect(() => {
        if(localStorage.getItem('token')){
            navigate('/onboard');
        }else{
			console.log("hit")
			navigate('/');
		}
    },[]);
    
    return children;
}

export default ProtectedRoute;