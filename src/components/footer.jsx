export const Footer =()=>{
    return<div className="p-3 w-full mx-auto bg-[#32612D] px-10 max-sm:text-center">
            
            <div className="flex flex-col md:flex-row justify-between gap-8">
                <div>
                    <h3 className="font-semibold text-3xl text-white">Baguio Tourist System</h3>
                    <p className="text-green-100 mt-2">Explore Baguio with smarter travel guidance.</p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
                    <div>
                        <h4 className="font-semibold text-white">Platform</h4>
                        <ul className="mt-2 text-green-100 space-y-1">
                            <li className="cursor-pointer hover:text-green-200 " >Tourist Spots</li>
                            <li className="cursor-pointer hover:text-green-200">Features</li>
                            <li className="cursor-pointer hover:text-green-200">About the Platform</li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold text-white">Team</h4>
                        <ul className="mt-2 text-green-100 space-y-1">
                            <li className="cursor-pointer hover:text-green-200  ">About Us</li>
                            <li className="cursor-pointer hover:text-green-200 ">Contact</li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold text-white">Legal</h4>
                        <ul className="mt-2 text-green-100 space-y-1">
                            <li className="cursor-pointer hover:text-green-200 ">Privacy Policy</li>
                            <li className="cursor-pointer hover:text-green-200 ">Terms of Service</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className=" border-green-800 mt-8 pt-6 text-center text-green-400">
                <p>&copy; {new Date().getFullYear()} Baguio Tourist System. All rights reserved.</p>
            </div>
        </div>
}

