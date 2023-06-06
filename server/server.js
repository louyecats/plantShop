const express = require("express");
const app = express();
const port = 8000;
const cors = require("cors"); //makes cross-origin requests

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cors()); // must be AFTER const app = express();

require("./config/mongoose.config"); //allow use of Mongoose to connect to databas

require("./routes/plant.routes")(app); //server required routes and gives app imported at top access to them


app.listen(port, () => console.log(`Listening on port: ${port}`));
