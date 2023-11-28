import { useParams } from "react-router-dom"
import Layout from "./components/Layout"
import dubai from './images/ckaKDvi5-dubai_facts1-370x297.webp'
import axios from "axios";
import { useEffect, useState } from "react";


const Details = () => {

  const {slug} = useParams();
  const [sing, upSing] = useState({});
  const [rand, upRand] = useState([]);
  const [des, upDes] = useState('des');
  const [isLoaded, setIsLoaded] = useState(false);
const [isPageLoaded, setIsPageLoaded] = useState(false);

  const single = async() => {
       try {
        const {data} = await axios.get(`http://localhost:8080/api/v1/blogs/singleBlog/${slug}`);
        if(data?.success){
          upSing(...data?.blog)
        }
       } catch (error) {
        console.log(error)
       }
  }

  const randomBlog = async() => {
    try {
     const {data} = await axios.get(`http://localhost:8080/api/v1/blogs/randBlog`);
     if(data?.success){
       upRand(data?.randBlog)
       
     }
    } catch (error) {
     console.log(error)
    }
}

 function some (){
  document.getElementById('des').innerHTML = sing.description
}



  useEffect(()=> {
    single()
    randomBlog()
    
  }, [])

  useEffect(()=> {
    some()
  })

  

    return (
        <>
        <Layout>
              <section className="container section-ratio detail">
            
            <div className="left-section">
            <h1>{sing.name}</h1>
            <img src={`/files/${sing.image}`} alt={sing.name} />
            
             <div id='des'>
              
              </div>  
            
            
             </div>

            <div className="right-section">

            <h2>RECENT POSTS:</h2>
            <hr />
            <div className="recent">

             {/* <div className="recent-post">
                <img src={dubai} alt='some' />
                <p>47 Crazy Things You Only Find in Dubai</p>
             </div>

             <div className="recent-post">
                <img src={dubai} alt='some' />
                <h3>47 C  </h3>
             </div> */}
            {
              rand.map((elem)=> {
                return (
                  
                  <div className="recent-post">
                    <div>
                <img src={`/files/${elem.image}`} alt='some' />
                </div>

                <div>
                <p>{elem.name}</p>
                </div>
             </div>
                  
                )
              })
            }

            </div>

            </div>

              </section>
        </Layout>
        </>
    )
}

export default Details;