import axios from 'axios'
import Layout from './Layout'
import { useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate';
import { Link, NavLink } from 'react-router-dom';

const limit = 6;

const totalCalculate = (total, limit) => {
    const pages = [];
     for(let x=1; x <= Math.ceil(total/limit); x++){
        pages.push(x);
     }
     return pages;
}

const HeroSection = ()=> {

    const [blog, upBlog] = useState([]);
    const [totalData, setTotalData] = useState(0);
    const [activePage, setActivePage] = useState(1);

    const showAll = async()=> {
        try {
            const {data} = await axios.get('http://localhost:8080/api/v1/blogs/getAllBlog',
            {
                params: {
                    page: activePage,
                    size: limit
                }
            }
            );
            if(data?.success){
               upBlog(data?.blog);
               setTotalData(data.total)
            }
        } catch (error) {
            console.log(error)
        }
    }


    // const hand = async(seee)=> {
    //     try {
    //         const {data} = await axios.get('http://localhost:8080/api/v1/blogs/searchBlog',
    //         {
    //             params: {
    //                 page: activePage,
    //                 size: limit,
    //                 search: seee
    //             }
    //         }
    //         );
    //         if(data?.success){
    //            upBlog(data?.blog);
    //            setTotalData(data?.total)
            
    //         }
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

    useEffect(()=>{
        showAll();
    }, [activePage])

    return (
        <>

        <Layout>
            
        <section className="container hero-section section-ratio">

            {
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
    {
        activePage !== 1 && <Link onClick={()=> setActivePage(activePage - 1)}>&laquo;</Link>
    }
  {
    totalCalculate(totalData, limit).map(pageNo =>
        <Link className={pageNo === activePage ? 'active' : ''} onClick={()=> setActivePage(pageNo)} >{pageNo}</Link>
         )
  }
 
  {
    activePage !== Math.ceil(totalData/limit) && <Link onClick={()=> setActivePage(activePage + 1)}>&raquo;</Link>
  }

</div>
   
      {/* <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={8}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
        marginPagesDisplayed={2}
            containerClassName="pagination justify-content-center"
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            previousLinkClassName="page-link"
            nextClassName="page-item"
            nextLinkClassName="page-link"
            activeClassName="active"
      /> */}
   </section>

        </Layout>
        </>
    )
}

export default HeroSection