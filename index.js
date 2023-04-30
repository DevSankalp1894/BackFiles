   
     const express = require("express");
     const app = express();
     const {connection} = require("./connection/connection");
     const {userRouter} = require("./Routes/user.route");
     const {newNote, noteRouter} = require("./Routes/note.router");
     const {authenticator} = require("./middleware/auth.middleware");
     require("dotenv").config()
     app.use(express.json());

     app.get("/" , (req , res) => {
              res.send("homepage");
     })

     app.use("/user" , userRouter);
     //app.use(authenticator);
     app.use("/note" , noteRouter);


     app.listen(process.env.port , async() => {
            try{
                  await connection;
                  console.log("connected to DB")
            }

            catch(err){
                  console.log(err.message);
            }
            console.log(`server is running n port ${process.env.port}`);
     })