import { useState } from "react"
import { Layout } from "./components/Layout/Layout"
import { SelectMap } from "./features/map-selection/SelectMap"
import { EditCharacter } from "./features/character-editor/EditCharacter"
import { SelectMusic } from "./features/music-selection/SelectMusic"
import { StepProgress } from "./components/StepProgress/StepProgress"
import "./styles/global.css"

// Note: In a real application, you would import API functions from a separate file
// import { fetchGameSetup, updateGameSetup } from './api/gameSetup'

type Page = "selectMap" | "editCharacter" | "selectMusic"

function App() {
  const [currentPage, setCurrentPage] = useState<Page>("selectMap")
  const [selectedMap, setSelectedMap] = useState<number | null>(null)
  const [selectedCharacter, setSelectedCharacter] = useState<number | null>(null)
  const [selectedMusic, setSelectedMusic] = useState<number | null>(null)

  const steps = ["Select Map", "Edit Character", "Select Music"]

  // Note: In a real application, you would fetch the initial game setup from the backend
  // useEffect(() => {
  //   const loadGameSetup = async () => {
  //     const setup = await fetchGameSetup()
  //     setSelectedMap(setup.mapId)
  //     setSelectedCharacter(setup.characterId)
  //     setSelectedMusic(setup.musicId)
  //   }
  //   loadGameSetup()
  // }, [])

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

  const handleSave = () => {
    if (selectedMap && selectedCharacter && selectedMusic) {
      // Note: In a real application, you would save the game setup to the backend
      // updateGameSetup({ mapId: selectedMap, characterId: selectedCharacter, musicId: selectedMusic })
      alert(`Saved! Map: ${selectedMap}, Character: ${selectedCharacter}, Music: ${selectedMusic}`)
    } else {
      alert("Please complete all selections before saving!")
    }
  }

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

