import axios from 'axios'

const API_URL = '/api/notes/'

// Create new goal
const createNotes = async (notesData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.post(API_URL, notesData, config)

  return response.data
}

// Get user goals
const getNotes = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.get(API_URL, config)

  return response.data
}

// Delete user goal
const deleteNotes = async (notesId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.delete(API_URL + notesId, config)

  return response.data
}

const notesService = {
  createNotes,
  getNotes,
  deleteNotes,
}

export default notesService



