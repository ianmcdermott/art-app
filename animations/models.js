'use strict'
const mongoose = require('mongoose');

const animationSchema = mongoose.Schema({
    title: {type: String, required: true},
    creationDate: {type: String, required: true},
    frame: {type: String, required: true}//,
 //   animationId: {type: String, required: true}
});

//virtual for formatted date
animationSchema.virtual('formatDate').get(function(){

})

animationSchema.methods.apiRepr = function(){
  return {
    id: this._id,
    title: this.title,
    creationDate: this.creationDate,
    frame: this.frame//,
  //  animationId: this.animationID
  };
}

const Animations = mongoose.model('Animations', animationSchema);

module.exports = {Animations}; 
