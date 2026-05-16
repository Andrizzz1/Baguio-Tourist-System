import { useState, useEffect } from "react"
import { DashboardNav } from "../dashboard/DashboardNav"
import { MapPinIcon, StarIcon, SparklesIcon, ClockIcon, XMarkIcon } from "@heroicons/react/24/solid"
import { ArrowLeftIcon } from "@heroicons/react/24/outline"

/* ─────────────────────────────────────────────
   Inject keyframe animations once
───────────────────────────────────────────── */
const STYLES = `
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(24px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @keyframes scaleIn {
    from { opacity: 0; transform: scale(0.94) translateY(16px); }
    to   { opacity: 1; transform: scale(1)    translateY(0); }
  }
  @keyframes slideUp {
    from { opacity: 0; transform: translateY(40px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes shimmer {
    0%   { background-position: -200% center; }
    100% { background-position:  200% center; }
  }

  .anim-fade-up   { animation: fadeUp  0.55s cubic-bezier(.22,.68,0,1.2) both; }
  .anim-scale-in  { animation: scaleIn 0.45s cubic-bezier(.22,.68,0,1.15) both; }
  .anim-fade-in   { animation: fadeIn  0.4s ease both; }

  /* staggered children */
  .stagger > *:nth-child(1) { animation-delay: 0.05s; }
  .stagger > *:nth-child(2) { animation-delay: 0.12s; }
  .stagger > *:nth-child(3) { animation-delay: 0.19s; }
  .stagger > *:nth-child(4) { animation-delay: 0.26s; }
  .stagger > *:nth-child(5) { animation-delay: 0.33s; }
  .stagger > *:nth-child(6) { animation-delay: 0.40s; }

  /* Card hover lift */
  .card-lift {
    transition: transform 0.35s cubic-bezier(.22,.68,0,1.2),
                box-shadow 0.35s ease;
  }
  .card-lift:hover {
    transform: translateY(-6px) scale(1.015);
    box-shadow: 0 20px 40px -12px rgba(0,0,0,0.14);
  }

  /* Image zoom inside cards */
  .img-zoom {
    transition: transform 0.55s cubic-bezier(.22,.68,0,1.1);
  }
  .card-lift:hover .img-zoom {
    transform: scale(1.08);
  }

  /* Overlay shimmer on hover */
  .card-lift::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      105deg,
      transparent 40%,
      rgba(255,255,255,0.08) 50%,
      transparent 60%
    );
    background-size: 200% 100%;
    opacity: 0;
    transition: opacity 0.3s ease;
    pointer-events: none;
    border-radius: inherit;
  }
  .card-lift:hover::after {
    opacity: 1;
    animation: shimmer 0.7s ease forwards;
  }

  /* Modal backdrop */
  .modal-backdrop {
    animation: fadeIn 0.25s ease both;
  }
  .modal-panel {
    animation: scaleIn 0.38s cubic-bezier(.22,.68,0,1.15) both;
  }

  /* Modal image overlay reveal */
  .modal-gradient {
    background: linear-gradient(to top, rgba(0,0,0,0.72) 0%, transparent 60%);
    transition: opacity 0.4s ease;
  }

  /* Button press effect */
  .btn-press {
    transition: transform 0.15s ease, background-color 0.2s ease, box-shadow 0.2s ease;
  }
  .btn-press:hover  { transform: translateY(-1px); box-shadow: 0 6px 20px -4px rgba(22,163,74,0.45); }
  .btn-press:active { transform: translateY(1px);  box-shadow: none; }

  .btn-ghost {
    transition: transform 0.15s ease, background-color 0.2s ease;
  }
  .btn-ghost:hover  { transform: translateY(-1px); }
  .btn-ghost:active { transform: translateY(1px); }

  /* Star badge pulse on mount */
  @keyframes badgePop {
    0%   { transform: scale(0.7); opacity: 0; }
    70%  { transform: scale(1.12); }
    100% { transform: scale(1);   opacity: 1; }
  }
  .badge-pop { animation: badgePop 0.4s cubic-bezier(.22,.68,0,1.4) 0.25s both; }

  /* Highlight pill entrance */
  .pill-appear {
    animation: fadeUp 0.35s cubic-bezier(.22,.68,0,1.2) both;
  }

  /* Close button spin */
  .close-btn {
    transition: transform 0.25s cubic-bezier(.22,.68,0,1.4), background-color 0.2s ease;
  }
  .close-btn:hover { transform: rotate(90deg) scale(1.1); }

  /* "View details →" arrow slide */
  .arrow-link {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    transition: gap 0.2s ease, color 0.2s ease;
  }
  .arrow-link:hover { gap: 8px; }
`

function injectStyles() {
  if (typeof document === "undefined") return
  if (document.getElementById("explore-transitions")) return
  const el = document.createElement("style")
  el.id = "explore-transitions"
  el.textContent = STYLES
  document.head.appendChild(el)
}

const topPlaces = [
    {
        name: "Burnham Park",
        image: "/imgs/botanical-garden.jpg",
        rating: 4.8,
        location: "Harrison Road, Baguio City, Philippines.",
        badge: "Iconic",
        badgeColor: "bg-emerald-600",
        hours: "Open 24 hours",
        entry: "Free entry",
        about: "American architect Daniel Hudson Burnham created Burnham Park, a 32.84-hectare urban haven in the center of Baguio City, Philippines, in 1904. With a man-made lagoon, rose garden, and kids' playground, it acts as a major leisure center for walking, biking, and boating. It is usually open around-the-clock and requires no admission.",
        highlights: ["Boating lagoon", "Rose Garden", "Skating rink", "Bike rentals"],
    },
    {
        name: "Mines View Park",
        image: "/imgs/mines-view-park.jpg",
        rating: 4.6,
        location: "Outlook Drive, Baguio City, Philippines.",
        badge: "Scenic",
        badgeColor: "bg-blue-500",
        hours: "6:00 AM – 7:00 PM",
        entry: "₱10",
        about: "Mines View Park is a renowned observation deck in the northeastern limits of Baguio City, Philippines, that provides breathtaking panoramic views of the Cordillera Mountains and the abandoned gold and copper mines of Itogon. It is a popular tourist destination, known for its viewing deck, traditional cultural costumes, and gift shops.",
        highlights: ["Mountain overlook", "Souvenir shops", "Photo spots", "Indigenous crafts"],
    },
    {
        name: "Camp John Hay",
        image: "/imgs/camp-john-hay.jpg",
        rating: 4.7,
        location: "Loakan Road, Baguio City, Philippines.",
        badge: "Nature",
        badgeColor: "bg-green-600",
        hours: "Open 24 hours",
        entry: "₱85",
        about: "Camp John Hay is one of the most popular tourist attractions in Baguio City. During the early 1900s, it served as an American military rest and recreation base before evolving into a mountain resort and eco-tourism destination. Today, it is noted for its pine trees, cold weather, tranquil ambiance, and historical sites.",
        highlights: ["Pine forests", "Golf course", "Heritage trails", "Restaurants"],
    },
    {
        name: "BenCab Museum",
        image: "/imgs/bencab-museum.jpg",
        rating: 4.9,
        location: "Km. 6 Asin Road, Tadiangan, Tuba, Benguet, Philippines.",
        badge: "Art",
        badgeColor: "bg-purple-600",
        hours: "9:00 AM – 6:00 PM",
        entry: "₱200",
        about: "The BenCab Museum is a prominent art and cultural destination near Baguio City. Founded by National Artist Benedicto Cabrera, it showcases Filipino artworks, Cordilleran antiquities, lovely gardens, and breathtaking mountain views. Visitors love the tranquil atmosphere, eco-trails, and relaxing experience in nature.",
        highlights: ["Contemporary art", "Indigenous artifacts", "Hillside café", "Garden trail"],
    },
]

const otherPlaces = [
    {
        name: "Tam-awan Village",
        location: "366-C Long Long Benguet Road, Pinsao Proper, Baguio City, Benguet, Philippines",
        rating: 4.5,
        badge: "Hidden Gem",
        badgeColor: "bg-amber-100 text-amber-700",
        hours: "7:00 AM – 8:00 PM",
        entry: "₱100",
        description: "A reconstructed Cordillera village with authentic Ifugao and Kalinga huts. Catch live indigenous dance performances...",
        about: "Tam-awan Village is a cultural and artistic destination in Baguio City that showcases the rich heritage of the Cordillera region. The village features traditional huts, local artworks, galleries, and peaceful gardens surrounded by pine trees. Visitors can experience indigenous culture, admire paintings from local artists, and enjoy the calm mountain atmosphere. It is also a popular place for photography, relaxation, and learning about the traditions of Northern Luzon.",
        highlights: ["Cultural shows", "Kalinga huts", "Art workshops", "City views"],
        image: "https://elretirobaguio.com/wp-content/uploads/2022/02/Tam-Awan-Village-1024x683.jpg",
    },
    {
        name: "Wright Park",
        location: "Romulo Drive, Baguio City, Benguet, Philippines.",
        rating: 4.4,
        badge: "Family Friendly",
        badgeColor: "bg-green-100 text-green-700",
        hours: "6:00 AM - 10:00 PM",
        entry: "Free entry",
        description: "Famous for its 'Pool of Pines' reflecting pond and horseback riding circle. A short stroll from The Mansion...",
        about: "Wright Park is one of the most famous tourist attractions in Baguio City, known for its long pool, tall pine trees, and horseback riding activities. Located near The Mansion, the park offers a relaxing environment where visitors can enjoy walking, taking photos, and experiencing the cool mountain air. Horse rentals are popular among tourists, especially families and children. The peaceful scenery and natural beauty make Wright Park a favorite destination for both locals and travelers.",
        highlights: ["Horseback riding", "Pool of Pines", "Pine tree walk", "Photo spots"],
        image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2e/98/d7/ab/caption.jpg?w=900&h=500&s=1",
    },
    {
        name: "Diplomat Hotel Ruins",
        location: "Dominican Hill, Mirador Road, Baguio City, Benguet, Philippines.",
        rating: 4.2,
        badge: "Hidden Gem",
        badgeColor: "bg-amber-100 text-amber-700",
        hours: "7:00 AM – 5:00 PM",
        entry: "₱10",
        description: "An abandoned hilltop retreat house with a haunting WWII history. Worth visiting for the sweeping views of Baguio...",
        about: "Diplomat Hotel, also known as the Dominican Hill Retreat House, is a historic landmark in Baguio City famous for its old architecture and panoramic views. Built in the early 1900s, the abandoned structure became popular because of stories and legends connected to the place. Visitors explore the site to admire its history, peaceful surroundings, and scenic mountain landscape. It is also a favorite location for photography, sightseeing, and learning about Baguio's cultural and historical background during different periods of time.",
        highlights: ["WWII history", "Panoramic views", "Photography", "Ruins tour"],
        image: "https://upload.wikimedia.org/wikipedia/commons/9/97/Diplomat_Hotel_in_Baguio_City.JPG",
    },
    {
        name: "The Mansion",
        location: "Romulo Drive, Baguio City, Benguet, Philippines.",
        rating: 4.3,
        badge: "Historic",
        badgeColor: "bg-stone-100 text-stone-700",
        hours: "9:00 AM – 5:00 PM",
        entry: "Free entry",
        description: "The official summer residence of the Philippine president. Iconic white iron gates and manicured gardens...",
        about: "The Mansion is the official summer residence of the President of the Philippines, located along Leonard Wood Road, Baguio City. Built in 1908, it features a grand gate, Spanish-inspired architecture, and well-kept gardens. It is a popular tourist spot where visitors can take photos outside and enjoy the scenic surroundings. The Mansion is also located directly across Wright Park, making it easy to visit both in one trip.",
        highlights: ["Historic gates", "Manicured gardens", "Presidential residence", "Photo spots"],
        image: "https://media.philstar.com/photos/2020/10/03/mansion-baguio_2020-10-03_18-47-38.jpg",
    },
    {
        name: "Botanical Garden",
        location: "Leonard Wood Road",
        rating: 4.1,
        badge: "Nature",
        badgeColor: "bg-green-100 text-green-700",
        hours: "6:00 AM – 6:00 PM",
        entry: "₱100",
        description: "A free public garden showcasing the flora and indigenous culture of the Cordillera region...",
        about: "Baguio Botanical Garden is a peaceful attraction in Baguio City featuring gardens, cultural huts, and art displays. It showcases traditional Cordillera houses, sculptures, and landscaped flower areas that reflect local heritage. Visitors can stroll along paths surrounded by pine trees, plants, and creative installations. It is also a popular place for photos, relaxation, and learning about indigenous culture. Located near Wright Park area, it is easy to include in a sightseeing tour of Baguio. The garden offers a calm environment ideal for nature lovers and families visiting the city especially during cool mornings and afternoons.",
        highlights: ["Native flora", "Ethnic village", "Free admission", "Family-friendly"],
        image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2e/4a/00/23/caption.jpg?w=1000&h=-1&s=1",
    },
    {
        name: "Good Shepherd Convent",
        location: "Upper General Luna Road",
        rating: 4.4,
        badge: "Local Favorite",
        badgeColor: "bg-rose-100 text-rose-700",
        hours: "7:00 AM – 5:00 PM",
        entry: "Free entry",
        description: "Famous for its ube jam and strawberry products made by nuns. A must-stop for pasalubong...",
        about: "Good Shepherd Convent is a famous shop in Baguio City known for its homemade products like ube jam, strawberry jam, peanut brittle, and other local delicacies. It is run by the Good Shepherd Sisters and supports their mission. Visitors often line up to buy pasalubong items.",
        highlights: ["Ube jam", "Peanut brittle", "Strawberry preserves", "Pasalubong"],
        image: "https://mybaguiocityguide.com/wp-content/uploads/2023/08/good-shepherd-baguio.jpg",
    },
    {
        name: "Igorot Stone Kingdom",
        location: "Long Long Benguet Road, Pinsao Proper, Baguio City, Benguet, Philippines",
        rating: "4.4",
        badge: "Family & Fun Attractions",
        badgeColor: "bg-green-100 text-green-700",
        hours: "7:00 AM - 6:00PM",
        entry: "100",
        description: "Igorot Stone Kingdom Inc. is a cultural-themed tourist attraction in Baguio City inspired by Igorot folklore, Cordilleran craftsmanship, and the legend of Sab-angan. It was built by engineer Pio Velasco and officially opened in 2021. The attraction is known for its massive stone structures, castle-like towers, bridges, and rice terrace-inspired walls made using traditional riprap stone-laying techniques.",
        about: "The Igorot Stone Kingdom is a vast 6,000-square-meter cultural theme park in Baguio City that highlights the Igorot people's architectural prowess, heritage, and folklore. It was constructed on a mountainside and has tall stone terraces, tunnels, and castles that are evocative of both the famous Banaue Rice Terraces and ancient indigenous buildings.",
        highlights: ["Banaue-Inspired Terraces", "Towering Castles", "Cultural Statues & Architecture", "Traditional Attire"],
        image: "https://upload.wikimedia.org/wikipedia/commons/7/76/Igorot_Stone_Kingdom.jpg",
    },
    {
        name: "Baguio Night Market",
        location: "Harrison Road in Baguio City, Philippines.",
        rating: "4.0",
        badge: "Market",
        badgeColor: "bg-red-100 text-red-700",
        hours: "9:00 PM - 2:00AM",
        entry: "Free entry",
        description: "The Baguio Night Market is a popular street market along Harrison Road near Burnham Park. It opens every night when the road is closed to vehicles. It offers affordable ukay-ukay clothes, accessories, souvenirs, and street food. Tourists and locals visit for shopping, food, and the lively nighttime atmosphere in Baguio City.",
        about: "The Baguio Night Market is a popular street market along Harrison Road near Burnham Park. It opens every night when the road is closed to vehicles. It offers affordable ukay-ukay clothes, accessories, souvenirs, and street food. Tourists and locals visit for shopping, food, and the lively nighttime atmosphere in Baguio City.",
        highlights: ["Ukay-ukay","Street food", "Affordable shopping","Nighttime vibe","Bargain culture"],
        image: "https://ik.imagekit.io/tvlk/blog/2024/08/shutterstock_2422562731.jpg",
    },
    {
        name: "Strawberry Farm",
        location: "Betag, La Trinidad, Benguet, Philippines",
        rating: "4.0",
        badge: "Farm",
        badgeColor: "bg-olive-100 text-olive-700",
        hours: "6:00AM - 6:00PM",
        entry: "₱100",
        description: "The La Trinidad Strawberry Farm is located in Benguet near Baguio City. It features wide strawberry fields where visitors can pick fresh strawberries during the season. The farm also sells strawberry-based foods like ice cream and jam. It offers a cool climate, scenic views, and a relaxing agricultural experience.",
        about: "The La Trinidad Strawberry Farm in Benguet is a famous tourist spot near Baguio City. It is known for strawberry picking, fresh produce, and cool mountain scenery. Visitors enjoy strawberries, local products, and the relaxing farm atmosphere.",
        highlights: ["Strawberry picking experience","Fresh local produce", "Scenic mountain farm view","Photo spots","Support for local agriculture"],
        image: "https://mybaguiocityguide.com/wp-content/uploads/2023/10/pexels-photo-4546316.jpeg",

    },
    {
        name: "Baguio Cathedral",
        location: "Session Road, Baguio City, Benguet, Philippines",
        rating: "4.2",
        badge: "Church",
        badgeColor: "bg-yellow-100 text-yellow-700",
        hours: "5:00AM - 6:00PM",
        entry: "Free entry",
        description: "The Baguio Cathedral, also called Our Lady of the Atonement Metropolitan Cathedral, is a Roman Catholic church located on a hill near Session Road in Baguio City. It is famous for its pink façade, stained-glass windows, and twin bell towers. Built in the 1900s, it serves as an important place of worship for locals. It also attracts tourists because of its scenic view overlooking the city and its peaceful, historic atmosphere.",
        about: "The Baguio Cathedral, officially Our Lady of the Atonement Metropolitan Cathedral, is a famous Catholic church in Baguio City. It is known for its pink exterior, twin bell towers, and hilltop location near Session Road. It serves as a major religious center and popular tourist landmark in the city.",
        highlights: ["Pink twin-spired design","Scenic viewpoint", "Long staircase access","Peaceful prayer atmosphere","Historic and cultural importance"],
        image: "https://upload.wikimedia.org/wikipedia/commons/3/35/Baguio_Cathedral_%28Carlu_Street%2C_Baguio_City%3B_02-25-2024%29.jpg",

    },
    {
        name: "Sky Ranch Baguio",
        location: "Luneta Hill, Upper Session Road, Baguio City, Benguet.",
        rating: "4.5",
        badge: "Fun Attractions",
        badgeColor: "bg-teal-100 text-teal-700",
        hours: "10:00AM - 10:00PM",
        entry: "₱50",
        description: "Sky Ranch Baguio is a small amusement park in Luneta Hill beside SM City Baguio. It features rides such as the Ferris wheel, Viking ship, and kiddie attractions. Visitors enjoy panoramic city views, cool mountain air, and a fun carnival atmosphere. It is ideal for families, friends, and tourists.",
        about: "Sky Ranch Baguio is a popular amusement park located beside SM City Baguio at Luneta Hill. It is part of the Sky Ranch chain operated by SM Prime Holdings. The park offers family-friendly and thrill rides like the Sky Eye Ferris wheel, Viking, and carousel. It also provides scenic views of Baguio’s mountains and cool weather, making it a relaxing yet fun destination for tourists, families, and friends visiting the city for leisure and entertainment.",
        highlights: ["Sky Eye Ferris wheel","Viking ride", "Beautiful sunset and night lights views","Cool mountain air","Carousel and kiddie rides"],
        image: "https://res.klook.com/image/upload/w_750,h_469,c_fill,q_85/w_80,x_15,y_15,g_south_west,l_Klook_water_br_trans_yhcmh3/activities/amkpzceprvw9euydab4i.jpg",

    },
    {
        name: "SM City Baguio",
        location: "Luneta Hill, Upper Session Road, Baguio City, Benguet, Philippines.",
        rating: "4.4",
        badge: "View Decks",
        badgeColor: "bg-lime-100 text-lime-700",
        hours: "10:00AM - 9:00PM",
        entry: "Free entry",
        description: "SM City Baguio is a popular mall in the city center featuring retail stores, restaurants, cinemas, and open-air walkways. It is unique for its eco-friendly design and cool ventilation without air conditioning. Visitors enjoy shopping, food trips, and panoramic views of Baguio while relaxing in a modern urban space.",
        about: "SM City Baguio is a large shopping mall located at Luneta Hill along Upper Session Road. It is owned by SM Prime Holdings and is known for its cool, open-air design. The mall offers shopping, dining, and entertainment with scenic views of Baguio’s mountains and city landscape.",
        highlights: ["Scenic mountain and city views","Restaurants and cafés", "Rooftop garden and event spaces","Open-air design","Scenic mountain and city views"],
        image: "https://baguioheraldexpressonline.com/wp-content/uploads/2020/06/sm-baguio-new.jpg",

    },
    
]

const PlaceModal = ({ place, onClose }) => {
    useEffect(() => {
        injectStyles()
        if (place) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = ''
        }
        return () => { document.body.style.overflow = '' }
    }, [place])

    if (!place) return null
    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 modal-backdrop"
            onClick={onClose}
        >
            <div
                className="bg-white rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl modal-panel"
                onClick={e => e.stopPropagation()}
            >
                {/* IMAGE */}
                <div className="relative overflow-hidden">
                    <img
                        src={place.image}
                        alt={place.name}
                        className="w-full h-64 object-cover img-zoom"
                        style={{ animation: 'scaleIn 0.6s cubic-bezier(.22,.68,0,1.1) both' }}
                    />
                    <div className="absolute inset-0 modal-gradient" />
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm text-white rounded-full p-1.5 close-btn"
                    >
                        <XMarkIcon className="w-5 h-5" />
                    </button>
                    <div className="absolute bottom-4 left-4 anim-fade-up" style={{ animationDelay: '0.1s' }}>
                        <div className="flex items-center gap-1.5 text-white/80 text-sm mb-1">
                            <MapPinIcon className="w-4 h-4" />
                            {place.location}
                        </div>
                        <h2 className="text-2xl font-bold text-white">{place.name}</h2>
                    </div>
                    <div className="absolute bottom-4 right-4 bg-white/20 backdrop-blur-sm text-white px-3 py-1.5 rounded-full flex items-center gap-1.5 text-sm font-semibold badge-pop">
                        <StarIcon className="w-4 h-4 text-yellow-300" />
                        {place.rating}
                    </div>
                </div>

                {/* BODY */}
                <div className="p-6">
                    {/* INFO PILLS */}
                    <div className="grid grid-cols-3 gap-3 mb-6 stagger">
                        {[
                            { label: "CATEGORY", value: place.badge },
                            { label: "HOURS", value: place.hours, icon: <ClockIcon className="w-3.5 h-3.5 inline mr-1 text-gray-400" /> },
                            { label: "ENTRY", value: place.entry },
                        ].map((item, i) => (
                            <div key={i} className="bg-gray-50 rounded-xl p-3 anim-fade-up">
                                <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1">
                                    {item.label}
                                </p>
                                <p className="text-sm font-medium text-gray-800">
                                    {item.icon}{item.value}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* ABOUT */}
                    <h3 className="font-bold text-gray-900 mb-2 anim-fade-up" style={{ animationDelay: '0.22s' }}>About this place</h3>
                    <p className="text-sm text-gray-500 leading-relaxed mb-5 anim-fade-up" style={{ animationDelay: '0.27s' }}>{place.about}</p>

                    {/* HIGHLIGHTS */}
                    <h3 className="font-bold text-gray-900 mb-3 anim-fade-up" style={{ animationDelay: '0.32s' }}>Highlights</h3>
                    <div className="flex flex-wrap flex-row gap-2 mb-6">
                        {place.highlights.map((h, i) => (
                            <span
                                key={i}
                                className="bg-green-50 text-green-700 text-sm px-3 py-1 rounded-full border border-green-100 pill-appear"
                                style={{ animationDelay: `${0.35 + i * 0.07}s` }}
                            >
                                {h}
                            </span>
                        ))}
                    </div>

                    {/* ACTIONS */}
                    <div className="flex gap-3 anim-fade-up" style={{ animationDelay: '0.45s' }}>
                        <button className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-2xl text-sm btn-press">
                            Add to itinerary
                        </button>
                        <button className="flex-1 border border-gray-200 hover:bg-gray-50 text-gray-800 font-semibold py-3 rounded-2xl text-sm btn-ghost">
                            Ask AI Guide
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export const Explore = () => {
    const [selected, setSelected] = useState(null)

    useEffect(() => { injectStyles() }, [])

    return (
        <section className="min-h-screen bg-white">
            <DashboardNav />

            <PlaceModal place={selected} onClose={() => setSelected(null)} />

            <div className="max-w-6xl mx-auto px-6 py-8">

                {/* HEADER */}
                <div className="flex items-center justify-end mb-8 anim-fade-in">
                    <span className="flex items-center gap-2 text-sm text-green-700 bg-green-50 px-3 py-1.5 rounded-full font-medium">
                        <SparklesIcon className="w-4 h-4" />
                        16 places
                    </span>
                </div>

                <div className="mb-10 anim-fade-up">
                    <h1 className="text-3xl font-bold text-gray-900">Explore Baguio</h1>
                    <p className="text-gray-500 mt-1">Discover top destinations and hidden gems around the City of Pines.</p>
                </div>

                {/* TOP PLACES */}
                <div className="mb-12">
                    <h2 className="text-xl font-bold text-gray-900 mb-1 anim-fade-up" style={{ animationDelay: '0.08s' }}>Top Places</h2>
                    <p className="text-sm text-gray-400 mb-5 anim-fade-up" style={{ animationDelay: '0.12s' }}>The must-visit landmarks of Baguio</p>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 stagger">
                        {topPlaces.map((place, i) => (
                            <div
                                key={i}
                                onClick={() => setSelected(place)}
                                className="rounded-2xl overflow-hidden border border-gray-100 cursor-pointer group relative card-lift anim-scale-in"
                            >
                                <div className="overflow-hidden">
                                    <img
                                        src={place.image}
                                        alt={place.name}
                                        className="w-full h-44 object-cover img-zoom"
                                    />
                                    <span className={`absolute top-3 left-3 ${place.badgeColor} text-white text-xs font-semibold px-2.5 py-1 rounded-lg`}
                                        style={{ transition: 'transform 0.3s ease', zIndex: 1 }}
                                    >
                                        {place.badge}
                                    </span>
                                </div>
                                <div className="p-3">
                                    <div className="flex items-center justify-between">
                                        <h3 className="font-semibold text-gray-900 text-sm">{place.name}</h3>
                                        <span className="flex items-center gap-1 text-green-600 font-semibold text-sm">
                                            <StarIcon className="w-3.5 h-3.5" />
                                            {place.rating}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-1 mt-1 text-gray-400 text-xs">
                                        <MapPinIcon className="w-3.5 h-3.5" />
                                        {place.location}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* OTHER PLACES */}
                <div>
                    <h2 className="text-xl font-bold text-gray-900 mb-1 anim-fade-up" style={{ animationDelay: '0.05s' }}>Other Places to Discover</h2>
                    <p className="text-sm text-gray-400 mb-5 anim-fade-up" style={{ animationDelay: '0.1s' }}>Local favorites, hidden gems, and off-the-beaten-path finds</p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 stagger">
                        {otherPlaces.map((place, i) => (
                            <div
                                key={i}
                                onClick={() => setSelected(place)}
                                className="border border-gray-100 rounded-2xl overflow-hidden cursor-pointer relative card-lift anim-scale-in"
                            >
                                {/* IMAGE */}
                                <div className="relative overflow-hidden">
                                    <img
                                        src={place.image}
                                        alt={place.name}
                                        className="w-full h-40 object-cover img-zoom"
                                    />
                                    <span className={`absolute top-3 left-3 text-xs font-semibold px-2.5 py-1 rounded-full ${place.badgeColor}`}>
                                        {place.badge}
                                    </span>
                                </div>

                                {/* CONTENT */}
                                <div className="p-4">
                                    <div className="flex items-center justify-between mb-1">
                                        <h3 className="font-bold text-gray-900 text-base">{place.name}</h3>
                                        <span className="flex items-center gap-1 text-green-600 font-semibold text-sm">
                                            <StarIcon className="w-3.5 h-3.5" />
                                            {place.rating}
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-1 mb-2 text-gray-400 text-xs">
                                        <MapPinIcon className="w-3.5 h-3.5" />
                                        {place.location}
                                    </div>

                                    <p className="text-gray-500 text-sm leading-relaxed line-clamp-2">
                                        {place.description}
                                    </p>

                                    <button className="mt-3 text-green-600 hover:text-green-700 font-semibold text-sm arrow-link">
                                        View details →
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    )
}
