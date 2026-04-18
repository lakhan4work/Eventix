import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Calendar, Search, Eye, Edit, Trash2, Loader2 } from "lucide-react"
import { Button } from "../components/ui/Button"
import { Card, CardContent } from "../components/ui/Card"
import { Input } from "../components/ui/Input"
import { Badge } from "../components/ui/Badge"
import { getEventByOrganizer, deleteEvent } from "../services/events.services"

export function OrganizerEventsPage() {
  const navigate = useNavigate()
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("All")
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    fetchEvents()
  }, [])

  const fetchEvents = async () => {
    try {
      setLoading(true)
      const data = await getEventByOrganizer()
      // Backend returns { success, message, events }
      setEvents(data.events || [])
    } catch (err) {
      console.error("Failed to fetch organizer events:", err)
      setError("Failed to load your events.")
    } finally {
      setLoading(false)
    }
  }

  // Filter logic
  const filteredEvents = events.filter((event) => {
    const matchesSearch = event.title
      .toLowerCase()
      .includes(search.toLowerCase())

    const matchesStatus =
      statusFilter === "All" || event.status === statusFilter.toLowerCase()

    return matchesSearch && matchesStatus
  })

  // Actions
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this event?")
    if (!confirmDelete) return

    try {
      await deleteEvent(id)
      setEvents(events.filter(event => event._id !== id))
    } catch (err) {
      alert(err?.data?.message || err?.message || "Failed to delete event")
    }
  }

  const handleView = (event) => {
    navigate(`/events/${event._id}`)
  }

  // Helpers
  const formatDate = (dateStr) => {
    if (!dateStr) return ""
    return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  }

  const formatPrice = (p) => (p === 0 ? "Free" : `₹${p}`)

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[40vh]">
        <Loader2 className="h-8 w-8 animate-spin text-brand-500" />
        <span className="ml-3 text-muted-foreground">Loading your events...</span>
      </div>
    )
  }

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Events</h1>
          <p className="text-muted-foreground mt-1">Manage and track all your hosted events.</p>
        </div>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-lg text-sm mb-6">
          {error}
        </div>
      )}

      <Card className="bg-card mb-8">
        <CardContent className="p-4 flex flex-col md:flex-row gap-4 justify-between items-center">
          
          <div className="flex w-full md:w-auto gap-4">
            
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search events..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 bg-muted/50"
              />
            </div>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-muted/50 border border-border rounded-md px-3 py-2 text-sm"
            >
              <option value="All">All</option>
              <option value="Active">Active</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>

          </div>

          <div className="flex gap-2 text-sm text-muted-foreground">
            <span className="font-medium text-foreground">
              {filteredEvents.length}
            </span> 
            Total Events
          </div>
        </CardContent>
      </Card>

      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-muted/50 text-muted-foreground uppercase text-xs">
              <tr>
                <th className="px-6 py-4 font-medium">Event Name</th>
                <th className="px-6 py-4 font-medium">Date</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Tickets</th>
                <th className="px-6 py-4 font-medium text-right">Revenue</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-border/50">
              {filteredEvents.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-muted-foreground">
                    No events found.
                  </td>
                </tr>
              ) : filteredEvents.map((event) => (
                <tr key={event._id} className="hover:bg-muted/20 transition-colors">

                  <td className="px-6 py-4 font-medium text-foreground">
                    {event.title}
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      {formatDate(event.date)}
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <Badge variant="outline" className={`capitalize
                      ${event.status === 'active' ? 'border-emerald-500/30 text-emerald-500 bg-emerald-500/10' : ''}
                      ${event.status === 'completed' ? 'border-amber-500/30 text-amber-500 bg-amber-500/10' : ''}
                      ${event.status === 'cancelled' ? 'border-red-500/30 text-red-500 bg-red-500/10' : ''}
                    `}>
                      {event.status}
                    </Badge>
                  </td>

                  <td className="px-6 py-4 text-right">
                    <div className="flex flex-col items-end">
                      <span>{event.ticketsSold || 0} / {event.totalTickets || 0}</span>
                      <div className="w-24 h-1.5 bg-muted rounded-full mt-2 overflow-hidden">
                        <div 
                          className={`h-full ${(event.ticketsSold || 0) / (event.totalTickets || 1) > 0.8 ? 'bg-emerald-500' : 'bg-brand-500'}`} 
                          style={{ width: `${((event.ticketsSold || 0) / (event.totalTickets || 1)) * 100}%` }}
                        />
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4 text-right font-medium">
                    ₹{((event.ticketsSold || 0) * event.price).toLocaleString()}
                  </td>

                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">

                      <Button onClick={() => handleView(event)} variant="ghost" size="icon">
                        <Eye className="h-4 w-4" />
                      </Button>

                      <Button onClick={() => handleDelete(event._id)} variant="ghost" size="icon">
                        <Trash2 className="h-4 w-4" />
                      </Button>

                    </div>
                  </td>

                </tr>
              ))}
            </tbody>

          </table>
        </div>
      </div>
    </div>
  )
}