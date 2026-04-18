import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Calendar, MapPin, Download, Ticket, QrCode, Loader2, Trash2 } from "lucide-react"
import { Button } from "../components/ui/Button"
import { Card } from "../components/ui/Card"
import { Badge } from "../components/ui/Badge"
import { getAllBookings, deleteBooking } from "../services/booking.services"

export function MyTicketsPage() {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [filter, setFilter] = useState("all")

  useEffect(() => {
    fetchBookings()
  }, [])

  const fetchBookings = async () => {
    try {
      setLoading(true)
      const data = await getAllBookings()
      // Backend returns { success, message, data: [bookings with populated event] }
      setBookings(data.data || [])
    } catch (err) {
      console.error("Failed to fetch bookings:", err)
      setError("Failed to load your tickets.")
    } finally {
      setLoading(false)
    }
  }

  const handleCancelBooking = async (bookingId) => {
    if (!window.confirm("Are you sure you want to cancel this booking?")) return
    try {
      await deleteBooking(bookingId)
      // Remove from local state
      setBookings(prev => prev.filter(b => b._id !== bookingId))
    } catch (err) {
      alert(err?.data?.message || err?.message || "Failed to cancel booking")
    }
  }

  // Helpers
  const formatDate = (dateStr) => {
    if (!dateStr) return ""
    return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  }

  const getImageUrl = (booking) => {
    if (booking.event?.image?.url) return booking.event.image.url
    return "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  }

  const isUpcoming = (booking) => {
    if (!booking.event?.date) return false
    return new Date(booking.event.date) > new Date() && booking.status === "booked"
  }

  const isPast = (booking) => {
    if (!booking.event?.date) return false
    return new Date(booking.event.date) <= new Date()
  }

  const filteredBookings = bookings.filter(b => {
    if (filter === "all") return true
    if (filter === "upcoming") return isUpcoming(b)
    if (filter === "history") return isPast(b)
    if (filter === "cancelled") return b.status === "cancelled"
    return true
  })

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-brand-500" />
        <span className="ml-3 text-muted-foreground">Loading your tickets...</span>
      </div>
    )
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-muted/30 py-10">
      <div className="container mx-auto px-4 max-w-5xl">

        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold tracking-tight mb-2">My Tickets</h1>
          <p className="text-muted-foreground">
            Manage your event registrations and download your passes.
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-lg text-sm mb-6">
            {error}
          </div>
        )}

        {/* Tabs */}
        <div className="flex border-b border-border mb-8 overflow-x-auto hide-scrollbar">
          {["all", "upcoming", "history", "cancelled"].map((tab) => (
            <button
              key={tab}
              className={`px-6 py-3 font-medium text-sm transition-colors relative whitespace-nowrap capitalize ${
                filter === tab
                  ? "text-brand-500"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              onClick={() => setFilter(tab)}
            >
              {tab === "all" ? "All Tickets" : tab}
              {filter === tab && (
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-brand-500 rounded-t-full"></div>
              )}
            </button>
          ))}
        </div>

        {/* Tickets */}
        <div className="space-y-6">
          {filteredBookings.length > 0 ? (
            filteredBookings.map((booking) => (
              <Card
                key={booking._id}
                className="overflow-hidden bg-card border-border hover:border-brand-500/30 transition-colors group"
              >
                <div className="flex flex-col md:flex-row h-full min-h-[220px] items-stretch">

                  {/* LEFT */}
                  <div className="flex-1 flex flex-col sm:flex-row p-0 md:border-r border-border border-dashed">
                    
                    {/* Image */}
                    <div className="w-full md:w-48 h-[220px] md:h-auto min-w-[12rem] bg-muted overflow-hidden">
                      <img
                        src={getImageUrl(booking)}
                        alt={booking.event?.title || "Event"}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src = "https://via.placeholder.com/400x300?text=Event"
                        }}
                      />
                    </div>

                    {/* Content */}
                    <div className="p-6 flex-1 flex flex-col justify-between">
                      <div>
                        {/* Status Badge */}
                        <Badge className={`mb-3 ${
                          booking.status === "booked" && isUpcoming(booking)
                            ? "bg-brand-500 text-white border-brand-500/30"
                            : booking.status === "cancelled"
                            ? "bg-red-500 text-white border-red-500/30"
                            : "bg-gray-500 text-white border-gray-500/30"
                        }`}>
                          {booking.status === "booked" && isUpcoming(booking) ? "Upcoming" : 
                           booking.status === "cancelled" ? "Cancelled" : "Completed"}
                        </Badge>

                        <h3 className="text-xl font-bold mb-2">
                          {booking.event?.title || "Event"}
                        </h3>

                        <div className="space-y-2 text-sm text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            {formatDate(booking.event?.date)} {booking.event?.time && `at ${booking.event.time}`}
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4" />
                            {booking.event?.location || "—"}
                          </div>
                          <div className="flex items-center gap-2 font-medium text-foreground">
                            <Ticket className="h-4 w-4 text-brand-500" />
                            {booking.quantity} ticket(s) • ₹{booking.totalPrice}
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 flex gap-2">
                        {booking.event?._id && (
                          <Button variant="outline" size="sm" asChild>
                            <Link to={`/events/${booking.event._id}`}>
                              Event Details
                            </Link>
                          </Button>
                        )}
                        {booking.status === "booked" && isUpcoming(booking) && (
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="border-red-500/30 text-red-500 hover:bg-red-500/10"
                            onClick={() => handleCancelBooking(booking._id)}
                          >
                            <Trash2 className="h-3 w-3 mr-1" /> Cancel
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* RIGHT */}
                  <div className="w-full md:w-64 p-6 flex flex-col items-center justify-center h-full">
                    {booking.status === "booked" && isUpcoming(booking) ? (
                      <>
                        <QrCode className="w-20 h-20 mb-4" />
                        <p className="text-xs text-muted-foreground mb-2">Booking ID: {booking._id?.slice(-8)}</p>
                      </>
                    ) : (
                      <>
                        <Ticket className="w-12 h-12 mb-3 text-muted-foreground" />
                        <p className="text-sm mb-2">
                          {booking.status === "cancelled" ? "Booking Cancelled" : "Event Concluded"}
                        </p>
                      </>
                    )}
                  </div>

                </div>
              </Card>
            ))
          ) : (
            <div className="text-center py-20">
              <Ticket className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <h3 className="text-xl font-bold mb-2">No tickets found</h3>
              <p className="text-muted-foreground mb-4">You haven't booked any events yet.</p>
              <Button asChild>
                <Link to="/events">Browse Events</Link>
              </Button>
            </div>
          )}
        </div>

      </div>
    </div>
  )
}