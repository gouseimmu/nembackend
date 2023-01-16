const express=require("express");
const { connection }=require("./configs/db");
const {userRouter}=require("./routes/user.route");
const {noteRouter}=require("./routes/note.route");
const {authenticate}=require("./middlewares/authenticate.middleware");
const cors=require("cors")
require('dotenv').config()

const app = express();
app.use(cors({
  origin:"*"
}))
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to HomePage, Register or Login yourself for further informations");
});

app.use("/users", userRouter)
app.use(authenticate)
app.use("/notes", noteRouter)

app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log("Connected to the DB");
  } catch (err) {
    console.log("Trouble to Connect to the DB");
    console.log(err);
  }

  console.log(`Server is running on Port ${process.env.port}`);
});
