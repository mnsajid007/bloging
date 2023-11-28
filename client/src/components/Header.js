import { useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { NavLink } from 'react-router-dom';
import React from 'react';


const Header = ({hand}) => {

    const [se, setSe] = useState();

    function search(){
        hand(se);
    }

    

    // React.useEffect(() => {
    //     var open = document.querySelector('.open-menu');
    //      const ope = document.getElementById('open-menu');
    //      let close = document.querySelector('.close-menu');
         
    //    function some () {
    //         alert('somelkjdf')
    //      }
   
    //      document.getElementById('open-menu').addEventListener('click', some);
   
    //    }, [])

    // var open = document.querySelector('.open-menu');
         
         
         
       function open () {
            
            var navbar = document.querySelector('.navbar');
            let openMenu = document.querySelector('.open-menu')
            let close = document.querySelector('.close-menu');

            navbar.style.display = 'block'
            openMenu.style.display = 'none'
            close.style.display = 'block'
         }

         function close () {
            
            var navbar = document.querySelector('.navbar');
            let openMenu = document.querySelector('.open-menu')
            let close = document.querySelector('.close-menu');

            navbar.style.display = 'none'
            openMenu.style.display = 'block'
            close.style.display = 'none'
         }
   
        //  document.getElementById('open-menu').addEventListener('click', some);


    return (
    <>
    <header className='section-ratio'>
       
          <div className="container top-bar">

             <div className="logo">
                <NavLink to='/'>
            <h2>RANDOM kHABAR</h2>
            </NavLink>
             </div>

            <div className="search">
            <input type="text" name='search' value={se} onChange={(e)=> setSe(e.target.value)}  />
            <NavLink to={`/search/${se}`}><button><AiOutlineSearch /></button></NavLink>
            </div>

            <div className="toggle">
            <p onClick={()=> open()} className='open-menu'><i class="fa-solid fa-bars"></i></p>
            <p onClick={()=> close()} className='close-menu'><i class="fa-solid fa-xmark"></i></p>
             </div>

            </div>
          
    <nav class="container navbar">
    <ul class="navbar-lists">
     <li><NavLink to='/' className="navbar-link"><i class="fa fa-home"></i>&nbsp; Home</NavLink></li>
     <li><NavLink to='/category/Cleaning' className="navbar-link about"><i class="fa fa-tint"></i>&nbsp; Cleaning</NavLink></li>
     <li><NavLink to='/category/Health' className="navbar-link about"><i class="fa fa-heart"></i>&nbsp; Health</NavLink></li>
     <li><NavLink to='/category/Food' className="navbar-link about"><i class="fa fa-cutlery"></i>&nbsp; Food</NavLink></li>
     <li><NavLink to='/category/Home & Garden' className="navbar-link about"><i class="fa fa-leaf"></i>&nbsp;  Home & Garden</NavLink></li>
     <li><NavLink to='/category/Lifehacks' className="navbar-link about"><i class="fa fa-flask"></i>&nbsp; Lifehacks</NavLink></li>
     <li><NavLink to='/category/Fashion & Beauty' className="navbar-link about"><i class="fa fa-eye"></i>&nbsp; Fashion & Beauty</NavLink></li>


    </ul>
    </nav>
            
        
    </header>
    </>
    )
}

export default Header