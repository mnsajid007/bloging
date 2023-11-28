import { createContext, useContext, useState } from "react"

const AuthContext = createContext();

const AuthProvider = ({children})=> {

    const [auth, setAuth] = useState({
         token: localStorage.getItem('blog_user') ? JSON.parse(localStorage.getItem('blog_user')) : '',
         user: '',
         log: false
    })

    const sea = () => {
       
    }

    const [see, setSee] = useState('1');

    return (
    <AuthContext.Provider value={[auth, setAuth, see, setSee]}>
         {children}
    </AuthContext.Provider>)
}

const useAuth = ()=> {
    return useContext(AuthContext);
  }
  
  export  { AuthProvider, useAuth};