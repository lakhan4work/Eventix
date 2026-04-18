import { useState, useEffect } from "react"
import { useAuth } from "../lib/auth"
import { Button } from "../components/ui/Button"
import { Input } from "../components/ui/Input"
import { Card, CardContent } from "../components/ui/Card"
import { User, Mail, Camera, Save, LogOut, Loader2 } from "lucide-react"
import { useNavigate } from "react-router-dom"
import userService from "../services/user.services"

export function ProfilePage() {
  const { user, logout, login } = useAuth()
  const navigate = useNavigate()
  
  const [isEditing, setIsEditing] = useState(false)
  const [loading, setLoading] = useState(true)
  const [profileData, setProfileData] = useState(null)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    bio: "Event enthusiast and regular attendee.",
  })

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true)
        const data = await userService.getProfile()
        // Backend returns user object via res.json(req.user)
        setProfileData(data)
        setFormData({
          name: data.name || "",
          email: data.email || "",
          bio: "Event enthusiast and regular attendee.",
        })
      } catch (err) {
        console.error("Failed to fetch profile:", err)
        // Fall back to auth context user
        if (user) {
          setProfileData(user)
          setFormData({
            name: user.name || "",
            email: user.email || "",
            bio: "Event enthusiast and regular attendee.",
          })
        }
      } finally {
        setLoading(false)
      }
    }
    fetchProfile()
  }, [])

  const handleSave = (e) => {
    e.preventDefault()
    setIsEditing(false)
    // In a real app, you'd call an update profile API here
  }

  const handleLogout = () => {
    logout()
    navigate("/auth")
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-brand-500" />
        <span className="ml-3 text-muted-foreground">Loading profile...</span>
      </div>
    )
  }

  const displayUser = profileData || user
  if (!displayUser) return null;

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl min-h-[calc(100vh-4rem)]">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Profile</h1>
          <p className="text-muted-foreground mt-1">Manage your personal information and preferences.</p>
        </div>
        <Button variant="outline" className="border-red-500/30 text-red-500 hover:bg-red-500/10" onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Column - Avatar & Quick Info */}
        <div className="md:col-span-1 space-y-6">
          <Card className="glass-card border-brand-500/20 text-center relative overflow-hidden">
            <div className="h-24 bg-gradient-brand w-full absolute top-0 left-0" />
            <CardContent className="pt-12 relative z-10 pb-8 flex flex-col items-center">
              <div className="relative mb-4 group">
                <div className="w-32 h-32 rounded-full border-4 border-background overflow-hidden bg-muted">
                  <img 
                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${displayUser.name}`} 
                    alt={displayUser.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <button className="absolute bottom-0 right-0 p-2 bg-brand-500 text-white rounded-full shadow-lg hover:bg-brand-600 transition-colors opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0">
                  <Camera className="w-4 h-4" />
                </button>
              </div>
              
              <h2 className="text-2xl font-bold">{displayUser.name}</h2>
              <p className="text-brand-400 font-medium capitalize mb-4">{displayUser.role}</p>
              
              <div className="w-full pt-4 border-t border-border mt-2 space-y-3">
                <div className="flex items-center text-sm text-muted-foreground justify-center gap-2">
                  <Mail className="h-4 w-4" />
                  {displayUser.email}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Form */}
        <div className="md:col-span-2">
          <Card className="glass-card">
            <CardContent className="p-6 md:p-8">
              <div className="flex justify-between items-center mb-6 border-b border-border pb-4">
                <h3 className="text-xl font-semibold">Personal Information</h3>
                {!isEditing && (
                  <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                    Edit Profile
                  </Button>
                )}
              </div>

              <form onSubmit={handleSave} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input 
                        disabled={!isEditing}
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="pl-10 bg-muted/50 border-border/50 disabled:opacity-70"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input 
                        disabled={!isEditing}
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="pl-10 bg-muted/50 border-border/50 disabled:opacity-70"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Bio</label>
                  <textarea 
                    disabled={!isEditing}
                    value={formData.bio}
                    onChange={(e) => setFormData({...formData, bio: e.target.value})}
                    className="w-full min-h-[120px] rounded-xl border border-border/50 bg-muted/50 px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 disabled:cursor-not-allowed disabled:opacity-70 text-foreground"
                    placeholder="Tell us a little about yourself"
                  />
                </div>

                {isEditing && (
                  <div className="flex justify-end gap-3 pt-4 border-t border-border">
                    <Button 
                      type="button" 
                      variant="ghost" 
                      onClick={() => {
                        setIsEditing(false)
                        setFormData({
                          name: displayUser.name, 
                          email: displayUser.email, 
                          bio: "Event enthusiast and regular attendee."
                        })
                      }}
                    >
                      Cancel
                    </Button>
                    <Button type="submit" variant="gradient">
                      <Save className="mr-2 h-4 w-4" />
                      Save Changes
                    </Button>
                  </div>
                )}
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
