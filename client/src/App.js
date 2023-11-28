
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HeroSection from './components/HeroSection';
import Home from './Home';
import Details from './Details';
import Login from './admin/Login';
import CreateBlog from './admin/CreateBlog';
import Protected from './admin/Protected';
import ShowBlog from './admin/ShowBlog';
import Search from './components/Search';
import EditBlog from './admin/EditBlog';
import Category from './components/Category';
import './menu.js'

function App() {
  return (
    <>
  <BrowserRouter>
  <Routes>
    <Route path='/' element={<Home />} />
    <Route path='/search/:sea' element={<Search />} />
    <Route path='/detail/:slug' element={<Details />} />
    <Route path='/category/:cate' element={<Category />} />

    <Route path='/login' element={<Login />} />

    <Route path='/protect' element={<Protected />} />
    <Route path='/admin/blog' element={
      <Protected>
        <CreateBlog />
      </Protected>
    } />

<Route path='/admin/showBlog' element={
      <Protected>
        <ShowBlog />
      </Protected>
    } />

<Route path='/admin/edit/:slug' element={
      <Protected>
        <EditBlog />
      </Protected>
    } />

  </Routes>
  </BrowserRouter>
  </>
  );
}

export default App;
