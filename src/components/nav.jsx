import { useNavigate } from 'react-router-dom'
export const NavBar = ()=>{
    const navigate = useNavigate()
    return <div className="flex font-bold items-center justify-around py-4 max-sm:hidden bg-white items-center-safe">
             <h1 className="font-extrabold text-3xl text-green-900 uppercase max-sm:hidden flex items-center gap-2">
              <h1 className="font-extrabold text-3xl text-green-900 uppercase max-sm:hidden flex items-center gap-2">
              <img src="/imgs/imgss.png" alt="logo" className="w-20 h-20"/>
              Ask Baguio
              </h1>
              </h1>
                     
             <div className="flex gap-9 text-green-800 items-center max-sm:hidden">
                    <a href="#" className=" cursor-pointer 
                    relative
                    after:content-['']
                    after:left-0
                    after:absolute
                    after:-bottom-1
                    after:h-0.5
                    after:w-0
                    after:transition-all
                    after:bg-green-900
                    after:duration-300
                    hover:after:w-full
                    text-xl
                    max-sm:text-sm
                    "onClick={()=>navigate('/')}>For You</a>
                    <a href="#" className=" cursor-pointer
                    relative
                    after:content-['']
                    after:left-0
                    after:absolute
                    after:-bottom-1
                    after:h-0.5
                    after:w-0
                    after:transition-all
                    after:bg-green-900
                    after:duration-300
                    hover:after:w-full
                    text-xl
                    max-sm:text-sm
                    " onClick={()=>navigate('/AboutUs')}>About Us</a>
                    <a href="#" onClick={()=>navigate('/Register')} className="hover:bg-green-600 transition-all duration-400 max-sm:text-sm text-xl cursor-pointer text-white bg-green-900 px-4 py-1.5 rounded-2xl">Sign Up</a>
                 
             </div>
        </div>
}