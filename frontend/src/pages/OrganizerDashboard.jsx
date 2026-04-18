import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import {
  Calendar,
  CreditCard,
  Users,
  Ticket,
  Loader2
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/Card"
import { Badge } from "../components/ui/Badge"
import { getEventByOrganizer } from "../services/events.services"

export function OrganizerDashboard() {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true)
        const data = await getEventByOrganizer()
        setEvents(data.events || [])
      } catch (err) {
        console.error("Failed to fetch dashboard data:", err)
        setError("Failed to load dashboard data.")
      } finally {
        setLoading(false)
      }
    }
    fetchEvents()
  }, [])

  // Compute stats from real data
  const totalRevenue = events.reduce((sum, e) => sum + (e.ticketsSold || 0) * e.price, 0)
  const totalTicketsSold = events.reduce((sum, e) => sum + (e.ticketsSold || 0), 0)
  const activeEvents = events.filter(e => e.status === "active").length
  const totalAttendees = totalTicketsSold // Each ticket = 1 attendee

  // Reusable styles
  const cardHover =
    "bg-card border border-transparent transition-all duration-300 ease-in-out hover:scale-[1.02] hover:bg-brand-500/10 hover:border-brand-500/40 hover:shadow-lg hover:shadow-brand-500/10 cursor-pointer"

  const eventRow =
    "flex items-center justify-between min-h-[64px] border border-transparent hover:border-brand-500/40 bg-transparent hover:bg-brand-500/10 transition-all duration-300 ease-in-out px-3 py-2 rounded-lg cursor-pointer hover:scale-[1.02]"

  const stats = [
    { title: "Total Revenue", value: `₹${totalRevenue.toLocaleString()}`, icon: CreditCard },
    { title: "Tickets Sold", value: totalTicketsSold.toLocaleString(), icon: Ticket },
    { title: "Active Events", value: activeEvents.toString(), icon: Calendar },
    { title: "Total Attendees", value: totalAttendees.toLocaleString(), icon: Users },
  ]

  // Helpers
  const formatDate = (dateStr) => {
    if (!dateStr) return ""
    return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }

  // Sort events by date
  const sortedEvents = [...events].sort((a, b) => new Date(b.date) - new Date(a.date))
  const recentEvents = sortedEvents.slice(0, 4)
  const upcomingEvents = events
    .filter(e => new Date(e.date) > new Date() && e.status === "active")
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(0, 4)

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[40vh]">
        <Loader2 className="h-8 w-8 animate-spin text-brand-500" />
        <span className="ml-3 text-muted-foreground">Loading dashboard...</span>
      </div>
    )
  }

  return (
    <div className="space-y-8">

      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard Overview</h1>
        <p className="text-muted-foreground mt-1">
          Here's what's happening with your events today.
        </p>
      </div>

      {/* Error */}
      {error && (
        <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      {/* STATS GRID */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => {
          const Icon = stat.icon
          return (
            <Card key={i} className={cardHover}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          )
        })}
      </div>


      {/* EVENTS GRID */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-8 items-stretch">

        {/* RECENT EVENTS */}
        <Card className="bg-card lg:col-span-4 h-full flex flex-col">
          <CardHeader>
            <CardTitle className="text-lg">Recent Events</CardTitle>
            <CardDescription>Your latest events</CardDescription>
          </CardHeader>

          <CardContent className="flex-1">
            <div className="space-y-4">
              {recentEvents.length === 0 ? (
                <p className="text-muted-foreground text-sm">No events yet. Create your first event!</p>
              ) : recentEvents.map((ev) => (
                <div key={ev._id} className={eventRow}>
                  <div>
                    <p className="text-base font-semibold mb-1">{ev.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {formatDate(ev.date)} • {ev.ticketsSold || 0}/{ev.totalTickets || 0} sold
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-base font-semibold">₹{((ev.ticketsSold || 0) * ev.price).toLocaleString()}</p>
                    <Badge variant="outline" className={`mt-1 text-[10px] px-1.5 py-0 h-4 capitalize
                      ${ev.status === 'active' ? 'border-emerald-500/30 text-emerald-500' : ''}
                      ${ev.status === 'completed' ? 'border-amber-500/30 text-amber-500' : ''}
                      ${ev.status === 'cancelled' ? 'border-red-500/30 text-red-500' : ''}
                    `}>
                      {ev.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>


        {/* UPCOMING EVENTS */}
        <Card className="bg-card lg:col-span-4 h-full flex flex-col">
          <CardHeader>
            <CardTitle className="text-lg">Upcoming Events</CardTitle>
            <CardDescription>Events scheduled soon</CardDescription>
          </CardHeader>

          <CardContent className="flex-1">
            <div className="space-y-4">
              {upcomingEvents.length === 0 ? (
                <p className="text-muted-foreground text-sm">No upcoming events scheduled.</p>
              ) : upcomingEvents.map((ev) => (
                <div key={ev._id} className={eventRow}>
                  <div>
                    <p className="text-base font-semibold mb-1">{ev.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {formatDate(ev.date)} • {((ev.totalTickets || 0) - (ev.ticketsSold || 0))} tickets left
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-base font-semibold">₹{((ev.ticketsSold || 0) * ev.price).toLocaleString()}</p>
                    <Badge variant="secondary" className="mt-1 text-[10px] px-1.5 py-0 h-4">
                      Upcoming
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  )
}