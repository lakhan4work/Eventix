import { useState, useEffect } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
import { Calendar, Clock, MapPin, Share2, Users, CheckCircle, Ticket, Heart, Loader2 } from "lucide-react"
import { Button } from "../components/ui/Button"
import { Card, CardContent } from "../components/ui/Card"
import { Badge } from "../components/ui/Badge"
import { getEventById } from "../services/events.services"
import { createBooking } from "../services/booking.services"
import { useAuth } from "../lib/auth"

export function EventDetailsPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user, isAuthenticated } = useAuth()

  const [event, setEvent] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [bookingLoading, setBookingLoading] = useState(false)
  const [bookingMessage, setBookingMessage] = useState("")
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        setLoading(true)
        const data = await getEventById(id)
        // Backend returns { success, message, event }
        setEvent(data.event)
      } catch (err) {
        console.error("Failed to fetch event:", err)
        setError("Failed to load event details.")
      } finally {
        setLoading(false)
      }
    }
    fetchEvent()
  }, [id])

  const handleBooking = async () => {
    if (!isAuthenticated) {
      navigate("/auth")
      return
    }

    try {
      setBookingLoading(true)
      setBookingMessage("")
      const res = await createBooking(event._id, quantity)
      setBookingMessage(res.message || "Booking created successfully!")
      // Refresh event data to update ticket count
      const updated = await getEventById(id)
      setEvent(updated.event)
    } catch (err) {
      const msg = err?.data?.message || err?.message || "Booking failed. Please try again."
      setBookingMessage(msg)
    } finally {
      setBookingLoading(false)
    }
  }

  // Helpers
  const formatDate = (dateStr) => {
    if (!dateStr) return ""
    return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  }

  const formatPrice = (p) => (p === 0 ? "Free" : `₹${p}`)

  const getImageUrl = (event) => {
    if (event?.image?.url) return event.image.url
    return "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-brand-500" />
        <span className="ml-3 text-muted-foreground">Loading event...</span>
      </div>
    )
  }

  if (error || !event) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <p className="text-red-400 text-lg">{error || "Event not found"}</p>
        <Button variant="outline" asChild>
          <Link to="/events">Back to Events</Link>
        </Button>
      </div>
    )
  }

  const ticketsRemaining = (event.totalTickets || 0) - (event.ticketsSold || 0)

  return (
    <div className="bg-background min-h-screen pb-20">
      {/* Hero Banner */}
      <div className="relative h-[40vh] md:h-[60vh] w-full bg-muted">
        <img 
          src={getImageUrl(event)} 
          alt={event.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-background via-background/60 to-transparent" />
        
        <div className="absolute bottom-0 w-full">
          <div className="container mx-auto px-4 max-w-5xl pb-10">
            {event.category && (
              <Badge className="mb-4 bg-brand-500/20 text-brand-400 hover:bg-brand-500/30 border-0 backdrop-blur-md px-3 py-1 capitalize">
                {event.category}
              </Badge>
            )}
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4 text-white">
              {event.title}
            </h1>
            <div className="flex flex-wrap items-center gap-6 text-white/90">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-brand-400" />
                <span className="font-medium">{formatDate(event.date)}</span>
              </div>
              {event.time && (
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-brand-400" />
                  <span className="font-medium">{event.time}</span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-brand-400" />
                <span className="font-medium">{event.location}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-5xl pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Main Content (Left, 2 columns) */}
          <div className="lg:col-span-2 space-y-12">
            
            {/* Description */}
            <section>
              <h2 className="text-2xl font-bold mb-4">About this Event</h2>
              <div className="prose prose-invert max-w-none text-muted-foreground whitespace-pre-wrap leading-relaxed">
                {event.description || "No description provided."}
              </div>
            </section>

            {/* Agenda/Schedule */}
            {event.agenda && event.agenda.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold mb-6">Schedule</h2>
                <div className="space-y-6">
                  {event.agenda.map((item, idx) => (
                    <div key={idx} className="flex gap-6 relative">
                      <div className="flex flex-col items-center">
                        <div className="w-12 h-12 rounded-full bg-card border border-border flex items-center justify-center font-bold text-sm z-10">
                          {idx + 1}
                        </div>
                        {idx !== event.agenda.length - 1 && (
                          <div className="absolute top-12 bottom-0 left-6 w-px bg-border -ml-px h-full" />
                        )}
                      </div>
                      <div className="bg-card border border-white/5 rounded-2xl p-5 flex-1 shadow-sm">
                        <div className="text-brand-500 font-medium mb-1">{item.time}</div>
                        <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                        <p className="text-muted-foreground text-sm">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Speakers / Performers */}
            {event.speakers && event.speakers.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold mb-6">Lineup & Speakers</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                  {event.speakers.map((speaker, idx) => (
                    <Card key={idx} className="bg-card/50 text-center border-white/5">
                      <CardContent className="pt-6">
                        <img 
                          src={speaker.image || `https://api.dicebear.com/7.x/avataaars/svg?seed=${speaker.name}`} 
                          alt={speaker.name}
                          className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-4 border-background"
                        />
                        <h3 className="font-bold text-lg">{speaker.name}</h3>
                        <p className="text-brand-400 text-sm">{speaker.role}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>
            )}

            {/* Location */}
            <section>
              <h2 className="text-2xl font-bold mb-4">Venue Location</h2>
              <div className="bg-card rounded-2xl border border-white/5 overflow-hidden">
                <div className="h-64 bg-muted w-full relative flex items-center justify-center">
                  <div className="bg-background/80 backdrop-blur-sm p-4 rounded-xl flex items-center gap-3 z-10 border border-border">
                    <MapPin className="text-brand-500 h-6 w-6" />
                    <div>
                      <div className="font-bold">{event.location?.split(',')[0]}</div>
                      <div className="text-sm text-muted-foreground">{event.location}</div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Sticky Sidebar (Right, 1 column) */}
          <div className="lg:col-span-1 relative">
            <div className="sticky top-24 space-y-6">
              
              {/* Ticketing Card */}
              <Card className="glass-card border-brand-500/30 shadow-[0_8px_30px_rgb(139,92,246,0.1)]">
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <div className="text-4xl font-bold text-gradient">{formatPrice(event.price)}</div>
                  </div>
                  
                  <div className="space-y-4 mb-6 text-sm">
                    <div className="flex justify-between border-b border-border pb-3">
                      <span className="text-muted-foreground flex items-center gap-2"><Calendar className="h-4 w-4"/> Date</span>
                      <span className="font-medium text-right">{formatDate(event.date)}</span>
                    </div>
                    {event.time && (
                      <div className="flex justify-between border-b border-border pb-3">
                        <span className="text-muted-foreground flex items-center gap-2"><Clock className="h-4 w-4"/> Time</span>
                        <span className="font-medium text-right">{event.time}</span>
                      </div>
                    )}
                    <div className="flex justify-between border-b border-border pb-3">
                      <span className="text-muted-foreground flex items-center gap-2"><Ticket className="h-4 w-4"/> Available</span>
                      <span className="font-medium text-right">{ticketsRemaining} tickets</span>
                    </div>
                  </div>

                  {/* Quantity selector (only for participants) */}
                  {(!user || user.role === "participant") && ticketsRemaining > 0 && (
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm text-muted-foreground">Quantity</span>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => setQuantity(Math.max(1, quantity - 1))}
                          disabled={quantity <= 1}
                        >-</Button>
                        <span className="w-8 text-center font-medium">{quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => setQuantity(Math.min(ticketsRemaining, quantity + 1))}
                          disabled={quantity >= ticketsRemaining}
                        >+</Button>
                      </div>
                    </div>
                  )}

                  {/* Booking message */}
                  {bookingMessage && (
                    <div className={`text-sm px-3 py-2 rounded-lg mb-4 ${
                      bookingMessage.toLowerCase().includes("success")
                        ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30"
                        : "bg-red-500/10 text-red-400 border border-red-500/30"
                    }`}>
                      {bookingMessage}
                    </div>
                  )}

                  {ticketsRemaining > 0 ? (
                    <Button 
                      variant="gradient" 
                      size="lg" 
                      className="w-full text-lg h-14 rounded-xl shadow-lg shadow-brand-500/25"
                      onClick={handleBooking}
                      disabled={bookingLoading || (user && user.role === "organizer")}
                    >
                      {bookingLoading ? (
                        <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Booking...</>
                      ) : (
                        <><Ticket className="mr-2 h-5 w-5" /> Book Now {event.price > 0 ? `• ₹${event.price * quantity}` : ""}</>
                      )}
                    </Button>
                  ) : (
                    <Button variant="outline" size="lg" className="w-full text-lg h-14 rounded-xl" disabled>
                      Sold Out
                    </Button>
                  )}

                  {user && user.role === "organizer" && (
                    <p className="text-xs text-muted-foreground text-center mt-2">Organizers cannot book tickets</p>
                  )}
                </CardContent>
              </Card>

            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
