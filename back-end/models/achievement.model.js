import mongoose from "mongoose";

const achievementSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    image:{
        type: String
    },
    achevedOn: { 
        type: Date, 
        default: Date.now 
    }
}, { timestamps: true });

const Achievement = mongoose.model("Achievement", achievementSchema);

export { Achievement };
