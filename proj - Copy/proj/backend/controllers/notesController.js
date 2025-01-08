const asyncHandler = require('express-async-handler')

const Notes = require('../models/notesModel')
const User = require('../models/userModel')

// @desc    Get goals
// @route   GET /api/goals
// @access  Private
const getNotes = asyncHandler(async (req, res) => {
  const notes = await Notes.find({ user: req.user.id })

  res.status(200).json(notes)
})

// @desc    Set goal
// @route   POST /api/goals
// @access  Private
const setNotes = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400)
    throw new Error('Please add a text field')
  }

  const notes = await Notes.create({
    text: req.body.text,
    user: req.user.id,
  })

  res.status(200).json(notes)
})

// @desc    Update goal
// @route   PUT /api/goals/:id
// @access  Private
const updateNotes = asyncHandler(async (req, res) => {
  const notes = await Notes.findById(req.params.id)

  if (!notes) {
    res.status(400)
    throw new Error('Notes not found')
  }

  // Check for user
  if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }

  // Make sure the logged in user matches the note user
  if (notes.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }

  const updatedNotes = await Notes.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  })

  res.status(200).json(updatedNotes)
})

// @desc    Delete goal
// @route   DELETE /api/goals/:id
// @access  Private
const deleteNotes = asyncHandler(async (req, res) => {
  const notes = await Notes.findById(req.params.id)

  if (!notes) {
    res.status(400)
    throw new Error('Notes not found')
  }

  // Check for user
  if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }

  // Make sure the logged in user matches the goal user
  if (notes.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }

  await notes.remove()

  res.status(200).json({ id: req.params.id })
})

module.exports = {
  getNotes,
  setNotes,
  updateNotes,
  deleteNotes,
}
