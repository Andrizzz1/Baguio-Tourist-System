import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'
export const DashboardNav = ()=>{
    
    return <div className="text-black font-semibold flex justify-around items-center p-2 max-md:hidden">
       <h1 className="text-2xl">Ask<span className="text-green-400">Baguio</span></h1>
       <button>Dashboard</button>
       <button>Explore</button>
       <button>Community</button>

       <div className='flex items-center gap-1'>
        <MagnifyingGlassIcon className="w-5 h-5 text-gray-500" />
        <input className='outline-0' type="text" placeholder="Search spots ...." />
       </div>
    </div>
    
    
    
    
    
}