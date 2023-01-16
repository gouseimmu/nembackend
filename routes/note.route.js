const express = require("express");
const { NoteModel } = require("../models/note.module");

const noteRouter = express.Router();

noteRouter.get("/", async (req, res) => {
  try{
    const all_notes = await NoteModel.find();
    res.send(all_notes);
  }catch(err){
    console.log(err)
     res.send("not able to get Notes, Something went wrong")
  }
 
});

noteRouter.post("/create", async (req, res) => {
  const payload = req.body;
  try {
    const new_note = new NoteModel(payload);
    await new_note.save();
    res.send("Created New Note");
  } catch (err) {
    console.log(err);
    res.send("Something went Wrong");
  }
 
});

noteRouter.patch("/update/:id", async (req, res) => {
  const payload = req.body;
  const id = req.params.id;
  const note = await NoteModel.findOne({ _id: id });
  const userID_in_note = note.userID;
  const userID_making_req = req.body.userID;
  try {
    if (userID_in_note !== userID_making_req) {
      res.send({ "msg": "You are not authorized" });
    } else {
      await NoteModel.findByIdAndUpdate({ _id: id }, payload);
      res.send(`Note with ${id} is Updated`);
    }
  } catch (err) {
    console.log(err);
    res.send({ "msg": "Something Went Wrong" });
  }
});

noteRouter.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  const note = await NoteModel.findOne({ _id: id });
  const userID_in_note = note.userID;
  const userID_making_req = req.body.userID;
  try {
    if (userID_in_note !== userID_making_req) {
      res.send({ "msg": "You are not authorized" });
    } else {
      await NoteModel.findByIdAndDelete({ _id: id });
      res.send(`Note with ${id} is deleted`);
    }
  } catch (err) {
    console.log(err);
    res.send({ "msg": "Something Went Wrong" });
  }
});

module.exports = {
  noteRouter,
};



// 63c22c9a42486b9503969d20