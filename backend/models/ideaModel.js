const mongoose = require('mongoose')

const ideaSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please add a text value'],
    },
    'sub-title': {
      type: String,
      required: [true, 'Please add a sub title value'],
    },
    content: {
      type: String,
      required: [false, ''],
    }
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Idea', ideaSchema)
