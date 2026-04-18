import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Check, ChevronRight, MapPin, Tag, Calendar, Image as ImageIcon, Ticket, Settings, ArrowRight, ArrowLeft, Loader2, Plus, Trash2 } from "lucide-react"
import { Button } from "../components/ui/Button"
import { Input } from "../components/ui/Input"
import { Select } from "../components/ui/Select"
import { Card, CardContent } from "../components/ui/Card"
import { createEvent } from "../services/events.services"

const STEPS = [
  { id: 1, title: "Basic Info", icon: <Tag className="w-5 h-5" /> },
  { id: 2, title: "Description", icon: <ImageIcon className="w-5 h-5" /> },
  { id: 3, title: "Agenda", icon: <Calendar className="w-5 h-5" /> },
  { id: 4, title: "Settings", icon: <Settings className="w-5 h-5" /> },
]

export function CreateEventPage() {
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  // Form state matching backend Event model
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    date: "",
    time: "",
    location: "",
    description: "",
    price: "",
    totalTickets: "",
  })

  const [imageFile, setImageFile] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)

  // Speakers array
  const [speakers, setSpeakers] = useState([])
  // Agenda array
  const [agenda, setAgenda] = useState([])

  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleImageChange = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      setImageFile(file)
      setImagePreview(URL.createObjectURL(file))
    }
  }

  // Speaker helpers
  const addSpeaker = () => setSpeakers([...speakers, { name: "", role: "", image: "" }])
  const updateSpeaker = (idx, field, value) => {
    const updated = [...speakers]
    updated[idx][field] = value
    setSpeakers(updated)
  }
  const removeSpeaker = (idx) => setSpeakers(speakers.filter((_, i) => i !== idx))

  // Agenda helpers
  const addAgendaItem = () => setAgenda([...agenda, { time: "", title: "", desc: "" }])
  const updateAgendaItem = (idx, field, value) => {
    const updated = [...agenda]
    updated[idx][field] = value
    setAgenda(updated)
  }
  const removeAgendaItem = (idx) => setAgenda(agenda.filter((_, i) => i !== idx))

  const handleNext = () => {
    if (currentStep < STEPS.length) setCurrentStep(currentStep + 1)
  }

  const handlePrev = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1)
  }

  const handlePublish = async () => {
    setError("")
    setLoading(true)

    try {
      // Build FormData for multipart upload (image + JSON fields)
      const fd = new FormData()
      fd.append("title", formData.title)
      fd.append("category", formData.category)
      fd.append("date", formData.date)
      fd.append("time", formData.time)
      fd.append("location", formData.location)
      fd.append("description", formData.description)
      fd.append("price", formData.price)
      fd.append("totalTickets", formData.totalTickets)
      fd.append("speakers", JSON.stringify(speakers.filter(s => s.name)))
      fd.append("agenda", JSON.stringify(agenda.filter(a => a.title)))

      if (imageFile) {
        fd.append("image", imageFile)
      }

      await createEvent(fd)

      // Redirect to organizer events page on success
      navigate("/organizer/events")
    } catch (err) {
      const msg = err?.data?.message || err?.message || "Failed to create event. Please try again."
      setError(msg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-muted/30 pb-20">
      {/* Header */}
      <div className="bg-card border-b border-border py-8">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gradient mb-2">Create New Event</h1>
          <p className="text-muted-foreground">Fill in the details below to publish your event</p>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-4xl mt-8">
        {/* Progress Indicator */}
        <div className="mb-10">
          <div className="flex justify-between items-center relative">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-border -z-10 rounded-full"></div>
            <div 
              className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-brand-500 -z-10 rounded-full transition-all duration-300"
              style={{ width: `${((currentStep - 1) / (STEPS.length - 1)) * 100}%` }}
            ></div>
            
            {STEPS.map((step) => (
              <div key={step.id} className="flex flex-col items-center gap-2">
                <div 
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300
                    ${currentStep > step.id ? 'bg-brand-500 text-white shadow-lg shadow-brand-500/30' : 
                      currentStep === step.id ? 'bg-card border-2 border-brand-500 text-brand-500' : 
                      'bg-card border border-border text-muted-foreground'}`
                  }
                >
                  {currentStep > step.id ? <Check className="w-5 h-5" /> : step.icon}
                </div>
                <span className={`text-xs font-semibold hidden md:block ${currentStep >= step.id ? 'text-foreground' : 'text-muted-foreground'}`}>
                  {step.title}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-lg text-sm mb-6">
            {error}
          </div>
        )}

        {/* Form Content Area */}
        <Card className="glass-card bg-card/80 border-white/5 py-4">
          <CardContent className="p-6 md:p-10">
            
            {/* STEP 1: Basic Info */}
            {currentStep === 1 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                <div className="mb-8">
                  <h2 className="text-2xl font-bold">Basic Information</h2>
                  <p className="text-muted-foreground">Name your event and tell attendees why they should come.</p>
                </div>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Event Title <span className="text-red-500">*</span></label>
                    <Input 
                      placeholder="Be clear and descriptive" 
                      className="h-12 text-lg bg-background"
                      value={formData.title}
                      onChange={(e) => updateField("title", e.target.value)}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Category <span className="text-red-500">*</span></label>
                      <Select 
                        className="h-12 bg-background"
                        value={formData.category}
                        onChange={(e) => updateField("category", e.target.value)}
                      >
                        <option value="">Select category</option>
                        <option value="technology">Technology</option>
                        <option value="business">Business</option>
                        <option value="health">Health</option>
                        <option value="education">Education</option>
                        <option value="entertainment">Entertainment</option>
                        <option value="other">Other</option>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Total Tickets <span className="text-red-500">*</span></label>
                      <Input 
                        type="number" 
                        placeholder="e.g. 100" 
                        className="h-12 bg-background"
                        value={formData.totalTickets}
                        onChange={(e) => updateField("totalTickets", e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Date <span className="text-red-500">*</span></label>
                      <Input 
                        type="date" 
                        className="h-12 bg-background"
                        value={formData.date}
                        onChange={(e) => updateField("date", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Time</label>
                      <Input 
                        type="time" 
                        className="h-12 bg-background"
                        value={formData.time}
                        onChange={(e) => updateField("time", e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Venue Location <span className="text-red-500">*</span></label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3.5 h-5 w-5 text-muted-foreground" />
                      <Input 
                        placeholder="Search for a venue or address" 
                        className="pl-10 h-12 bg-background"
                        value={formData.location}
                        onChange={(e) => updateField("location", e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2: Description & Image */}
            {currentStep === 2 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                <div className="mb-8">
                  <h2 className="text-2xl font-bold">Description & Media</h2>
                  <p className="text-muted-foreground">
                    Add details and images to make your event stand out.
                  </p>
                </div>

                <div className="space-y-6">
                  {/* Event Image */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Event Image / Banner</label>
                    <label className="border-2 border-dashed border-border rounded-xl p-12 text-center bg-background/50 hover:bg-muted/50 transition-colors cursor-pointer group block">
                      <input 
                        type="file" 
                        accept="image/*" 
                        className="hidden" 
                        onChange={handleImageChange}
                      />
                      {imagePreview ? (
                        <img src={imagePreview} alt="Preview" className="max-h-48 mx-auto rounded-lg object-cover" />
                      ) : (
                        <>
                          <div className="bg-muted w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                            <ImageIcon className="h-8 w-8 text-muted-foreground group-hover:text-brand-500 transition-colors" />
                          </div>
                          <p className="font-semibold text-foreground mb-1">
                            Click to upload or drag and drop
                          </p>
                          <p className="text-sm text-muted-foreground">
                            SVG, PNG, JPG or GIF (max. 800x400px)
                          </p>
                        </>
                      )}
                    </label>
                  </div>

                  {/* Event Description */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Event Description</label>
                    <textarea
                      className="w-full h-48 p-4 bg-background border border-input rounded-md outline-none resize-y placeholder:text-muted-foreground/50 text-foreground"
                      placeholder="Describe your event..."
                      value={formData.description}
                      onChange={(e) => updateField("description", e.target.value)}
                    ></textarea>
                  </div>

                  {/* Ticket Price */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Ticket Price (₹) <span className="text-red-500">*</span></label>
                    <Input
                      type="number"
                      placeholder="Enter price (e.g. 500), 0 for free"
                      className="bg-background border-border"
                      value={formData.price}
                      onChange={(e) => updateField("price", e.target.value)}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* STEP 3: Agenda & Speakers */}
            {currentStep === 3 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                <div className="mb-8">
                  <h2 className="text-2xl font-bold">Agenda & Speakers</h2>
                  <p className="text-muted-foreground">Add schedule items and speaker details (optional).</p>
                </div>

                {/* Agenda */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Agenda Items</h3>
                    <Button variant="outline" size="sm" onClick={addAgendaItem}>
                      <Plus className="h-4 w-4 mr-1" /> Add Item
                    </Button>
                  </div>
                  {agenda.length === 0 && (
                    <p className="text-sm text-muted-foreground">No agenda items yet. Click "Add Item" to start.</p>
                  )}
                  {agenda.map((item, idx) => (
                    <div key={idx} className="grid grid-cols-1 md:grid-cols-[120px_1fr_1fr_auto] gap-3 items-start bg-background/50 p-4 rounded-xl border border-border/50">
                      <Input 
                        placeholder="Time" 
                        value={item.time}
                        onChange={(e) => updateAgendaItem(idx, "time", e.target.value)}
                        className="bg-background"
                      />
                      <Input 
                        placeholder="Title" 
                        value={item.title}
                        onChange={(e) => updateAgendaItem(idx, "title", e.target.value)}
                        className="bg-background"
                      />
                      <Input 
                        placeholder="Description" 
                        value={item.desc}
                        onChange={(e) => updateAgendaItem(idx, "desc", e.target.value)}
                        className="bg-background"
                      />
                      <Button variant="ghost" size="icon" onClick={() => removeAgendaItem(idx)} className="text-red-400 hover:text-red-500">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>

                {/* Speakers */}
                <div className="space-y-4 pt-4 border-t border-border">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Speakers</h3>
                    <Button variant="outline" size="sm" onClick={addSpeaker}>
                      <Plus className="h-4 w-4 mr-1" /> Add Speaker
                    </Button>
                  </div>
                  {speakers.length === 0 && (
                    <p className="text-sm text-muted-foreground">No speakers yet. Click "Add Speaker" to start.</p>
                  )}
                  {speakers.map((s, idx) => (
                    <div key={idx} className="grid grid-cols-1 md:grid-cols-[1fr_1fr_auto] gap-3 items-start bg-background/50 p-4 rounded-xl border border-border/50">
                      <Input 
                        placeholder="Speaker Name" 
                        value={s.name}
                        onChange={(e) => updateSpeaker(idx, "name", e.target.value)}
                        className="bg-background"
                      />
                      <Input 
                        placeholder="Role (e.g. Headliner)" 
                        value={s.role}
                        onChange={(e) => updateSpeaker(idx, "role", e.target.value)}
                        className="bg-background"
                      />
                      <Button variant="ghost" size="icon" onClick={() => removeSpeaker(idx)} className="text-red-400 hover:text-red-500">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 4: Review & Settings */}
            {currentStep === 4 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                <div className="mb-8">
                  <h2 className="text-2xl font-bold">Review & Publish</h2>
                  <p className="text-muted-foreground">Review your event details before publishing.</p>
                </div>

                <div className="space-y-4">
                  <div className="bg-background/50 rounded-xl p-6 border border-border/50 space-y-3">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Title</span>
                        <p className="font-medium">{formData.title || "—"}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Category</span>
                        <p className="font-medium capitalize">{formData.category || "—"}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Date</span>
                        <p className="font-medium">{formData.date || "—"}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Time</span>
                        <p className="font-medium">{formData.time || "—"}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Location</span>
                        <p className="font-medium">{formData.location || "—"}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Price</span>
                        <p className="font-medium">{formData.price ? `₹${formData.price}` : "Free"}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Total Tickets</span>
                        <p className="font-medium">{formData.totalTickets || "—"}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Image</span>
                        <p className="font-medium">{imageFile ? imageFile.name : "Default"}</p>
                      </div>
                    </div>
                    {formData.description && (
                      <div className="pt-3 border-t border-border/50">
                        <span className="text-muted-foreground text-sm">Description</span>
                        <p className="text-sm mt-1 text-foreground/80 whitespace-pre-wrap">{formData.description}</p>
                      </div>
                    )}
                    {agenda.length > 0 && (
                      <div className="pt-3 border-t border-border/50">
                        <span className="text-muted-foreground text-sm">Agenda: {agenda.length} item(s)</span>
                      </div>
                    )}
                    {speakers.length > 0 && (
                      <div className="pt-3 border-t border-border/50">
                        <span className="text-muted-foreground text-sm">Speakers: {speakers.map(s => s.name).join(", ")}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-10 pt-6 border-t border-border">
              <Button 
                variant="outline" 
                size="lg" 
                onClick={handlePrev}
                disabled={currentStep === 1}
                className="w-32"
              >
                <ArrowLeft className="mr-2 h-4 w-4" /> Back
              </Button>
              
              {currentStep < STEPS.length ? (
                <Button variant="gradient" size="lg" onClick={handleNext} className="w-32">
                  Next Step <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <Button 
                  variant="gradient" 
                  size="lg" 
                  className="w-40 bg-emerald-500 hover:bg-emerald-600 border-0 text-white"
                  onClick={handlePublish}
                  disabled={loading}
                >
                  {loading ? (
                    <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Publishing...</>
                  ) : (
                    "Publish Event"
                  )}
                </Button>
              )}
            </div>

          </CardContent>
        </Card>
      </div>
    </div>
  )
}
