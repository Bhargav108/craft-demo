const express = require('express')
const router = express.Router()
const {
  getIdeas,
  getIdeaById,
  setIdea,
  deleteIdea,
  updateIdea,
  updateIdeaContentWithReferences
} = require('../controllers/ideaController')

router.route('/').get(getIdeas).post(setIdea)
router.route('/:id').delete(deleteIdea).put(updateIdea).get(getIdeaById)
router.put('/update-content/:id', updateIdeaContentWithReferences);

module.exports = router
