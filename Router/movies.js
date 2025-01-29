const express = require('express');
const controller = require('../Controller/movies')

const router = express.Router()

router.get('/', controller.index)

router.get('/:id', controller.show)

router.post('/:id/reviews', controller.create)

module.exports = router