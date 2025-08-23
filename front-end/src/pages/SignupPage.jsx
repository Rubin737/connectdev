import { useState } from 'react';
import signupImg from '../assets/images/signup-img.png'; 
import { Eye, EyeOff, ShipWheelIcon } from 'lucide-react'; 
import { Link } from 'react-router-dom';
import ErrorMessage from 'src/components/utilComponents/ErrorMessage';
import { useSignup } from 'src/hooks/useSignup';
import toast from 'react-hot-toast';
import ToastContent from 'src/components/utilComponents/ToastContent';


const SignupPage = () => {

  const [signupData,setSignupData] = useState({fullName:"",email:"",password:""});
  const [isChecked,setIsChecked] = useState(false);
  const [isPassVisible,setIsPassvisble] = useState(false)

  const {createMutation,isPending,error} = useSignup()

  const handleFormSubmit = (e)=>{
    e.preventDefault();
    createMutation(signupData); 
    
  } 
  
  const showTermsAndCondtions = ()=>{
    toast((t) => <ToastContent data={t}/>, {
    duration: 10000, 
  });
  }

  const errorInfo = error?.response?.data || {};

  return (
    <section className="min-h-screen flex justify-center items-center px-4 py-6">
  <div className="w-full max-w-4xl flex flex-col md:flex-row border-primary border rounded-2xl overflow-hidden font-inter shadow-lg">
    
   
    <div className="w-full md:w-1/2 py-8 flex flex-col justify-center px-6 sm:px-10">
      <div className="flex items-center  gap-x-2 mb-6 justify-center md:justify-start">
        <ShipWheelIcon className='text-primary' size={35} />
        <h2 className="text-2xl sm:text-3xl tracking-wider bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent font-mono font-bold">
          Streamify
        </h2>
      </div>

      <form
        className="flex flex-col gap-y-4"
        onSubmit={handleFormSubmit}
      >
        
        <div className="signup-div">
          <label className="signup-span">Your name</label>
          <input
            type="text"
            placeholder="Enter your name"
            className="input focus:outline-none focus:ring-0 w-full"
            value={signupData.fullName}
            onChange={(e) =>
              setSignupData({ ...signupData, fullName: e.target.value })
            }
          />
          {error && (
            <ErrorMessage error={errorInfo?.valErrors?.data} />
          )}
        </div>

        
        <div className="signup-div">
          <label className="signup-span">Email address</label>
          <input
            type="email"
            placeholder="mail.site.com"
            className="input focus:outline-none focus:ring-0 w-full border"
            value={signupData.email}
            onChange={(e) =>
              setSignupData({ ...signupData, email: e.target.value })
            }
          />
          {error && (
            <ErrorMessage error={errorInfo?.valErrors?.email} />
          )}
          {error &&
          errorInfo?.message !== "validation failed" ? (
            <p className="text-sm text-error">
              {errorInfo?.message}
            </p>
          ) : (
            ""
          )}
        </div>

        
        <div className="signup-div">
          <div className="relative">
            <label className="signup-span">Password</label>
            <input
              type={isPassVisible ? "text" : "password"}
              placeholder="********"
              className="input focus:outline-none focus:ring-0 required pr-10 w-full"
              value={signupData.password}
              onChange={(e) =>
                setSignupData({ ...signupData, password: e.target.value })
              }
            />
            {signupData.password && (
              isPassVisible ? (
                <Eye
                  className="absolute z-10 top-[55%] right-3 opacity-50 cursor-pointer"
                  size={18}
                  onClick={() => setIsPassvisble(false)}
                />
              ) : (
                <EyeOff
                  className="absolute z-10 top-[55%] right-3 opacity-50 cursor-pointer"
                  size={18}
                  onClick={() => setIsPassvisble(true)}
                />
              )
            )}
          </div>
          {error && (
            <ErrorMessage error={errorInfo?.valErrors?.password} />
          )}
        </div>

        <div className="flex items-start gap-x-2 text-sm">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={(e) => setIsChecked(e.target.checked)}
            className="w-4 h-4 checkbox-sm mt-1"
          />
          <p className="font-mons text-[11px] sm:text-xs">
            I agree to the{" "}
            <strong onClick={showTermsAndCondtions} className="hover:underline cursor-pointer">terms and service</strong> and{" "}
            <strong className="hover:underline cursor-pointer underline-offset-1">
              privacy policy
            </strong>
          </p>
        </div>

        
        <div className="flex flex-col gap-y-2">
          <button
            disabled={!isChecked}
            className="btn btn-accent"
          >
            {isPending ? "Creating account..." : "Create account"}
          </button>
          <p className="text-sm text-center md:text-left">
            Already have an account?{" "}
            <Link to={"/login"}>
              <strong className="underline text-secondary">Sign in</strong>
            </Link>
          </p>
        </div>
      </form>
    </div>

    <div className="w-full md:w-1/2  hidden bg-green-950 text-white md:flex flex-col justify-center items-center py-8 px-6">
      <img
        src={signupImg}
        width={250}
        alt="Signup visual"
        className="mb-4 max-w-full"
      />
      <p className="text-center text-sm font-bold">
        Connect with language partners worldwide.
      </p>
      <p className="text-center text-sm font-mons mt-2">
        Practice conversations, make friends, and improve your language skills
        together.
      </p>
    </div>
  </div>
   </section>

  );
};

export default SignupPage;
