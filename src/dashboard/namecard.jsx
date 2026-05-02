export const NameCard = ()=>{
    const user = JSON.parse(localStorage.getItem('user'))
    const firstName = user?.username?.split(' ')[0] || 'User'
    return <section className="text-black flex justify-center m-5">
        <div className="relative overflow-hidden p-10 h-80 rounded-3xl bg-cover bg-center text-white w-7xl grid" 
        style={{backgroundImage:`linear-gradient(120deg, rgba(4, 120, 87, 0.92), rgba(6, 95, 70, 0.72)),url('/imgs/bg.png')`}}>
            <div className="text-white text-sm bg-emerald-500 w-fit h-fit py-1 px-2  rounded-2xl">weather</div>
                <div>
                    <h1 className="font-semibold text-emerald-50 text-5xl">Kamusta, {firstName}!</h1>
                </div>
            <p className="max-w-xl text-emerald-100">Ready to explore the Summer Capital? Discover hidden trails, local cuisine, and the rich Cordilleran history — all guided by AI.</p>
        </div>
    </section>
}