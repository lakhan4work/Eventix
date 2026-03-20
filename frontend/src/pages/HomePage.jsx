import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { Calendar, MapPin, Search, Star, Ticket, TrendingUp, Users, Video, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "../components/ui/Button"
import { Input } from "../components/ui/Input"
import { Select } from "../components/ui/Select"
import { Card, CardContent } from "../components/ui/Card"
import { Badge } from "../components/ui/Badge"

const FEATURED_EVENTS = [
  {
    id: 1,
    title: "Neon Nights Music Festival",
    date: "Aug 15, 2026",
    location: "Downtown Arena, LA",
    price: "$85",
    organizer: "LiveNation",
    image: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4",
    category: "Concert"
  },
  {
    id: 2,
    title: "Future of AI Conference",
    date: "Sep 22, 2026",
    location: "Moscone Center, SF",
    price: "$299",
    organizer: "TechWeb",
    image: "https://images.unsplash.com/photo-1540317580384-e5d43616b9aa",
    category: "Conference"
  },
  {
    id: 3,
    title: "Culinary Masterclass: Sushi",
    date: "Jul 10, 2026",
    location: "The Epicurean Room, NYC",
    price: "$120",
    organizer: "Chef Kenji",
    image: "https://images.unsplash.com/photo-1553621042-f6e147245754",
    category: "Workshop"
  },
  {
    id: 4,
    title: "Indie Game Developers Meetup",
    date: "Aug 05, 2026",
    location: "Pixel Lounge, Seattle",
    price: "Free",
    organizer: "IGDA Seattle",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f",
    category: "Meetup"
  }
]

const CATEGORIES = [
  { name: "Concert", icon: <Calendar className="h-6 w-6" />, count: 124 },
  { name: "Workshop", icon: <TrendingUp className="h-6 w-6" />, count: 86 },
  { name: "Conference", icon: <Users className="h-6 w-6" />, count: 42 },
  { name: "Health", icon: <Video className="h-6 w-6" />, count: 215 },
  { name: "Meetup", icon: <MapPin className="h-6 w-6" />, count: 58 },
]

const CAROUSEL_ITEMS = [
  {
    title: "Neon Nights Festival",
    subtitle: "Feel the music under the stars",
    image: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4",
    link: "/events/1",
    badge: "Concert"
  },
  {
    title: "AI Future Summit",
    subtitle: "Explore the future of technology",
    image: "https://images.unsplash.com/photo-1540317580384-e5d43616b9aa",
    link: "/events/2",
    badge: "Conference"
  },
  {
    title: "Sushi Masterclass",
    subtitle: "Cook like a pro chef",
    image: "https://images.unsplash.com/photo-1553621042-f6e147245754",
    link: "/events/3",
    badge: "Workshop"
  }
]

function HeroCarousel() {
  const [current, setCurrent] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    if (isPaused) return

    const timer = setInterval(() => {
      setCurrent((prev) =>
        prev === CAROUSEL_ITEMS.length - 1 ? 0 : prev + 1
      )
    }, 2000)

    return () => clearInterval(timer)
  }, [isPaused])

  const next = () =>
    setCurrent(current === CAROUSEL_ITEMS.length - 1 ? 0 : current + 1)

  const prev = () =>
    setCurrent(current === 0 ? CAROUSEL_ITEMS.length - 1 : current - 1)

  return (
    <div
      className="relative w-full  md:h-55 overflow-hidden rounded-xl mb-10 shadow-lg group border border-white/10"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          <img
            src={CAROUSEL_ITEMS[current].image}
            className="w-full h-full object-cover"
            alt="Event Banner"
          />

          <div className="absolute inset-0 bg-linear-to-r from-black/60 via-black/20 to-transparent" />

          <div className="relative z-10 px-6 md:px-10 h-full flex flex-col justify-center w-full md:w-1/2">
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2 py-0.5 text-[10px] font-bold uppercase bg-linear-to-r from-pink-500 to-yellow-500 text-white rounded-full animate-pulse">
                🔥 Trending
              </span>

              <Badge className="bg-white/10 text-white border border-white/20 text-xs">
                {CAROUSEL_ITEMS[current].badge}
              </Badge>
            </div>

            <h2 className="text-xl md:text-3xl font-black text-white mb-1 uppercase tracking-tight">
              {CAROUSEL_ITEMS[current].title}
            </h2>

            <p className="text-sm md:text-base text-white/90 mb-4">
              {CAROUSEL_ITEMS[current].subtitle}
            </p>

            <Button
              onClick={() => navigate(CAROUSEL_ITEMS[current].link)}
              className="bg-white text-black text-sm px-5 py-2 rounded-md font-semibold w-fit hover:bg-gray-200"
            >
              Book Now
            </Button>
          </div>
        </motion.div>
      </AnimatePresence>

      <button onClick={prev} className="absolute left-3 top-1/2 -translate-y-1/2 z-20 p-1.5 bg-black/30 rounded-full text-white">
        <ChevronLeft className="h-4 w-4" />
      </button>

      <button onClick={next} className="absolute right-3 top-1/2 -translate-y-1/2 z-20 p-1.5 bg-black/30 rounded-full text-white">
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  )
}

export function HomePage() {
  const navigate = useNavigate()
  const [searchLocation, setSearchLocation] = useState("")
  const [searchCategory, setSearchCategory] = useState("")

  const handleSearch = () => {
    const params = new URLSearchParams()
    if (searchLocation) params.append("location", searchLocation)
    if (searchCategory) params.append("category", searchCategory)
    navigate(`/events?${params.toString()}`)
  }

  return (
    <div className="flex flex-col min-h-screen">

      <HeroCarousel />

      {/* Hero Section */}
      <section className="relative pt-24 pl-8 pr-8 pb-32 md:pt-32 md:pb-40 overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 bg-background">
          <div className="absolute -top-[30%] -right-[10%] w-[70%] h-[70%] rounded-full bg-brand-500/20 blur-[120px]" />
          <div className="absolute bottom-[10%] -left-[10%] w-[50%] h-[50%] rounded-full bg-blue-500/20 blur-[120px]" />
        </div>

        <div className="container mx-auto px-4 max-w-7xl z-10 relative">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-8">
            {/* Left Content */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex-1 text-center lg:text-left z-20"
            >
              <Badge variant="brand" className="mb-6 px-4 py-1.5 text-sm inline-flex">
                ✨ The New Standard for Events
              </Badge>
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8">
                Discover & Host <br />
                <span className="text-gradient">Amazing Experiences</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Find concerts, workshops, meetups and unforgettable experiences near you. Join millions of event-goers today.
              </p>

              {/* Search Bar Component */}
              <div className="glass-card p-3 md:p-3 rounded-2xl max-w-3xl flex flex-col md:flex-row gap-3 shadow-xl backdrop-blur-md relative z-30">
                <div className="flex-1 relative">
                  <MapPin className="absolute left-3 top-3 h-5 w-5 text-muted-foreground pointer-events-none" />
                  <Select 
                    className="pl-10 h-10 bg-background text-white border border-border focus:outline-none cursor-pointer"
                    value={searchLocation}
                    onChange={(e) => setSearchLocation(e.target.value)}
                  >
                    <option value="" className="bg-gray-900 text-white">Any Location</option>
                      <option value="new york" className="bg-gray-900 text-white">New York</option>
                      <option value="los angeles" className="bg-gray-900 text-white">Los Angeles</option>
                      <option value="san francisco" className="bg-gray-900 text-white">San Francisco</option>
                  </Select>
                </div>
                <div className="hidden md:block w-px bg-border/50 my-2" />
                <div className="flex-1 relative">
                  <Select 
                    className="h-10 bg-background text-white border border-border pl-4 focus:outline-none cursor-pointer"
                    value={searchCategory}
                    onChange={(e) => setSearchCategory(e.target.value)}
                  >
                    <option value="" className="bg-gray-900 text-white">All Categories</option>
                       <option value="Concert" className="bg-gray-900 text-white">Concert</option>
                       <option value="Conference" className="bg-gray-900 text-white">Conference</option>
                       <option value="Workshop" className="bg-gray-900 text-white">Workshop</option>
                       <option value="Meetup" className="bg-gray-900 text-white">Meetup</option>
                  </Select>
                </div>
                <Button onClick={handleSearch} size="lg" variant="gradient" className="h-10 md:w-32 rounded-xl">
                  <Search className="h-4 w-4 mr-2" />
                  Search
                </Button>
              </div>
            </motion.div>

            {/* Right Content - 3D CSS/Motion Element */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="flex-1 w-full h-100 md:h-125 lg:h-150 relative rounded-3xl overflow-hidden glass mix-blend-screen flex items-center justify-center perspective-1000"
            >
              {/* Interactive Floating Ticket Elements */}
              <motion.div 
                animate={{ 
                  y: [0, -20, 0],
                  rotateX: [10, -5, 10], 
                  rotateY: [-10, 15, -10]
                }}
                transition={{ 
                  duration: 6, 
                  repeat: Infinity,
                  ease: "easeInOut" 
                }}
                className="w-64 h-80 glass-card bg-linear-to-br from-brand-600/40 to-blue-600/40 border border-white/20 rounded-2xl shadow-2xl relative z-20 flex flex-col p-6 backdrop-blur-xl"
                style={{ transformStyle: "preserve-3d" }}
              >
                <div className="absolute top-4 right-4 animate-pulse"><Star className="text-yellow-400 w-6 h-6 fill-yellow-400" /></div>
                <div className="w-16 h-16 bg-white/10 rounded-full mb-6 flex items-center justify-center">
                  <Ticket className="w-8 h-8 text-white" />
                </div>
                <div className="h-4 w-3/4 bg-white/20 rounded mb-3"></div>
                <div className="h-4 w-1/2 bg-white/20 rounded mb-auto"></div>
                
                <div className="border-t border-dashed border-white/30 pt-4 mt-8 flex justify-between items-center">
                  <div className="h-6 w-16 bg-white/20 rounded"></div>
                  <div className="space-x-1 flex">
                    <div className="w-2 h-8 bg-white/40 rounded-sm"></div>
                    <div className="w-2 h-8 bg-white/60 rounded-sm"></div>
                    <div className="w-2 h-8 bg-white/30 rounded-sm"></div>
                    <div className="w-2 h-8 bg-white/50 rounded-sm"></div>
                  </div>
                </div>
              </motion.div>

              {/* Decorative Background Elements */}
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                className="absolute w-[150%] h-[150%] -z-10 bg-[conic-gradient(from_0deg,transparent_0_340deg,rgba(139,92,246,0.2)_360deg)] rounded-full mix-blend-plus-lighter"
              />
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-background to-transparent z-10" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-3xl font-bold mb-2">Explore Categories</h2>
              <p className="text-muted-foreground">Find whatever you're looking for</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 md:gap-6">
            {CATEGORIES.map((cat, index) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                key={cat.name}
              >
                <Link to={`/events?category=${cat.name}`}>
                  <Card className="glass-card h-full text-center hover:bg-card/80 border-transparent bg-card/40 cursor-pointer group">
                    <CardContent className="pt-8 pb-8 flex flex-col items-center justify-center p-6">
                      <div className="h-14 w-14 rounded-2xl bg-brand-500/10 text-brand-500 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-brand-500 group-hover:text-white transition-all duration-300">
                        {cat.icon}
                      </div>
                      <h3 className="font-semibold text-lg mb-1">{cat.name}</h3>
                      <p className="text-sm text-muted-foreground">{cat.count} Events</p>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Events Section */}
      <section className="py-24">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-3xl font-bold mb-2">Trending Events</h2>
              <p className="text-muted-foreground">Don't miss out on these popular upcoming events</p>
            </div>
            <Button variant="ghost" className="hidden md:flex text-brand-500 hover:text-brand-600 hover:bg-brand-500/10" asChild>
              <Link to="/events">View All <TrendingUp className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURED_EVENTS.map((event, index) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                key={event.id}
              >
                <Card className="glass-card overflow-hidden h-full flex flex-col border-white/5 bg-card/60 cursor-pointer group">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute top-3 right-3 bg-background/90 backdrop-blur-md px-3 py-1.5 rounded-full text-sm font-semibold shadow-sm">
                      {event.price}
                    </div>
                    <Badge className="absolute top-3 left-3 bg-brand-500 hover:bg-brand-600 border-0">
                      {event.category}
                    </Badge>
                  </div>
                  <CardContent className="p-5 flex-1 flex flex-col">
                    <div className="flex items-center text-brand-500 text-sm font-medium mb-3">
                      <Calendar className="h-4 w-4 mr-1.5" />
                      {event.date}
                    </div>
                    <h3 className="font-bold text-xl mb-2 line-clamp-2 group-hover:text-brand-400 transition-colors">
                      {event.title}
                    </h3>
                    <div className="flex flex-col gap-2 mt-auto pt-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 shrink-0" />
                        <span className="truncate">{event.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 shrink-0" />
                        <span className="truncate">By {event.organizer}</span>
                      </div>
                    </div>
                  </CardContent>
                  <div className="flex gap-2">
  <Button variant="outline" className="w-full" asChild>
    <Link to={`/events/${event.id}`}>View Details</Link>
  </Button>

 <button
  onClick={() => {
    const existing = JSON.parse(localStorage.getItem("favorites") || "[]")

    const alreadySaved = existing.some(
      (e) => e.title === event.title
    )

    if (!alreadySaved) {
      const updated = [...existing, event]
      localStorage.setItem("favorites", JSON.stringify(updated))
    }
  }}
>
  ⭐
</button>
</div>
                </Card>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-10 text-center md:hidden">
            <Button variant="outline" className="w-full" asChild>
              <Link to="/events">View All Events</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="relative rounded-3xl overflow-hidden bg-brand-900 shadow-2xl">
            <div className="absolute inset-0 bg-linear-to-r from-brand-600 to-blue-600 opacity-90" />
            
            {/* Shapes */}
            <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 rounded-full bg-white opacity-10 blur-3xl" />
            <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 rounded-full bg-white opacity-10 blur-3xl" />
            
            <div className="relative z-10 p-10 md:p-20 text-center flex flex-col items-center">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 font-heading">
                Ready to host your own event?
              </h2>
              <p className="text-blue-100 text-lg md:text-xl mb-10 max-w-2xl">
                Create, manage, and promote your events easily. Reach thousands of potential attendees in your city.
              </p>
             <Link
  to="/auth"
  className="inline-block px-6 py-3 rounded-lg bg-white text-primary font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg"
>
  Start Hosting For Free
</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}