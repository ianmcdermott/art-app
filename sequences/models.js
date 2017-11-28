const mongoose = require('mongoose');

function StorageException(message) {
   this.message = message;
   this.name = "StorageException";
}

const sequenceSchema = mongoose.Schema({
  name: {type: String, required: true},
  // Frame Images are loaded from media folder, arrays contain their locations
  guide: [{type: String}],
  userDrawn: [{type: String}],
  credits: [{type: String}],
});

// when creating video player, may want virtual that will allow the arrays to add all content together? 

sequenceSchema.methods.apiRepr = function(){
  return{
    id: this._id,
    name: this.name,
    guide: this.guide,
    userDrawn: this.userDrawn,
    credits: this.credits
  };
}  

const Sequences = mongoose.model('Sequences', sequenceSchema);

module.exports = {Sequences}