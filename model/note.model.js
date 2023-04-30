 
  const mongoose = require("mongoose");

  const noteSchema = mongoose.Schema({
         name : String,
         title : String,
         disc:  String,
         author : String,
         authorID : String
  })
  
  const NoteModel=mongoose.model("notes" , noteSchema);
  
    module.exports={NoteModel};

