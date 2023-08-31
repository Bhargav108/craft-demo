const asyncHandler = require('express-async-handler')

const Idea = require('../models/ideaModel')

// @desc    Get all ideas
// @route   GET /api/ideas
// @access  Public
const getIdeas = asyncHandler(async (req, res) => {
  try {
    const ideas = await Idea.find();
    res.status(200).json(ideas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


// @desc    Get single idea by ID
// @route   GET /api/ideas/:id
// @access  Public
const getIdeaById = asyncHandler(async (req, res) => {
  const id = req.params.id;

  try {
    const idea = await Idea.findById(id);

    if (!idea) {
      res.status(404).json({ message: 'Idea not found' });
      return;
    }

    res.status(200).json(idea);
  } catch (error) {
    console.error(error);

    // Handle specific Mongoose validation errors
    if (error.name === 'CastError') {
      res.status(400).json({ message: 'Invalid idea ID format' });
      return;
    }

    res.status(500).json({ error: 'Internal server error' });
  }
});



// @desc    Set idea
// @route   POST /api/ideas
// @access  Public
const setIdea = asyncHandler(async (req, res) => {

  if (!req.body.title) {
    res.status(400)
    throw new Error('Please add a title field')
  }

  if (!req.body['sub-title']) {
    res.status(400)
    throw new Error('Please add a subtitle field')
  }
  

  const idea = await Idea.create({
    title: req.body.title,
    'sub-title': req.body['sub-title'],
    content: req.body.content
  })

  res.status(200).json(idea)
})

// @desc    Update idea
// @route   PUT /api/ideas/:id
// @access  Public
const updateIdea = asyncHandler(async (req, res) => {
  // Find the idea by its ID
  const idea = await Idea.findById(req.params.id);

  if (!idea) {
    res.status(400);
    throw new Error('Idea not found');
  }

  console.log('req.body', req.body)

  // Update the idea using findByIdAndUpdate
  const updatedIdea = await Idea.findByIdAndUpdate(req.params.id, req.body, {
    new: true, // Return the updated document after the update
  });

  res.status(200).json(updatedIdea);
});


// // @desc    Update idea content with content references
// // @route   PUT /api/ideas/update-content/:id
// // @access  Public
const updateIdeaContentWithReferences = asyncHandler(async (req, res) => {
  const { content } = req.body;
  const id = req.params.id;

  try {
    const idea = await Idea.findById(id);

    if (!idea) {
      res.status(400).json({ error: 'Idea not found' });
    }

    // Extracting referenced IDs from content
    const referencedIds = Array.from(content.matchAll(/#([0-9a-fA-F]{24})/g), match => match[1]);

    if(referencedIds.length) {
      // Fetched all referenced ideas and their contents
      const referencedIdeas = await Idea.find({ _id: { $in: referencedIds } }, 'content');

      // Creating a map of referenced ideas for efficient lookups
      const referencedIdeasMap = new Map();
      referencedIdeas.forEach(referencedIdea => {
        referencedIdeasMap.set(referencedIdea._id.toString(), referencedIdea.content);
      });

      // Replacing references in the content
      const replacedContent = content.replace(/#([0-9a-fA-F]{24})/g, (match, id) => {
        return referencedIdeasMap.get(id) || match; // Replace with referenced idea's content or keep the match
      });

      // Updating the idea's content
      idea.content = replacedContent;
      await idea.save();
    }

    res.status(200).json(idea);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});



// @desc    Delete an idea
// @route   DELETE /api/ideas/:id
// @access  Private
const deleteIdea = asyncHandler(async (req, res) => {
  const ideaId = req.params.id;

  try {
    const idea = await Idea.findById(ideaId);

    if (!idea) {
      res.status(404).json({ message: 'Idea not found' });
      return;
    }

    await idea.remove();

    res.status(200).json({ id: ideaId });
  } catch (error) {
    // Handle specific Mongoose validation errors
    if (error.name === 'CastError') {
      res.status(400).json({ message: 'Invalid idea ID format' });
      return;
    }

    res.status(500).json({ error: 'Internal server error' });
  }
});


module.exports = {
  getIdeas,
  setIdea,
  updateIdea,
  deleteIdea,
  getIdeaById,
  updateIdeaContentWithReferences
}
