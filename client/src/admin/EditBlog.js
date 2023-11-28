import axios from "axios";
import { useEffect, useState } from "react"
import { useAuth } from "../context/AuthContext";
import { NavLink, useParams } from "react-router-dom";
import HeaderAdmin from "./HeaderAdmin";
import CategoryF from "../components/CategoryF";
import { cate } from "../components/cate";

const EditBlog = ()=> {

    

    const [auth, setAuth] = useAuth();

    const {slug} = useParams();
    const [sing, upSing] = useState({});

    const [name, setName] = useState(`${sing.name}`);
    const [desc, setDesc] = useState(sing.description);
    const [cate, setCate] = useState();
    const [image, setImage] = useState();
  
    const single = async() => {
         try {
          const {data} = await axios.get(`http://localhost:8080/api/v1/blogs/singleBlog/${slug}`);
          if(data?.success){
            upSing(...data?.blog)
            setName(data.blog[0].name)
            setDesc(data.blog[0].description)
            setImage(data.blog[0].image)
          }
         } catch (error) {
          console.log(error)
         }
    }

    useEffect(()=> {
        single()
    }, [])

    
    
    const createBlog = async()=> {
        try {
            const blogData = new FormData();
            blogData.append('name', name);
            blogData.append('description', desc);
            blogData.append('category', cate);
            blogData.append('image', image);
            blogData.append('user', auth.user._id)
            const {data} = await axios.put(`http://localhost:8080/api/v1/blogs/updateBlog/${sing._id}`, blogData);
            if(data?.success){
                alert('new blog created')
            }
        } catch (error) {
            console.log(error);
            alert('some error')
        }
    }

   
        const [ca, setCa] = useState([]);
        const cat = async()=> {
            try {
                const {data} = await axios.get('http://localhost:8080/api/v1/category/getCate');
        
                if(data?.success){
                   setCa(data?.cate)
            
                }
            } catch (error) {
                console.log(error)
            }
        }


       
        
        useEffect(()=> {
            cat()
        }, [])


    return (
        <>
       <div className="blog container section-ratio">

       <HeaderAdmin />
     

       <div className="blog-right">
    
       <input type='text' name='name' value={name} placeholder='title' onChange={ (e)=> setName(e.target.value) }  />
       <input type='text' name='password' value={desc} placeholder='description' onChange={(e)=> setDesc(e.target.value)} />
       {/* <input type='text' name='cate' value={cate} placeholder='category' onChange={(e)=> setCate(e.target.value)} /> */}
       <select name="cate" onChange={(e)=>setCate(e.target.value)}>
       <option value={sing.category}>{sing.category}</option>
        {
            ca.map((elem)=> {
          return <option value={elem.category}>{elem.category}</option>
            })
        }
      </select>
       <img src={`/files/${sing.image}`} style={{width: '100px'}} />
       <input type='file' name='image'  onChange={(e)=> setImage(e.target.files[0])} />
       
       <button onClick={createBlog}>update</button>
        
       </div>

       </div>
        </>
    )
}

export default EditBlog