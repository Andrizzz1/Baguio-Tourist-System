import { DashboardNav } from "./DashboardNav.jsx";
import { NameCard } from "./namecard.jsx";
import { QuickAction } from "./QuickActions.jsx";
import { FeaturedDashboardSpots } from "./FeaturedDashboardSpots.jsx";
import { ShareToCommunity } from "./CommunityShare.jsx";
export const Dashboard = ()=>{
    return <section className="bg-gray-50 min-h-screen pb-10">
        <DashboardNav/>
        <NameCard />
        <QuickAction  />
        <FeaturedDashboardSpots />
        <ShareToCommunity/>
    </section>
}