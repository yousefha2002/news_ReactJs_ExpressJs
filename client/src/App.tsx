import React , {useEffect}from 'react';
import './App.css';
import {Route,Routes , Navigate} from 'react-router-dom'
import {createTheme,ThemeProvider} from '@mui/material'
import Home from './pages/user/Home';
import AdminLand from './pages/admin/AdminLand';
import AdminCategories from './pages/admin/AdminCategories';
import AdminNews from './pages/admin/AdminNews';
import Opinions from './pages/user/Opinions';
import OpinionsCategory from './pages/user/OpinionsCategory';
import SingleAuthor from './pages/user/SingleAuthor';
import Videos from './pages/user/Videos';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminEditNew from './pages/admin/AdminEditNew';
import AdminAuthors from './pages/admin/AdminAuthors';
import NewsByCategory from './pages/user/NewsByCategory';
import AdminEditAuthor from './pages/admin/AdminEditAuthor';
import AdminOpinions from './pages/admin/AdminOpinions';
import AdminEditOpinion from './pages/admin/AdminEditOpinion';
import AdminVideos from './pages/admin/AdminViedos';
import SingleVideo from './pages/user/SingleVideo';
import AdminLogin from './pages/admin/AdminLogin';
import { useSelector } from 'react-redux';
import { RootState } from './redux/store';
import { QueryClient, QueryClientProvider } from 'react-query'
import AdminEditCategory from './pages/admin/EditCategory';
import AdminSocialMedia from './pages/admin/AdminSocialMedia';
import SingleNew from './pages/user/SingleNew';
import SingleOpinion from './pages/user/SingleOpinion';


const themes = createTheme({
  direction:"rtl",
    palette:{
      primary:{
        main:"#b80000",
        contrastText:"#fff"
      },
      secondary:{
        main:"#000000",
        contrastText:"#fff"
      }
    }
})

const queryClient = new QueryClient()


function App() {
  useEffect(()=>{
    document.body.dir="rtl"
  },[]); 
  
  const {admin} = useSelector((st: RootState) => st.admin);
  
  return (
    <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={themes}>
        <Routes>
          <Route path='' element={<Home/>}/>
          {/* admin pages */}
          <Route path='/admin/login' element={!admin ? <AdminLogin/> : <Navigate to={'/admin'}/>}/>
          <Route path='/admin' element={admin ? <AdminLand/> : <Navigate to={'/admin/login'}/>}/>
          <Route path='/admin/categories' element={admin ? <AdminCategories/> : <Navigate to={'/admin/login'}/>}/>
          <Route path='/admin/categories/edit/:categoryId' element={admin ? <AdminEditCategory/> : <Navigate to={'/admin/login'}/>}/>
          <Route path='/admin/news' element={admin ? <AdminNews/> : <Navigate to={'/admin/login'}/>}/>
          <Route path='/admin/news/edit/:newId' element={admin ? <AdminEditNew/> : <Navigate to={'/admin/login'}/>}/>
          <Route path='/admin/authors' element={admin ? <AdminAuthors/> : <Navigate to={'/admin/login'}/>}/>
          <Route path='/admin/authors/edit/:authorId' element={admin ? <AdminEditAuthor/> : <Navigate to={'/admin/login'}/>}/>
          <Route path='/admin/opinions' element={admin ? <AdminOpinions/> : <Navigate to={'/admin/login'}/>}/>
          <Route path='/admin/opinions/edit/:opinionId' element={admin ? <AdminEditOpinion/> : <Navigate to={'/admin/login'}/>}/>
          <Route path='/admin/videos' element={admin ? <AdminVideos/> : <Navigate to={'/admin/login'}/>}/>
          <Route path='/admin/socialmedia' element={admin ? <AdminSocialMedia/> : <Navigate to={'/admin/login'}/>}/>
          {/* end admin pages */}

          {/* user pages */}
          <Route path='opinions' element={<Opinions/>}/>
          <Route path='opinions/:categId' element={<OpinionsCategory/>}/>
          <Route path='authors/:authorId' element={<SingleAuthor/>}/>
          <Route path='videos' element={<Videos/>}/>
          <Route path='/:category/news' element={<NewsByCategory/>}/>
          <Route path='/videos/:videoId' element={<SingleVideo/>}/>
          <Route path='news/:newId' element={<SingleNew/>}/>
          <Route path='opinion/:opinionId' element={<SingleOpinion/>}/>
        </Routes>
        <ToastContainer />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
