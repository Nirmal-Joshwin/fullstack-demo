const express = require('express')
const router = express.Router()
const Note = require('../models/Note')
const auth = require('../middleware/auth')

// get all notes for the logged in user
router.get('/', auth, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.userId }).sort({ createdAt: -1 })
    res.json(notes)
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Error getting notes' })
  }
})

// add a new note
router.post('/', auth, async (req, res) => {
  try {
    const { title, content } = req.body
    const note = new Note({
      title: title,
      content: content,
      user: req.userId
    })
    await note.save()
    res.status(201).json(note)
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Error adding note' })
  }
})

// delete a note
router.delete('/:id', auth, async (req, res) => {
  try {
    await Note.findByIdAndDelete(req.params.id)
    res.json({ message: 'Note deleted' })
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Error deleting note' })
  }
})

module.exports = router
