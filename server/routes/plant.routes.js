const PlantController = require('../controllers/plant.controller');

const routes = (app) => {
    app.get("/api", (req, res)=>{
        res.json({msg:"hello world"})
    });

    //create
    app.post("/api/plants", PlantController.createPlant);

    //read all
    app.get("/api/plants", PlantController.getAllPlants);

    //read one
    app.get("/api/plants/:id", PlantController.getOnePlant);

    //update
    app.patch("/api/plants/:id", PlantController.updatePlant);

    //delete
    app.delete("/api/plants/:id", PlantController.deletePlant);
}

module.exports = routes