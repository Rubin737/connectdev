import React from 'react'
import { Routes,Route, Router } from 'react-router-dom'
import Login from './pages/Login'
import Onboard from './pages/Onboard'
import Notification from './pages/Notification'
import Home from './pages/Home'
import Signup from './pages/Signup'
import { Navigate } from 'react-router-dom'
import PageLoader from './components/PageLoader'
import { useAuthUser } from './hooks/useAuthUser'
import Layout from './components/Layout'
import { useSelector } from 'react-redux'
import ChatPage from './pages/ChatPage'
import 'stream-chat-react/dist/css/v2/index.css';
import VideoCall from './pages/VideoCall'
import MyOwnRequests from './pages/myOwnRequests'

// import ConnectionRequests from './pages/ConnectionRequests'
const App = () => {
const theme = useSelector(store=>store.theme);


const {authUser,isLoading,isError,error} =  useAuthUser();
console.log(authUser?.data?._id)


if(isLoading) return <PageLoader/>

const IsAuthenticatedUser = Boolean(authUser?.data);
const IsOnboarded = authUser?.data?.isOnboarded


 return (
    <div data-theme={theme}>
      <Routes>
         <Route
         path='/'
         element={IsAuthenticatedUser && IsOnboarded ? <Layout isSidebar={true} ><Home/></Layout> : (<Navigate to={!IsAuthenticatedUser ? "/signup" : "/onboard"}/>)}
         ></Route>

         <Route
         path='/signup'
         element={!IsAuthenticatedUser ? <Signup/> : <Navigate to={!IsOnboarded ? "/onboard" : "/"}/>}
         >
         </Route>
      
        <Route
        path='/onboard'
        element={!IsAuthenticatedUser ? <Navigate to={'/signup'}/> : (IsOnboarded ? <Navigate to={"/"}/> : <Onboard/>)}  
        >
        </Route>

        <Route
        path='/login'
        element={!IsAuthenticatedUser ? <Login/> : <Navigate to={!IsOnboarded ? "/onboard" : "/"}/>}
        ></Route>
 
        <Route
        path='/notifications'
        element={IsAuthenticatedUser && IsOnboarded ? <Layout><Notification/></Layout> : <Navigate to={"/"}/>}
        >
        </Route> 
        <Route
        path='/chat/:id'
        element={IsAuthenticatedUser && IsOnboarded ? <Layout isSidebar={false}><ChatPage/></Layout> : <Navigate to={"/login"}/>}
        >
        </Route> 
        <Route
        path='/call/:id'
        element={IsAuthenticatedUser && IsOnboarded ? <Layout isSidebar={false}><VideoCall/></Layout> : <Navigate to={"/login"}/>}
        >
        </Route> 
        <Route
        path='/my-requests'
        element={IsAuthenticatedUser && IsOnboarded ? <Layout isSidebar><MyOwnRequests/></Layout> : <Navigate to={"/login"}/>}
        >
        </Route> 
         
      </Routes>   
    </div>
 )   
}

export default App