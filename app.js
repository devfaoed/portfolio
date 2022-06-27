import express from "express";
const app = express();

import bodyparser from "body-parser";

import mongoose from "mongoose";

import multer from "multer";


const port = process.env.PORT || 8080

// import project database
import Project from "./model/project.js"

// function to use multer to save file into diskstorage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/assets/img/portfolio")
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "_" + file.originalname)
    }
}) 

const uploadStorage = multer({storage:storage})


app.set("view engine", "ejs");

app.use(bodyparser.urlencoded({extended: true}))
app.use(express.static("public"))

//online connection
const url = "mongodb+srv://adedokun:adedokun@cluster0.inbfm.mongodb.net/edulogy?retryWrites=true&w=majority";
mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})



app.get("/", (req, res) => {
    res.redirect("/index");
})

app.get("/index", (req, res) => {
    Project.find((err, projects) => {
        if(err){
            console.log(err)
        }
        else{
            res.render("index", {projects:projects})
        }
    })
})

app.get("/project", (req, res) => {
    res.render("upload_project")
})

// route to upload products into the database
app.post("/project",  uploadStorage.single("file"), (req, res) => {
    const Data = {
        file: req.file.filename,
        category: req.body.category,
        client: req.body.client,
        link: req.body.link,
        description: req.body.description
    }
    
    Project.create(Data, (err, upload) => {
        if(err){
            console.log(err)
        }
        else{
            res.redirect("/index")
            console.log("project uploaded successfully");
        }
    })
   
})





app.listen(port, () => {
    console.log("portfolio website is running on " + port)
})
