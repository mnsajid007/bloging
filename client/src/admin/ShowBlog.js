import axios from "axios";
import { useEffect, useState } from "react"
import { useAuth } from "../context/AuthContext";
import { NavLink } from "react-router-dom";
import HeaderAdmin from "./HeaderAdmin";

const ShowBlog = ()=> {

    const [auth, setAuth] = useAuth();

    const [blog, upBlog] = useState([]);
    const [page, setPage] = useState(1);
    const [to, setTo] = useState();
    const [size, upSize] = useState(4);

    const showAll = async()=> {
        try {
            const {data} = await axios.get('http://localhost:8080/api/v1/blogs/getTableBlog',
            {
                params: {
                    
                    size: size
                }
            }
            );
            if(data?.success){
               upBlog(data?.blog);
               setTo(data?.total)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const del = async(id)=> {
        try {
            const {data} = await axios.delete(`http://localhost:8080/api/v1/blogs/deleteBlog/${id}`);
            if(data?.success){
               showAll()
            }
        } catch (error) {
            console.log(error)
        }
    }

    


    useEffect(()=>{
        showAll();
    }, [page])


    return (
        <>
       <div className="blog container section-ratio">

       <HeaderAdmin />

       <div style={{width: '90%'}} className="blog-right">
           

       <table>
        {
            blog.map((elem)=> {
            return (
                <tr>
                <th>{elem.name}</th>
                <th><img src={`../files/${elem.image}`} style={{width: '100px'}} /></th>
                <th><button onClick={()=>del(elem._id)}>del</button> <NavLink to={`/admin/edit/${elem.slug}`}><button>edit</button></NavLink></th>
              </tr>
            )
            })
        }

  {
    to <= size ? ('') : (<button className="admin-btn" onClick={()=> { 
        setPage(page + 1)
        upSize(size + 4)
    }}> Load More</button>)
  }
  {/* <p>{to}  {size}</p> */}
</table>


       </div>

       </div>
        </>
    )
}

export default ShowBlog