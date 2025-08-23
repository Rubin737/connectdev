import { Palette } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { THEMES } from 'src/constants/constants'
import { changeTheme } from 'src/store/themeSlice';


const ThemeSelector = () => {

   const dispatch = useDispatch();


  return (
 <div className="dropdown dropdown-center">
      
      <button tabIndex={0} className="nav-icons-outer">
        <Palette className='size-3 sm:size-5' />
      </button>
      
      <div
        tabIndex={0}
        className="dropdown-content z-[1] mt-3 sm:w-52 w-42 border sm:max-h-80 h-30 overflow-y-auto bg-base-100 rounded-box shadow space-y-1 px-1"
      >
        {THEMES.map((themes, i) => (
          <div
            key={i}
            className="w-full btn btn-sm sm:btn-sm bg-base-300 justify-between  normal-case"
            onClick={()=>dispatch(changeTheme(themes.name))}
          >
            <Palette className="sm:w-4 w-3 text-primary" />
            <p>{themes.name}</p>
            <div className="flex items-center gap-x-1">
              {themes.colors.map((eachClr, index) => (
                <span
                  key={index}
                  className="size-2 rounded-full"
                  style={{ backgroundColor: eachClr }}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ThemeSelector