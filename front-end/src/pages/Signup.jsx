import React, { useState } from 'react';
import signupImg from '../assets/images/signup-img.png'; 
import { Eye, EyeOff, ShipWheelIcon } from 'lucide-react'; 
import { Link, useNavigate } from 'react-router-dom';
import { QueryClient, useMutation, useQueryClient } from '@tanstack/react-query';
import { createUser } from 'src/lib/dbAuth';
import ErrorMessage from 'src/components/ErrorMessage';


const Signup = () => {
  const queryClient = useQueryClient() 
  const [signupData,setSignupData] = useState({fullName:"",email:"",password:""});
  const [isChecked,setIsChecked] = useState(false);
  const [isPassVisible,setIsPassvisble] = useState(false)

  const navigate = useNavigate()

  const {mutate:createMutation,error,isPending} = useMutation({
    mutationFn:createUser,
    onSuccess:(data)=>{
      queryClient.invalidateQueries({queryKey:["authUser"]})
      navigate("/onboard")
    }
  })

  const handleFormSubmit = (e)=>{
    e.preventDefault();
    createMutation(signupData); 
    
  }    

  return (
    <section data-theme="forest" className="h-screen flex justify-center items-center">
      <div className="w-[800px] flex border rounded-2xl overflow-hidden font-inter">
        <div className="w-1/2 py-8 flex flex-col justify-center px-8">
          <div className="flex items-center gap-x-2 mb-6">
            <ShipWheelIcon color='green' size={35} />
            <h2 className="text-2xl tracking-wider bg-linear-to-r from-green-500 to-green-800 bg-clip-text text-transparent   font-mono  font-bold">Steamify</h2>
          </div>
           
          <form className="flex flex-col gap-y-4"
            onSubmit={handleFormSubmit}
          >
            <div className="signup-div">
              <label className="signup-span">Your name</label>
              <input type="text" placeholder='enter your name' className="input focus:outline-none focus:ring-0" value={signupData.fullName} onChange={(e)=>setSignupData({...signupData,fullName:e.target.value})}/>
              
              {
                 error && <ErrorMessage error={error?.response?.data?.valErrors?.fullName} />
              }
            </div>
            <div className="signup-div">
              <label className="signup-span">Email address</label>
              <input type="email" placeholder='mail.site.com' className="input focus:outline-none focus:ring-0 border " value={signupData.email} onChange={(e)=>setSignupData({...signupData,email:e.target.value})} />
              {
                 error && <ErrorMessage error={error?.response?.data?.valErrors?.email} />
              }
              {
               error && error?.response?.data?.message !== "validation failed" ? <p className='text-sm text-error'>{error.response.data.message}</p> : ""
              
              }
            </div>
            <div className="signup-div">
              <div className='relative'>
              <label className="signup-span">Password</label>
              <input type={isPassVisible?"text" : "password"} placeholder='********' className="input focus:outline-none focus:ring-0 required pr-10" value={signupData.password}  onChange={(e)=>{setSignupData({...signupData,password:e.target.value})}} />
               { signupData.password && (
                isPassVisible ?
                <Eye className='absolute z-10  top-[55%] right-[10%] opacity-50 cursor-pointer ' size={18} onClick={()=>setIsPassvisble(false)} />
                :
                <EyeOff className='absolute z-10  top-[55%] right-[10%] opacity-50 cursor-pointer' size={18} onClick={()=>setIsPassvisble(true)} />
               )
               }            
              </div>
              {
                  error && <ErrorMessage error={error?.response?.data?.valErrors?.password} />

              }
            </div>

            <div className="flex items-center gap-x-2 text-sm">
                <input type="checkbox" checked={isChecked}  onChange={(e)=>setIsChecked(e.target.checked)} className="w-4 h-4 aspect-square checkbox-sm"/>
              <p className='font-mons text-[11px]'>
                I agree to the <strong className='hover:underline'>terms and service</strong> and{' '}
                <strong className='hover:underline underline-offset-1'>privacy policy</strong>
              </p>
            </div>
            <div className='flex flex-col gap-y-2'>
              <button disabled={isChecked ? false : true} className="btn btn-accent">{isPending?"Creating account.....":"Create account"}</button>
            <p className="text-sm">
              Already have an account? <Link to={'/login'}><strong className='underline text-secondary'>Sign in</strong></Link>
            </p>
            </div>
          </form>
        </div>

        <div className="w-1/2 bg-green-950 text-white flex flex-col justify-center items-center py-5 px-4">
          <img src={signupImg} width={300} alt="Signup visual" className="mb-4" />
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
};

export default Signup;
