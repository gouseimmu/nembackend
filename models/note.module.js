const mongoose=require("mongoose")

const noteSchema=mongoose.Schema({
    title: String,
    note: String,
    category: String,
    userID: String,
    author: String
})

const NoteModel=mongoose.model("note", noteSchema)

module.exports={
    NoteModel
}




// {
//     "title":"FSWD",
//     "note":"Today's Full Stack Crud PSC",
//     "category": "Live Session",
//     "author": "Pulkit Tyagi"
// }