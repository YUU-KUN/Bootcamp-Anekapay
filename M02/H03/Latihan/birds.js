// var router = require('route')
var express = require('express')
var router = express.Router()

// middleware
router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now())
  next()
})
// home page route
router.get('/birds', function (req, res) {
  res.send('Birds home page')
})
// the about route
router.get('/about', function (req, res) {
  res.send('About birds')
})

module.exports = router