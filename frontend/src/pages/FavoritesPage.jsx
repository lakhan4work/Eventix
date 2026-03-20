import { useEffect, useState } from "react"
import { Heart } from "lucide-react"

export function FavoritesPage() {
  const [favorites, setFavorites] = useState([])

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("favorites")) || []
    setFavorites(data)
  }, [])

  return (
    <div className="min-h-screen p-10">
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
        <Heart className="text-red-500" />
        Your Favorites
      </h1>

      {favorites.length === 0 ? (
        <p className="text-muted-foreground">
          No favorite events yet.
        </p>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {favorites.map((event) => (
            <div
              key={event.id}
              className="border border-border rounded-lg overflow-hidden"
            >
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h2 className="font-bold text-lg">{event.title}</h2>
                <p className="text-sm text-muted-foreground">
                  {event.location}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}