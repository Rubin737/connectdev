import { Eye, EyeOff, LockKeyhole, LockKeyholeOpen, ShipWheelIcon } from 'lucide-react'
import React, { useState } from 'react'
import signinImg from '../assets/images/signin-img.png';
import { Link } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { loginUser } from 'src/lib/dbAuth';
import ErrorMessage from 'src/components/ErrorMessage';

const Login = () => {

  const [signinData,setSigninData] = useState({
    email:"myemail@gmail.com",
    password:"Rubin@123",
  })

  const queryClient = useQueryClient();

  const [isPassVisible,setIsPassvisble] = useState(false);

  const {mutate:loginMutation,error,isPending,isSuccess} = useMutation({
    mutationFn:loginUser,
    onSuccess:(data)=>{
      queryClient.invalidateQueries({queryKey:["authUser"]})
    },
    onError:(err)=>{
      console.log(err)
    }
  })

  const handleSigninForm = (e)=>{
    e.preventDefault();
    loginMutation(signinData)
  }

  

  return (
    <section data-theme="forest" className="h-screen flex justify-center items-center">
          <div className="w-[600px] flex border rounded-2xl overflow-hidden font-inter">
            <div className="w-1/2 py-8 flex flex-col justify-center px-8">
              <div className="flex items-center gap-x-2 mb-6">
                <ShipWheelIcon color='green' size={35} />
                <h2 className="text-2xl tracking-wider bg-linear-to-r from-green-500 to-green-800 bg-clip-text text-transparent   font-mono  font-bold">Steamify</h2>
              </div>
               
              <form className="flex flex-col gap-y-4"
                onSubmit={handleSigninForm}
              >
                <div className="signup-div">
                  <label className="signup-span">Email address</label>
                  <input type="email" placeholder='mail.site.com' className="input focus:outline-none focus:ring-0 border " value={signinData.email} onChange={(e)=>setSigninData({...signinData,email:e.target.value})} />
                </div>
                <div className="signup-div">
                  <div className='relative'>
                  <label className="signup-span mb-2">Password</label>
                  <input type={isPassVisible?"text" : "password"} placeholder='********' className="input focus:outline-none focus:ring-0 required pr-10" value={signinData.password}  onChange={(e)=>{setSigninData({...signinData,password:e.target.value})}} />
                   { signinData.password && (
                    isPassVisible ?
                    <Eye className='absolute z-10  top-[55%] right-[10%] opacity-50 cursor-pointer ' size={18} onClick={()=>setIsPassvisble(false)} />
                    :
                    <EyeOff className='absolute z-10  top-[55%] right-[10%] opacity-50 cursor-pointer' size={18} onClick={()=>setIsPassvisble(true)} />
                   )
                   }     
                  </div>
                  {
                    error && <ErrorMessage error={error?.response?.data?.message} />
                   }  
                </div>
                <button className='btn btn-accent font-mons'>{!isSuccess ? <LockKeyhole size={18}/> :
                <LockKeyholeOpen size={18}/> }{isPending ? "Logging in..." : (!isSuccess ? "Sign in" : "Sign in Sucessfully") }</button>
                <p className='text-[13px]'>Don't  have an account? <Link to={'/signup'}>
                <strong className='underline text-secondary'>Create One</strong>
                </Link></p>
              </form>
            </div>
    
            <div className="w-1/2 bg-green-950 text-white flex flex-col justify-center items-center py-5 px-4">
              <img src={signinImg} width={300} alt="Signup visual" className="mb-4" />
              <p className="text-center text-sm font-bold">
                Connect with language partners worldwide.
              </p>
              <p className="text-center text-sm font-mons mt-2">
                Practice conversations, make friends, and improve your language skills together.
              </p>
              
            </div>
          </div>
        </section>
      );
}

export default Login