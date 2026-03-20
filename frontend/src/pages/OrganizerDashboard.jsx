import { Link } from "react-router-dom"
import {
  Calendar,
  CreditCard,
  Users,
  Ticket
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/Card"
import { Badge } from "../components/ui/Badge"

export function OrganizerDashboard() {

  // 🔹 Reusable styles
  const cardHover =
    "bg-card border border-transparent transition-all duration-300 ease-in-out hover:scale-[1.02] hover:bg-brand-500/10 hover:border-brand-500/40 hover:shadow-lg hover:shadow-brand-500/10 cursor-pointer"

  const eventRow =
    "flex items-center justify-between min-h-[64px] border border-transparent hover:border-brand-500/40 bg-transparent hover:bg-brand-500/10 transition-all duration-300 ease-in-out px-3 py-2 rounded-lg cursor-pointer hover:scale-[1.02]"

  // 🔹 Data
  const stats = [
    { title: "Total Revenue", value: "$45,231.89", icon: CreditCard },
    { title: "Tickets Sold", value: "+2,350", icon: Ticket },
    { title: "Active Events", value: "12", icon: Calendar },
    { title: "Total Attendees", value: "+12,234", icon: Users },
  ]

  const recentEvents = [
    { title: "Neon Nights Festival", date: "Aug 15", sales: "1,240/1,500", rev: "$105k" },
    { title: "Tech Startup Pitch", date: "Sep 02", sales: "210/300", rev: "$12.5k" },
    { title: "Culinary Workshop", date: "Jul 22", sales: "45/50", rev: "$5.4k" },
    { title: "Yoga Retreat", date: "Oct 10", sales: "12/20", rev: "$2.4k" },
  ]

  const upcomingEvents = [
    { title: "Music Concert", date: "Nov 05", status: "Starting soon", rev: "$18k" },
    { title: "AI Conference", date: "Nov 12", status: "Registration open", rev: "$25k" },
    { title: "Hackathon 2026", date: "Dec 01", status: "Early access", rev: "$40k" },
    { title: "Startup Meetup", date: "Dec 15", status: "Coming soon", rev: "$8k" },
  ]

  return (
    <div className="space-y-8">

      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard Overview</h1>
        <p className="text-muted-foreground mt-1">
          Here's what's happening with your events today.
        </p>
      </div>


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
            <CardDescription>Your latest published events</CardDescription>
          </CardHeader>

          <CardContent className="flex-1">
            <div className="space-y-4">
              {recentEvents.map((ev, i) => (
                <div key={i} className={eventRow}>
                  <div>
                    <p className="text-base font-semibold mb-1">{ev.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {ev.date} • {ev.sales} sold
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-base font-semibold">{ev.rev}</p>
                    <Badge variant="outline" className="mt-1 text-[10px] px-1.5 py-0 h-4">
                      Active
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
              {upcomingEvents.map((ev, i) => (
                <div key={i} className={eventRow}>
                  <div>
                    <p className="text-base font-semibold mb-1">{ev.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {ev.date} • {ev.status}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-base font-semibold">{ev.rev}</p>
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