import axios from 'axios'
import Layout from './Layout'
import { useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate';
import { Link, NavLink, useParams } from 'react-router-dom';



const HeroSection = ()=> {

    const [blog, upBlog] = useState([]);
    // const [totalData, setTotalData] = useState(0);
    // const [activePage, setActivePage] = useState(1);
    const {cate} = useParams();

    const showAll = async()=> {
        try {
            const {data} = await axios.get(`http://localhost:8080/api/v1/blogs/cateWise/${cate}`);
            if(data?.success){
               upBlog(data?.blog);
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        showAll();
    }, [cate])

    return (
        <>

        <Layout>
            
        <section className="container hero-section section-ratio">
          
            {
             blog.length <= 0 ? (<h2>No Data availabe </h2>) : 

                blog.map((elem)=> {
                    return (
                        <>
                        <div className="small-hero">

<div className="thumbnail">
  <img src={`/files/${elem.image}`} />
</div>
<div className='hero-heading'>
<NavLink to={`/detail/${elem.slug}`}><h2>{elem.name}</h2></NavLink>
<span><i class="fa fa-tags"></i>&nbsp; {elem.category}</span>
</div>

</div>
                        </>
                    )
                })
            }


        </section>


   <section className="container section-ratio">

   <div class="pagination">
   

</div>
   
     
   </section>

        </Layout>
        </>
    )
}

export default HeroSection