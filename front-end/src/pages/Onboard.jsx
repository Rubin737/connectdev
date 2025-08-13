import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Globe, MapPinPen,  ShipWheelIcon,  Webhook } from 'lucide-react'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import ErrorMessage from 'src/components/ErrorMessage'
import { LANGUAGES } from 'src/constants/constants'
import { useAuthUser } from 'src/hooks/useAuthUser'
import { updateUser } from 'src/lib/dbAuth'

const Onboard = () => {

 const {authUser} = useAuthUser();
 
 const {fullName,bio,profilePic,isOnboarded,location,nativeLanguage,learningLanguage,email,} = authUser.data;

 const queryClient = useQueryClient();

 const [formData,setFormData] = useState({
  fullName:fullName || "",
  bio:bio || "",
  profilePic : profilePic || "",
  location : location || "Chennai",
  learningLanguage : learningLanguage || "German",
  email : email || "",
  nativeLanguage : nativeLanguage || "English"
 })


 const {mutate:updateMutation,error,isPending,isSuccess} = useMutation({
  mutationFn:updateUser,
  onSuccess:(data)=>{
    queryClient.invalidateQueries({queryKey:["authUser"]})
  },
  onError:(err)=>{
    console.log(err);
    toast.success("Invalid Inputs")
  },
  retry:false,

 })

  
  const handleLoginForm = (e)=>{
    e.preventDefault(); 
    updateMutation(formData)
  }


  const changeAvatar = ()=>{
    const profileNumber = Math.floor(Math.random() * 100) + 1;
    const profilePic = `https://avatar.iran.liara.run/public/${profileNumber}`;
    console.log(profilePic)
    setFormData({...formData,profilePic})
  }

  return (
    <section data-theme="dim" className='flex justify-center items-center py-5  min-h-screen font-semibold '>
      <div className='w-xl px-10 py-3 border rounded-2xl'>
        <div className='flex items-center justify-center flex-col gap-y-3'>
          <h1 className='text-lg font-mons'>Complete Your Profile</h1>
          <img src={formData.profilePic} alt="" className='w-24 h-24' />
          <button onClick={changeAvatar}  className='btn btn-secondary'>{<ShipWheelIcon  size={18}/>}Generate Random Avatar</button>
        </div> 
        <div>
          <form onSubmit={handleLoginForm} 
          className='w-full flex flex-col gap-y-3'>
            <div className="signup-div">
              <label className='signup-span'>Full Name</label>
              <input required type="text" value={formData.fullName} onChange={(e)=>setFormData({...formData,fullName:e.target.value})} placeholder='Your Full Name' className='input rounded-3xl focus:outline-none w-full'/>
              {
                error && <ErrorMessage error={error.response?.data?.valErrors.fullName} /> 
              }
            </div>
            <div className='signup-div'>
              <label className='signup-span'>Bio</label>
              <textarea required value={formData.bio} onChange={(e)=>setFormData({...formData,bio:e.target.value})} placeholder='Bio' className='textarea textarea-sm w-full focus:outline-none !text-sm !rounded-xl max-h-[120px] '></textarea>
              {
                error && <ErrorMessage error={error.response?.data?.valErrors.bio} /> 
              }
            </div>
            <div className='grid grid-cols-2 gap-x-2'>
              <div className='flex flex-col gap-y-2'>
               <label className='signup-span'>Native Language</label>
               <select   className="select focus:outline-none rounded-3xl"
                value={formData.nativeLanguage}
                onChange={(e)=>setFormData({...formData,nativeLanguage:e.target.value})}
               >
                <option disabled={true}>Select you language</option>
                {
                  LANGUAGES.map(language=>(
                    <option  key={language}>{language}</option>
                  ))
                }
              </select>
              </div>
              <div className='flex flex-col gap-y-2'>
               <label className='signup-span'>Learning Language</label>
               <select  className="select focus:outline-none rounded-3xl"
                value={formData.learningLanguage}
                onChange={(e)=>setFormData({...formData,learningLanguage:e.target.value})}
               >
                <option className='rounded-md' disabled={true}>Select you language</option>
                {
                  LANGUAGES.map(language=>(
                    <option  key={language}>{language}</option>
                  ))
                }
              </select>
              </div>
            </div>
            {
                error && <ErrorMessage error={error.response?.data?.valErrors.language} />
              }
            <div className="signup-div">
              <label className='signup-span'>Location</label>
              <div className='relative'>
                <input required type="text" value={formData.location} onChange={(e)=>setFormData({...formData,location:e.target.value})} placeholder='Chennai, India' className='input rounded-3xl pl-10 focus:outline-none w-full'/>
                <MapPinPen className='absolute left-2 top-[25%] z-50' size={20}/>
              </div>
              {
                error && <ErrorMessage error={error.response?.data?.valErrors.location} /> 
              }
            </div>
            <button
             className={`btn btn-primary rounded-3xl font-mons  `}>{isPending?<ShipWheelIcon  size={20} className='animate-spin'/>:<Globe  size={20}/>} {isSuccess? "Onboarding Sucessfully!" : "Complete Onboarding"}</button>
          </form>
        </div>
      </div>
    </section>
  )

}

export default Onboard