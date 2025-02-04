import type React from "react"
import "./SelectMap.css"

// Note: In a real application, you would import API functions from a separate file
// import { fetchMaps } from '../../api/maps'

// Note: This is mock data. In a real application, this data would come from the backend API.
const maps = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  name: `Map ${i + 1}`,
  thumbnail: `https://picsum.photos/seed/${i + 1}/64/64`,
  description: `This is Map ${i + 1}. Many exciting adventures await you here!`,
}))

type SelectMapProps = {
  selectedMap: number | null
  setSelectedMap: (id: number) => void
  onNext: () => void
}

export const SelectMap: React.FC<SelectMapProps> = ({ selectedMap, setSelectedMap, onNext }) => {
  // Note: In a real application, you would fetch maps from the backend when the component mounts
  // useEffect(() => {
  //   const loadMaps = async () => {
  //     const fetchedMaps = await fetchMaps()
  //     // Update the state with fetched maps
  //   }
  //   loadMaps()
  // }, [])

  return (
    <div className="pixel-container">
      <h1 className="pixel-title">Select Your Map</h1>
      <div className="pixel-content">
        <div className="pixel-list">
          {maps.map((map) => (
            <div
              key={map.id}
              className={`pixel-item ${selectedMap === map.id ? "selected" : ""}`}
              onClick={() => setSelectedMap(map.id)}
            >
              <img src={map.thumbnail || "/placeholder.svg"} alt={map.name} className="pixel-thumbnail" />
              <span>{map.name}</span>
            </div>
          ))}
        </div>
        <div className="pixel-details-container">
          {selectedMap ? (
            <div className="pixel-details">
              <h2>{maps.find((m) => m.id === selectedMap)?.name}</h2>
              <img
                src={maps.find((m) => m.id === selectedMap)?.thumbnail || "/placeholder.svg"}
                alt={`${maps.find((m) => m.id === selectedMap)?.name} preview`}
                className="pixel-preview"
              />
              <p>{maps.find((m) => m.id === selectedMap)?.description}</p>
            </div>
          ) : (
            <p className="pixel-message">Select a map to view details</p>
          )}
        </div>
      </div>
      <div className="pixel-actions">
        <button className="pixel-btn" onClick={onNext} disabled={!selectedMap}>
          Next
        </button>
      </div>
    </div>
  )
}

