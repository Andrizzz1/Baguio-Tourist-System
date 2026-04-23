import { useNavigate } from 'react-router-dom'

export const RegisterAcc = ()=>{
    const navigate = useNavigate()
    return <section>
        <div className="grid grid-cols-2">
            <div>
                <p>BENGUET HIGHLANDS</p>
                <h1>Dicover the Highland Mist</h1>
                <p>join our community of travelers and locals. Get real-time advice on the best spots in the City of Pines</p>
            </div>
            <div>
                <h2>Create Account</h2>
                <p>Start your Cordillera journey today</p>

                <label htmlFor="name">FULL NAME</label>
                <input type="text" id="name" placeholder="juan Dela Cruz" />

                <label htmlFor="email">EMAIL</label>
                <input type="text" id="email" placeholder="name@example.com" />

                <label htmlFor="password">PASSWORD</label>
                <input type="password" id="password" placeholder="juanDela" />
            </div>
        </div>
    </section>
}