const Plant = require('../models/plant.model');
//importing the variable that we exported from the .model.js

module.exports = {
    //create
    createPlant: (req, res) => {
        Plant.create(req.body)
            .then(newPlant => res.status(201).json(newPlant))// This is where we're setting the API's response to the requesting client
            .catch(err => res.status(400).json(err));
    },
    //read all
    getAllPlants: (req,res) => {
        Plant.find({})
        .then((allPlants) => {
            console.log(allPlants)
            res.json(allPlants)
        })
        .catch((err)=>{
            res.status(400).json({msg:"Something went wrong", error: err})
        });
    },
    //read one
    getOnePlant: (req,res) => {
        Plant.findById(req.params.id)
        .then((onePlant) => {
            res.json({
                plant: onePlant
            })
            //make object if want key to be named differently
        })
        .catch((err)=>{
            console.log("findOne error", err)
            res.status(400).json({msg:"Something went wrong", error: err});
        });
    },
    //update - new:true, we will get the new object returned instead
    //runValidators:true makes sure that what they update to passes the validations
    updatePlant: (req,res) => {
        Plant.findByIdAndUpdate(req.params.id, req.body, {new:true, runValidators:true})
        .then((updatedPlant) => {
            res.json({
                updatedPlant
            })
        })
        .catch((err)=>{
            res.status(400).json({msg:"Something went wrong", error: err});
        });
    },
    //delete
    deletePlant: (req,res) => {
        Plant.findByIdAndDelete(req.params.id)
        .then((deletedPlant) => {
            res.json({
                deletedPlant
            })
        })
        .catch((err)=>{
            res.status(400).json({msg:"Something went wrong", error: err});
        });
    }
}

