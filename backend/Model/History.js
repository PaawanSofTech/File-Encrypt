import mongoose from "mongoose";

const historySchema = new mongoose.Schema({
    name: String,
    address: String,
},{
    timestamps: {
        createdAt: true,
        updatedAt: true,
    }
})
export default mongoose.model("History", historySchema);