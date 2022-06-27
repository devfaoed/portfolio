import mongoose from "mongoose";

const projeectSchema = new mongoose.Schema({
    file: String,
    category: String,
    client: String,
    link: String,
    description: String,
    date: {
        type: Date,
        default: Date.now
    }
})

const Project = mongoose.model("Project", projeectSchema);

export default Project;

