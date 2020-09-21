const express = require('express')
const router = express.Router()

const Million = require('../models/Million')

router.get('/:search', async (req, res) => {
  try {
    const searchResult = await Million.find({ content: req.params.search })

    if (searchResult) {
      res.json(searchResult)
    }
    else {
      return res.status(400)
    }
  }
  catch (err) {
    console.error(err)
    res.status(500).json('Server error')
  }
} )

module.exports = router