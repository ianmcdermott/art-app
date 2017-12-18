const mongoose = require('mongoose');

function StorageException(message) {
   this.message = message;
   this.name = "StorageException";
}

const sequenceSchema = mongoose.Schema({
  title: {type: String, required: true},
  // Frame Images are loaded from media folder, arrays contain their locations
  guide: {type: String, required: true},
  userDrawn: [{type: String, required: false}],
  lastDrawn: {type: Date}
});



// when creating video player, may want virtual that will allow the arrays to add all content together? 

sequenceSchema.methods.apiRepr = function(){
  return{
    id: this._id,
    title: this.title,
    guide: this.guide,
    userDrawn: this.userDrawn,
    lastDrawn: this.lastDrawn
  };
}  

const Sequences = mongoose.model('Sequences', sequenceSchema);

module.exports = {Sequences}