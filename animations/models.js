'use strict'
const mongoose = require('mongoose');

const animationSchema = mongoose.Schema({
    title: {type: String, required: true},
    creationDate: {type: Date, required: true},
    frame: [{
        color: String,
        lines: [{
          mouseX: Number, 
          mouseY: Number, 
          pmouseX: Number, 
          pmouseY: Number
        }],
        points: [{
          x: Number,
          y: Number
        }],
        radius: Number
    }],
});

//virtual for formatted date
animationSchema.virtual('formatDate').get(function(){

})

animationSchema.methods.apiRepr = function(){
  return {
    id: this._id,
    title: this.title,
    creationDate: this.creationDate,
    frame: this.frame
  };
}

const Animations = mongoose.model('Animations', animationSchema);

module.exports = {Animations}; 
