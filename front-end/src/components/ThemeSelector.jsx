import { Palette } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { THEMES } from 'src/constants/constants'
import { changeTheme } from 'src/store/themeSlice';


const ThemeSelector = () => {

   const dispatch = useDispatch();


  return (
 <div className="dropdown dropdown-center">
      
      <button tabIndex={0} className="btn-circle btn btn-ghost">
        <Palette />
      </button>
      
      <div
        tabIndex={0}
        className="dropdown-content z-[1] mt-3 w-52 border max-h-80 overflow-y-auto bg-base-100 rounded-box shadow space-y-1 px-1"
      >
        {THEMES.map((themes, i) => (
          <div
            key={i}
            className="w-full btn bg-base-300 justify-between  normal-case"
            onClick={()=>dispatch(changeTheme(themes.name))}
          >
            <Palette className="w-4" />
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