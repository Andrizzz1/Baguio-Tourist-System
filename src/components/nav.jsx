export const NavBar = ()=>{
       
    return <div className="flex items-center justify-around py-4 max-sm:hidden ">
             <h1 className="font-extrabold text-3xl text-green-900 uppercase max-sm:hidden">Ask Baguio</h1>
             <div className="flex gap-5 text-green-800 items-center max-sm:hidden">
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
                    ">For You</a>
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
                    ">About Us</a>
                    <a href="#" className="hover:bg-green-600 transition-all duration-400 max-sm:text-sm text-xl cursor-pointer text-white bg-green-900 px-3 py-0.5 rounded-2xl">Sign Up</a>
                 
             </div>
        </div>
}