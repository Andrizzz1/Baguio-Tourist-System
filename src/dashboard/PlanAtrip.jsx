export const Planterip = ()=>{
    return <div>
        <button>back to dashboard</button>
        <h1>Plan a Trip</h1>
        <p>Tell us about your trip and we'll craft an itinerary for you.</p>

        <div className="flex">
            <div>
                <p>1</p> 
                <p>Trip details</p>
            </div>

            ----
            <div>
                <p>2</p> 
                <p>Your itinerary</p>               
            </div>
        </div>

        <div>
            <div>
                <h2>Trip details</h2>
                <p>A few quick questions to personalize your plan.</p>
            </div>
            <div>
                <h2>Tips for Baguio</h2>
                <ul>
                    <li>Cool climate year-round – pack a light jacket</li>
                    <li>Peak season is March–May. Book early!</li>
                    <li>Traffic gets heavy on weekends – plan around it</li>
                    <li>Try local strawberry taho and ube jam</li>
                </ul>
            </div>
        </div>
    </div>
}