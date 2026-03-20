import { useState } from "react"
import { Link } from "react-router-dom"
import { Calendar, MoreVertical, PlusCircle, Search, Filter, Eye, Edit, Trash2 } from "lucide-react"
import { Button } from "../components/ui/Button"
import { Card, CardContent } from "../components/ui/Card"
import { Input } from "../components/ui/Input"
import { Badge } from "../components/ui/Badge"

const MY_EVENTS = [
  { id: 1, title: "Neon Nights Music Festival", date: "Aug 15, 2026", status: "Published", attendees: 1240, capacity: 1500, sales: "$105,400" },
  { id: 2, title: "Tech Startup Pitch Night", date: "Sep 02, 2026", status: "Published", attendees: 210, capacity: 300, sales: "$12,500" },
  { id: 3, title: "Culinary Masterclass: Sushi", date: "Jul 22, 2026", status: "Draft", attendees: 0, capacity: 50, sales: "$0" },
  { id: 4, title: "Yoga & Mindfulness Retreat", date: "Oct 10, 2026", status: "Published", attendees: 12, capacity: 20, sales: "$2,400" },
  { id: 5, title: "Web3 Developer Summit", date: "Nov 05, 2026", status: "Published", attendees: 450, capacity: 500, sales: "$42,000" },
  { id: 6, title: "Indie Game Show", date: "Dec 01, 2026", status: "Unpublished", attendees: 0, capacity: 200, sales: "$0" },
]

export function OrganizerEventsPage() {

  // ✅ FIXED: added missing state
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("All")
  const [events, setEvents] = useState(MY_EVENTS)

  // ✅ filter logic (now works)
  const filteredEvents = events.filter((event) => {
    const matchesSearch = event.title
      .toLowerCase()
      .includes(search.toLowerCase())

    const matchesStatus =
      statusFilter === "All" || event.status === statusFilter

    return matchesSearch && matchesStatus
  })

  // ✅ actions
  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this event?")
    if (confirmDelete) {
      setEvents(events.filter(event => event.id !== id))
    }
  }

  const handleEdit = (event) => {
    alert(`Editing: ${event.title}`)
  }

  const handleView = (event) => {
    alert(`Viewing: ${event.title}`)
  }

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Events</h1>
          <p className="text-muted-foreground mt-1">Manage and track all your hosted events.</p>
        </div>
      </div>

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
              <option value="Published">Published</option>
              <option value="Draft">Draft</option>
              <option value="Unpublished">Unpublished</option>
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
                <th className="px-6 py-4 font-medium text-right">Attendees</th>
                <th className="px-6 py-4 font-medium text-right">Sales</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-border/50">
              {filteredEvents.map((event) => (
                <tr key={event.id} className="hover:bg-muted/20 transition-colors">

                  <td className="px-6 py-4 font-medium text-foreground">
                    {event.title}
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      {event.date}
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <Badge variant="outline" className={`
                      ${event.status === 'Published' ? 'border-emerald-500/30 text-emerald-500 bg-emerald-500/10' : ''}
                      ${event.status === 'Draft' ? 'border-amber-500/30 text-amber-500 bg-amber-500/10' : ''}
                      ${event.status === 'Unpublished' ? 'border-brand-500/30 text-brand-500 bg-brand-500/10' : ''}
                    `}>
                      {event.status}
                    </Badge>
                  </td>

                  <td className="px-6 py-4 text-right">
                    <div className="flex flex-col items-end">
                      <span>{event.attendees} / {event.capacity}</span>
                      <div className="w-24 h-1.5 bg-muted rounded-full mt-2 overflow-hidden">
                        <div 
                          className={`h-full ${event.attendees/event.capacity > 0.8 ? 'bg-emerald-500' : 'bg-brand-500'}`} 
                          style={{ width: `${(event.attendees / event.capacity) * 100}%` }}
                        />
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4 text-right font-medium">
                    {event.sales}
                  </td>

                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">

                      <Button onClick={() => handleView(event)} variant="ghost" size="icon">
                        <Eye className="h-4 w-4" />
                      </Button>

                      <Button onClick={() => handleEdit(event)} variant="ghost" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>

                      <Button onClick={() => handleDelete(event.id)} variant="ghost" size="icon">
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