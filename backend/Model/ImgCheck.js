import mongoose from "mongoose";

const imgCheckSchema = new mongoose.Schema({
    ivFile: String,
    imageFile: String,
}, {
    timestamps:{
        updatedAt: true,
        createdAt: true
    }
})

export default mongoose.model("ImgCheck", imgCheckSchema);