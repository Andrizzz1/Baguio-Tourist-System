export const Footer =()=>{
    return<div className="w-full mx-auto bg-[#32612D] px-10">
            
            <div className="flex flex-col md:flex-row justify-between gap-8">
                <div>
                    <h3 className="font-bold text-xl">Baguio Tourist System</h3>
                    <p className="text-black-200 mt-2">Making travel easier, one destination at a time.</p>
                  
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
                    <div>
                        <h4 className="font-bold text-xl">Platform</h4>
                        <ul className="mt-2 text-black-200 space-y-1">
                            <li>Features</li>
                            <li>Testimonials</li>
                            <li>FAQ</li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold text-xl">Company</h4>
                        <ul className="mt-2 text-black-200 space-y-1">
                            <li>About Us</li>
                            <li>Careers</li>
                            <li>Contact</li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold text-xl">Legal</h4>
                        <ul className="mt-2 text-black-200 space-y-1">
                            <li>Privacy Policy</li>
                            <li>Terms of Service</li>
                            <li>Cookie Policy</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="font-semi-bold text-xl border-black-400 mt-8 pt-6 text-center text-grey-400">
                <p>&copy; {new Date().getFullYear()} Baguio Tourist System. All rights reserved.</p>
            </div>
        </div>
}

