const express = require('express');
const controller = require('../Controller/movies')

const router = express.Router()

router.get('/', controller.index)

module.exports = router