import { useState } from 'react';
import '../App.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = ()=> {

    const [name, setName] = useState();
    const [password, setPassword] = useState();
    const navigate = useNavigate();
    

    const logins = async()=> {
        try {
            const {data} = await axios.post('http://localhost:8080/api/v1/user/login', {
                email: name,
                password: password
            })
            if(data.success){
                localStorage.setItem('blog_user', JSON.stringify(data?.token))
                alert(data.message);
                navigate('/blog')

            }
        } catch (error) {
            console.log(error);
            alert('user not login')
        }
    }

    return (
        <>
        <section className='container section-ratio login'>

        <div className='login-data'>

        <input type='text' name='email' value={name} placeholder='name' onChange={ (e)=> setName(e.target.value) }  />
        <input type='text' name='password' value={password} placeholder='password' onChange={(e)=> setPassword(e.target.value)} />
        <button onClick={logins}>Login</button>

        </div>

        </section>
        </>
    )
}

export default Login