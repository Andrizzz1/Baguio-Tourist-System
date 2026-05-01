import { DashboardNav } from "./DashboardNav.jsx";
import { NameCard } from "./namecard.jsx";
import { QuickAction } from "./QuickActions.jsx";
export const Dashboard = ()=>{
    return <section className="bg-white min-h-screen ">
        <DashboardNav/>
        <NameCard />
        <QuickAction  />
    </section>
}