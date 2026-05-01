import { BookmarkIcon } from '@heroicons/react/24/outline'
import { MapPinIcon } from '@heroicons/react/24/outline'
import { MapIcon } from '@heroicons/react/24/outline'
function Cardholder(props){
    const {icon,name, desc} = props
    return <div className='text-black border w-80 rounded-2xl p-3 flex flex-col justify-center'>
        {icon}
        <h1>{name}</h1>
        <p>{desc}</p>
    </div>
}


export const QuickAction = () =>{
    return <div className='flex flex-wrap justify-center gap-40 max-2xl:gap-15 px-1'>
        <Cardholder 
        icon = {<BookmarkIcon className="w-6 h-6 text-gray-500" />}
        name = "Saved Spots"
        desc = "Your favorite tourist destinations"
        />
        <Cardholder 
        icon = {<MapIcon className="w-6 h-6 text-green-600" />}
        name = "Plan a Trip"
        desc = "Create a simple Baguio itinerary based on your saved places.s"
        />
        <Cardholder 
        icon = {<MapPinIcon className="w-7 h-7 text-green-600" />}
        name = "Explore Places"
        desc = "Discover popular tourist spots, landmarks, and local attractions in Baguio."
        />
    </div>
}