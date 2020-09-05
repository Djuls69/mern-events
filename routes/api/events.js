const express = require('express')
const router = express.Router()
const { body, validationResult } = require('express-validator')
const auth = require('../../middlewares/auth')
const Event = require('../../models/eventModel')
const User = require('../../models/userModel')

// Get all events
// Public
// GET /api/events
router.get('/', async (req, res) => {
  try {
    const events = await Event.find().sort({ date: -1 })
    if (events.length === 0) {
      return res.status(404).json({ errors: "Pas d'évenements créés" })
    }
    return res.json(events)
  } catch (err) {
    console.error(err.message)
    return res.status(500).json({ errors: 'Erreur serveur' })
  }
})

// Get event by id
// Public
// GET /api/events/:id
router.get('/:id', async (req, res) => {
  try {
    const event = await Event.findById(req.params.id)
    return res.json(event)
  } catch (err) {
    console.error(err.message)
    return res.status(500).json({ errors: 'Erreur serveur' })
  }
})

// Create an event
// Private
// POST /api/events
router.post(
  '/',
  [
    auth,
    [
      body('eventName', "Merci de préciser le nom de l'évenement").not().isEmpty(),
      body('type', "Merci de préciser le type d'évenement").not().isEmpty(),
      body('date', "Merci d'indiquer une date").not().isEmpty(),
      body('address', "Merci d'indiquer l'adresse").not().isEmpty()
    ]
  ],
  async (req, res) => {
    const { eventName, type, date, address, lat, lng } = req.body
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    try {
      let newEvent = await Event.findOne({ eventName })
      if (newEvent) {
        return res.status(403).json({ errors: 'Evenement déjà créé' })
      }

      const user = await User.findById(req.user.id).select('-password')

      newEvent = {
        user: req.user.id,
        userName: user.name,
        userAvatar: user.avatar,
        eventName,
        type,
        date,
        address,
        lat,
        lng
      }

      await Event(newEvent).save()
      return res.json(newEvent)
    } catch (err) {
      console.error(err.message)
      return res.status(500).json({ errors: 'Erreur serveur' })
    }
  }
)

// Delete an event
// Private
// POST /api/events/:eventId
router.delete('/:eventId', [auth], async (req, res) => {
  try {
    const event = await Event.findById(req.params.eventId)
    if (!event) {
      return res.status(404).json({ errors: 'Evenement introuvable' })
    }
    if (event.user.toString() !== req.user.id) {
      return res.status(403).json({ errors: 'Non autorisé' })
    }
    await Event.deleteOne(event)
    return res.json({ msg: 'Evenement supprimé' })
  } catch (err) {
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ error: 'Evenement introuvable' })
    }
    return res.status(500).json({ errors: 'Erreur serveur' })
  }
})

module.exports = router
