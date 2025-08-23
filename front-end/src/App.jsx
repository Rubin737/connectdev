import { Routes,Route } from 'react-router-dom'
import Login from './pages/LoginPage'
import { Navigate } from 'react-router-dom'
import PageLoader from './components/utilComponents/PageLoader'
import { useAuthUser } from './hooks/useAuthUser'
import { useSelector } from 'react-redux'
import ChatPage from './pages/ChatPage'
import 'stream-chat-react/dist/css/v2/index.css';
import toast, { Toaster } from 'react-hot-toast'
import Layout from './components/layout/Layout'
import HomePage from './pages/HomePa'
import SignupPage from './pages/SignupPage'
import OnboardingPage from './pages/OnboardingPage'
import NotificationsPage from './pages/NotificationsPage'
import VideoCallingPage from './pages/VideoCallingPage'
import MyRequestsPage from './pages/MyRequestsPage'
import ErrorPage from './pages/ErrorPage'
import { useNetworkStatus } from './hooks/useNetworkStatus'
import { useEffect } from 'react'

const App = () => {
const theme = useSelector(store=>store.theme);
const {authUser,isLoading,isError,error} =  useAuthUser();

const isOnline = useNetworkStatus();

useEffect(() => {
    if (isOnline) {
      toast.success("Back online ✅");
    } else {
      toast.error("You are offline ❌");
    }
  }, [isOnline]);


if(isLoading) return <PageLoader/>

const IsAuthenticatedUser = Boolean(authUser?.data);
const IsOnboarded = authUser?.data?.isOnboarded



 return (
    <div data-theme={theme}>
      <Toaster position="top-right" reverseOrder={false} />
      <Routes>
         <Route
         path='/'
         element={IsAuthenticatedUser && IsOnboarded ? <Layout isSidebar={true} ><HomePage/></Layout> : (<Navigate to={!IsAuthenticatedUser ? "/signup" : "/onboard"}/>)}
         ></Route>

         <Route
         path='/signup'
         element={!IsAuthenticatedUser ? <SignupPage/> : <Navigate to={!IsOnboarded ? "/onboard" : "/"}/>}
         >
         </Route>
      
        <Route
        path='/onboard'
        element={!IsAuthenticatedUser ? <Navigate to={'/signup'}/> : (IsOnboarded ? <Navigate to={"/"}/> : <OnboardingPage/>)}  
        >
        </Route>

        <Route
        path='/login'
        element={!IsAuthenticatedUser ? <Login/> : <Navigate to={!IsOnboarded ? "/onboard" : "/"}/>}
        ></Route>
 
        <Route
        path='/notifications'
        element={IsAuthenticatedUser && IsOnboarded ? <Layout><NotificationsPage/></Layout> : <Navigate to={"/"}/>}
        >
        </Route> 
        <Route
        path='/chat/:id'
        element={IsAuthenticatedUser && IsOnboarded ? <Layout isSidebar={false}><ChatPage/></Layout> : <Navigate to={"/login"}/>}
        >
        </Route> 
        <Route
        path='/call/:id'
        element={IsAuthenticatedUser && IsOnboarded ? <Layout isSidebar={false}><VideoCallingPage/></Layout> : <Navigate to={"/login"}/>}
        >
        </Route> 
        <Route
        path='/my-requests'
        element={IsAuthenticatedUser && IsOnboarded ? <Layout isSidebar><MyRequestsPage/></Layout> : <Navigate to={"/login"}/>}
        >
        </Route>

        <Route path="*" element={<ErrorPage />} />
 
         
      </Routes>   
    </div>
 )   
}

export default App