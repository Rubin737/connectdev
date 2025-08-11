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
import Chat from './pages/Chat'


const App = () => {

const {authUser,isLoading,isError,error} =  useAuthUser();

if(isLoading) return <PageLoader/>

const IsAuthenticatedUser = Boolean(authUser?.data);
const IsOnboarded = authUser?.data?.isOnboarded

console.log(IsAuthenticatedUser)

 return (
    <div>
      <Routes>
         <Route
         path='/'
         element={IsAuthenticatedUser && IsOnboarded ? <Home/> : (<Navigate to={!IsAuthenticatedUser ? "/signup" : "/onboard"}/>)}
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
         
      </Routes>   
    </div>
 )   
}

export default App