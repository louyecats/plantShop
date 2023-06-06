const mongoose = require("mongoose");

const PlantSchema = new mongoose.Schema({
    name: {
        type: String,
        required:[true, "Name is required"],
        minLength:[2, "Name must be at least 2 characters"],
        maxLength: [50, "Name must be less than 50 characters"]
    },
    botanicalName: {
        type: String,
        required:[true, "Botanical name is required"],
        minLength:[2, "Botanical name must be at least 2 characters"],
        maxLength: [50, "Botanical name must be less than 50 characters"]
    },
    description: {
        type: String,
        required:[true, "Description is required"],
        minLength:[10, "Description must be at least 10 characters"],
        maxLength: [500, "Description must be less than 500 characters"]
    },
    lightRequirements: {
        type: String,
        required:[true, "Light requirements is required"],
        enum: [
            "full sun",
            "partial sunlight",
            "full shade"
        ]
    },
    price: {
        type: Number,
        required: [true, "Price is required"],
        min: [5, "Price must be at least 5 dollars"],
        max: [100, "Price must be no more than 100 dollars"]
    }
}, {timestamps:true})

//blueprint created, now goes into mongoose.model - & creates collection with the name of "_" 
module.exports = mongoose.model("Plant", PlantSchema);