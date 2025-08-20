import { Globe, MapPinPen,  ShipWheelIcon } from 'lucide-react'
import { useState } from 'react'
import toast from 'react-hot-toast'
import ErrorMessage from 'src/components/ErrorMessage'
import { LANGUAGES } from 'src/constants/constants'
import { useAuthUser } from 'src/hooks/useAuthUser'
import { useOnboarding } from 'src/hooks/useOnboarding'
import userImg from '../assets/images/user.png'

const OnboardingPage = () => {

 const {authUser} = useAuthUser(); 
 const {fullName,bio,profilePic,location,nativeLanguage,learningLanguage,email,} = authUser.data;

 const [formData,setFormData] = useState({
  fullName:fullName || "",
  bio:bio || "",
  profilePic : profilePic || userImg,
  location : location || "Chennai",
  learningLanguage : learningLanguage || "German",
  email : email || "",
  nativeLanguage : nativeLanguage || "English"
 })


 const {updateMutation,isPending,isSuccess,error} = useOnboarding();

 const errorInfo = error?.response?.data || {}
  
  const handleLoginForm = (e)=>{
    e.preventDefault(); 
    updateMutation(formData)
  }


  const changeAvatar = ()=>{
    const profileNumber = Math.floor(Math.random() * 100) + 1;
    const profilePic = `https://avatar.iran.liara.run/public/${profileNumber}`;
    setFormData({...formData,profilePic});
    setTimeout(()=>toast.success(" 🖼 New pic is generated successfully!"),1000)
  }

  return (
    <section  className='flex justify-center items-center py-5  min-h-screen font-semibold '>
      <div className='w-full max-w-xl px-3 sm:px-10 mx-2 sm:mx-0  py-5 border rounded-2xl '>
        <div className='flex items-center justify-center flex-col gap-y-3'>
          <h1 className='text-lg sm:text-xl font-mons'>Complete Your Profile</h1>
          <img src={formData.profilePic} alt="Avatar" className='sm:w-24 w-20' />
          <button onClick={changeAvatar}  className='btn btn-secondary'>{<ShipWheelIcon  size={18}/>}Generate Random Avatar</button>
        </div> 
        <div>
          <form onSubmit={handleLoginForm} 
          className='w-full flex flex-col gap-y-3 mt-4'>
            <div className="signup-div">
              <label className='signup-span'>Full Name</label>
              <input required type="text" value={formData.fullName} onChange={(e)=>setFormData({...formData,fullName:e.target.value})} placeholder='Your Full Name' className='input rounded-3xl focus:outline-none w-full'/>
              {
                error && <ErrorMessage error={errorInfo?.valErrors?.fullName} /> 
              }
            </div>
            <div className='signup-div'>
              <label className='signup-span'>Bio</label>
              <textarea required value={formData.bio} onChange={(e)=>setFormData({...formData,bio:e.target.value})} placeholder='Bio' className='textarea textarea-sm w-full focus:outline-none !text-sm !rounded-xl max-h-[120px] '></textarea>
              {
                error && <ErrorMessage error={errorInfo?.valErrors?.bio} /> 
              }
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-2'>
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
                error && <ErrorMessage error={errorInfo?.valErrors?.language} />
              }
            <div className="signup-div">
              <label className='signup-span'>Location</label>
              <div className='relative'>
                <input required type="text" value={formData.location} onChange={(e)=>setFormData({...formData,location:e.target.value})} placeholder='Chennai, India' className='input rounded-3xl pl-10 focus:outline-none w-full'/>
                <MapPinPen className='absolute left-2 top-1/2 -translate-y-1/2 z-50' size={20}/>
              </div>
              {
                error && <ErrorMessage error={errorInfo?.valErrors?.location} /> 
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

export default OnboardingPage