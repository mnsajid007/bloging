import { NavLink } from "react-router-dom";

const HeaderAdmin = () => {
    return (
        <>
        <div className="blog-left">

<ul class="admin-lists">
    
 <li><NavLink to='/admin/blog' className="navbar-link"><i class="fa fa-home"></i>&nbsp; Create Blog</NavLink></li>
 <li><NavLink to='/admin/showBlog' className="navbar-link about"><i class="fa fa-tint"></i>&nbsp; show blog</NavLink></li>
 <li><NavLink className="navbar-link about"><i class="fa fa-heart"></i>&nbsp; Health</NavLink></li>
 
</ul>
   </div>
        </>
    )
}

export default HeaderAdmin;