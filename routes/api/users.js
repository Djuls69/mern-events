const express = require('express')
const router = express.Router()
const { body, validationResult } = require('express-validator')
const User = require('../../models/userModel')
const gravatar = require('gravatar')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const config = require('config')
const tokenKey = config.get('jwtSecretKey')

router.post(
  '/',
  [
    body('name', 'Merci de valider votre nom').not().isEmpty(),
    body('email', 'Email non valide').isEmail(),
    body('password', '6 caractères minimum').isLength({ min: 6 })
  ],
  async (req, res) => {
    const { name, email, password, confirmPassword } = req.body
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    try {
      const existingUser = await User.findOne({ email: email })
      if (existingUser) {
        return res.status(403).json({ errors: 'Adresse email déjà utilisée' })
      }

      if (confirmPassword === null || confirmPassword !== password) {
        return res.status(403).json({ errors: 'Les mots de passe ne correspondent pas' })
      }

      const avatar = gravatar.url(email, { s: '200', r: 'pg', d: 'retro' })

      const newUser = new User({
        name,
        email,
        password,
        avatar
      })

      const salt = await bcrypt.genSalt(10)
      newUser.password = await bcrypt.hash(password, salt)

      await newUser.save()

      const payload = {
        user: {
          id: newUser.id
        }
      }
      jwt.sign(payload, tokenKey, { expiresIn: 60 * 60 * 24 }, (err, token) => {
        if (err) {
          return res.status(500).json({ errors: 'Erreur token' })
        }
        return res.json({ token })
      })
    } catch (err) {
      console.error(err.message)
      return res.status(500).json({ errors: 'Erreur serveur' })
    }
  }
)

module.exports = router
