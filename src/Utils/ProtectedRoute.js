import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({children}) => {
    const navigate = useNavigate();
    useEffect(() => {
        if(localStorage.getItem('token')){
            const role = localStorage.getItem('role');
            if(role!='admin'){
                navigate('/onboard')
            }
        }else{
			navigate('/');
		}
    },[]);
    
    return children;
}

export default ProtectedRoute;