import { useEffect, useState } from "react";
const weather_api = import.meta.env.VITE_open_weather_api;

export const NameCard = () => {
    const user = JSON.parse(localStorage.getItem('user'))
    const firstName = user?.username?.split(' ')[0] || 'User';
    const [weather, setWeather] = useState()
    const [savecount, setSavecount] = useState(0)
    const [visitedcount, setVisitedcount] = useState(0)
    const fetchDATA = async () => {
        try {
            const weatherRes = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=16.402332&lon=120.596008&appid=${weather_api}&units=metric`)
            const WeatherData = await weatherRes.json();
            console.log(WeatherData)
            setWeather({ ...WeatherData })
        } catch (err) {
            console.log(err)
        }
    }

    const fetchvisitedCount = async ()=>{
        const user = JSON.parse(localStorage.getItem("user"));
        const userId = user?.id || user?.users_id;

        if (!userId) return;
        try{
            const visitRes = await fetch(`/api/visited-spots?userId=${userId}`);
            const visitData = await visitRes.json();

            if(visitRes.ok){
                setVisitedcount(visitData.totalVisited)
            }
        }catch(err){
            console.log(err)
        }
    }
    const fetchSavedCount = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user?.id || user?.users_id;

    if (!userId) return;

    try {
        const res = await fetch(`/api/saved-spots?userId=${userId}&countOnly=true`);
        const data = await res.json();

        if (res.ok) {
            setSavecount(data.totalSaved);
        }
    } catch (err) {
        console.log(err);
        }
    };
    useEffect(() => { fetchDATA();
                    fetchSavedCount();
                    fetchvisitedCount();
     }, [])

    return <section className="text-black flex justify-center m-5">
        <style>{`
            @keyframes cardIn {
                from { opacity: 0; transform: translateY(14px) scale(0.98); }
                to   { opacity: 1; transform: translateY(0) scale(1); }
            }
            @keyframes badgeIn {
                from { opacity: 0; transform: translateY(-8px); }
                to   { opacity: 1; transform: translateY(0); }
            }
            @keyframes headingIn {
                from { opacity: 0; transform: translateX(-16px); }
                to   { opacity: 1; transform: translateX(0); }
            }
            @keyframes subtitleIn {
                from { opacity: 0; transform: translateY(10px); }
                to   { opacity: 1; transform: translateY(0); }
            }
            .nc-card {
                animation: cardIn 0.5s cubic-bezier(0.4, 0, 0.2, 1) both;
                transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s ease;
            }
            .nc-card:hover {
                transform: translateY(-3px) scale(1.005);
                box-shadow: 0 24px 48px rgba(4, 120, 87, 0.28);
            }
            .nc-badge {
                animation: badgeIn 0.45s cubic-bezier(0.34, 1.56, 0.64, 1) 0.25s both;
            }
            .nc-heading {
                animation: headingIn 0.55s cubic-bezier(0.4, 0, 0.2, 1) 0.4s both;
            }
            .nc-subtitle {
                animation: subtitleIn 0.55s ease 0.55s both;
            }
        `}</style>

        <div className="nc-card relative overflow-hidden p-10 rounded-3xl h-auto grid grid-cols-2 max-sm:grid-cols-1 bg-cover items-center bg-center text-white w-7xl"
            style={{ backgroundImage: `linear-gradient(120deg, rgba(4, 120, 87, 0.92), rgba(6, 95, 70, 0.72)),url('/imgs/bg.png')` }}>
            <div>
                <div className="nc-badge font-semibold text-white text-sm bg-emerald-500 w-fit h-fit py-1 px-2 rounded-2xl">
                    {weather?.main?.temp || "Loading temperature..."}°C · {weather?.weather?.[0]?.description || "Loading weather..."}
                </div>
                <div>
                    <h1 className="nc-heading font-semibold text-emerald-50 text-5xl">Kamusta, {firstName}!</h1>
                </div>
                <p className="nc-subtitle max-w-xl text-emerald-100">Ready to explore the Summer Capital? Discover hidden trails, local cuisine, and the rich Cordilleran history — all guided by AI.</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-4 text-center  gap-x-0.5 place-items-center justify-items-center justify-center text-emerald-100  text-xs">
                <div className="bg-green-500/15 p-2 rounded-2xl w-20 h-20 flex flex-col justify-around"><p className="text-xl">{visitedcount}</p><p >Spots Visited</p></div>
                <div className="bg-green-500/15  p-2 rounded-2xl w-20 h-20 flex flex-col justify-around"><p className="text-xl">{savecount}</p><p className="mt-1">Saved Places</p></div>
                <div className="bg-green-500/15  p-2 rounded-2xl  w-20 h-20 flex flex-col justify-around"><p className="text-xl">0</p><p className="mt-1">Plannned Trips</p></div>
                <div className="bg-green-500/15  p-2 rounded-2xl w-20 h-20 flex flex-col justify-around"><p className="text-xl">0</p><p className="mt-1">Followers</p></div>
            </div>
        </div>

    </section>
}
