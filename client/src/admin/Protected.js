import { useEffect } from "react";
import { useAuth } from "../context/AuthContext"
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";

const Protected = ({children}) => {
    const [auth, setAuth] = useAuth();
    const navigate = useNavigate();

    const getUser = async()=> {
        try {
            const {data} = await axios.get('http://localhost:8080/api/v1/user/currentUser', {
                headers: {
                    "Authorization": auth?.token
                  }
            });
            if(data?.success){
                setAuth(()=> {
                    return {
                        user: data.user
                    }
                })
            }
        } catch (error) {
            console.log(error)
            // localStorage.clear();
        }
    }

    useEffect(()=> {
        
       getUser();
    }, [])

    if(localStorage.getItem('blog_user')){
        return children;
      }else{
        return <Navigate to='/login' />
      }

}

export default Protected