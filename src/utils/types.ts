// Note: These types should match the data structures returned by the backend API.
// In a real application, you might generate these types from API documentation or schemas.

// Represents a map in the game
export type Map = {
  id: number
  name: string
  thumbnail: string
  description: string
}

// Represents a character in the game
export type Character = {
  id: number
  name: string
  description: string
  goals: string
  preview: string
  isCustom?: boolean // Indicates if the character is user-created
}

// Represents a music track in the game
export type Music = {
  id: number
  name: string
}

// Note: These types are designed to be easily extensible.
// For example, if we need to add more properties to a character in the future,
// we can simply update the Character type here, and TypeScript will help us
// identify where we need to make changes in our components.

