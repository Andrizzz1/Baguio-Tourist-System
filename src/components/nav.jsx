export const NavBar = ()=>{
    return <div className="flex items-center justify-around p-2">
             <h1 className="font-extrabold text-3xl text-green-900 uppercase ">Ask Baguio</h1>
             <div className="flex gap-5 text-green-800 items-center">
                    <a className=" cursor-pointer">For You</a>
                    <a className=" cursor-pointer">About Us</a>
                    <a className=" cursor-pointer text-white font-semibold bg-green-900 px-2 py-1 rounded-2xl">Sign Up</a>
             </div>
        </div>
}