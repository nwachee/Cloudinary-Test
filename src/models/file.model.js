const mongoose = require('mongoose');


const fileSchema = new mongoose.Schema ({
    link: {
        type : String,
        trim: true,
		required: [true, 'Must provide filename']
    }
}, 
    {
    timestamps: true
  }
)

module.exports = mongoose.model('file', fileSchema);
