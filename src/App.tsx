import { useState } from "react"
import { Layout } from "./components/Layout/Layout"
import { SelectMap } from "./features/map-selection/SelectMap"
import { EditCharacter } from "./features/character-editor/EditCharacter"
import { SelectMusic } from "./features/music-selection/SelectMusic"
import { StepProgress } from "./components/StepProgress/StepProgress"
import "./styles/global.css"

// Define the possible pages in the setup process
type Page = "selectMap" | "editCharacter" | "selectMusic"

function App() {
  // State management for the current page and selected items
  const [currentPage, setCurrentPage] = useState<Page>("selectMap")
  const [selectedMap, setSelectedMap] = useState<number | null>(null)
  const [selectedCharacter, setSelectedCharacter] = useState<number | null>(null)
  const [selectedMusic, setSelectedMusic] = useState<number | null>(null)

  const steps = ["Select Map", "Edit Character", "Select Music"]

  // In a real application, you would fetch the initial game setup from the backend
  // useEffect(() => {
  //   const loadGameSetup = async () => {
  //     const setup = await fetchGameSetup()
  //     setSelectedMap(setup.mapId)
  //     setSelectedCharacter(setup.characterId)
  //     setSelectedMusic(setup.musicId)
  //   }
  //   loadGameSetup()
  // }, [])

  // Navigation handlers
  const handleNext = () => {
    if (currentPage === "selectMap" && selectedMap) {
      setCurrentPage("editCharacter")
    } else if (currentPage === "editCharacter") {
      setCurrentPage("selectMusic")
    }
  }

  const handleBack = () => {
    if (currentPage === "editCharacter") {
      setCurrentPage("selectMap")
    } else if (currentPage === "selectMusic") {
      setCurrentPage("editCharacter")
    }
  }

  // Save handler - in a real app, this would interact with the backend
  const handleSave = () => {
    if (selectedMap && selectedCharacter && selectedMusic) {
      // In a real application, you would save the game setup to the backend
      // updateGameSetup({ mapId: selectedMap, characterId: selectedCharacter, musicId: selectedMusic })
      alert(`Saved! Map: ${selectedMap}, Character: ${selectedCharacter}, Music: ${selectedMusic}`)
    } else {
      alert("Please complete all selections before saving!")
    }
  }

  // Helper function to determine the current step for the progress bar
  const getCurrentStep = () => {
    switch (currentPage) {
      case "selectMap":
        return 0
      case "editCharacter":
        return 1
      case "selectMusic":
        return 2
    }
  }

  return (
    <Layout>
      <StepProgress currentStep={getCurrentStep()} steps={steps} />
      {/* Render the appropriate component based on the current page */}
      {currentPage === "selectMap" && (
        <SelectMap selectedMap={selectedMap} setSelectedMap={setSelectedMap} onNext={handleNext} />
      )}
      {currentPage === "editCharacter" && (
        <EditCharacter
          selectedCharacter={selectedCharacter}
          setSelectedCharacter={setSelectedCharacter}
          onBack={handleBack}
          onNext={handleNext}
        />
      )}
      {currentPage === "selectMusic" && (
        <SelectMusic
          selectedMusic={selectedMusic}
          setSelectedMusic={setSelectedMusic}
          onBack={handleBack}
          onSave={handleSave}
        />
      )}
    </Layout>
  )
}

export default App

